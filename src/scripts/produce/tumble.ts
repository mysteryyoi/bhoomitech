// Pieces of a vegetable tumbling into a card behind its pack, like the fruit on Agrumea Farm's Pantry.
// A small 2D physics pass: each piece is a circle with gravity, the card's sides and floor, and the
// other pieces to land on. It runs only while something is moving, then stops.

interface Body {
  el: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  va: number;
  r: number;
  w: number;
  h: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

const GRAVITY = 2600; // px per second²
const BOUNCE = 0.18;
const SUBSTEPS = 3;
// Pieces turn a little as they fall, then friction stops them; they never spin like a propeller.
const MAX_SPIN = 2.4; // radians per second
const AIR_SPIN_DRAG = 0.997; // per substep
const CONTACT_SPIN_DRAG = 0.8; // per substep while touching the floor or another piece

export interface Tumble {
  enter(): void;
  leave(): void;
  resize(): void;
  /** For checking layouts: run the physics to rest at once. */
  settle(frames?: number): void;
}

export function createTumble(card: HTMLElement): Tumble {
  const stage = card.querySelector<HTMLElement>('.pd-card-stage')!;
  const els = [...card.querySelectorAll<HTMLImageElement>('.pd-piece')];
  let W = 0;
  let H = 0;
  let bodies: Body[] = [];
  let floor = false;
  let raf = 0;
  let last = 0;
  let still = 0;

  function measure() {
    const r = stage.getBoundingClientRect();
    W = r.width;
    H = r.height;
  }

  function make(el: HTMLImageElement, i: number): Body {
    const w = W * Number(el.dataset.w);
    const h = w / Number(el.dataset.aspect);
    const r = (Math.sqrt(w * h) / 2) * 0.78;
    el.style.width = `${w}px`;
    return {
      el,
      w,
      h,
      r,
      x: r + Math.random() * (W - 2 * r),
      y: -h - i * H * 0.1 - Math.random() * H * 0.12,
      vx: (Math.random() - 0.5) * 90,
      vy: 150 + Math.random() * 220,
      a: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 1.6,
    };
  }

  function step(dt: number) {
    const ground = H - H * 0.035;
    const touching = new Set<Body>();
    for (const b of bodies) {
      b.vy += GRAVITY * dt;
      b.vx *= 0.998;
      b.va *= AIR_SPIN_DRAG;
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.a += b.va * dt;
      if (b.x < b.r) {
        b.x = b.r;
        b.vx = Math.abs(b.vx) * BOUNCE;
        touching.add(b);
      } else if (b.x > W - b.r) {
        b.x = W - b.r;
        b.vx = -Math.abs(b.vx) * BOUNCE;
        touching.add(b);
      }
      if (floor && b.y > ground - b.r) {
        b.y = ground - b.r;
        if (b.vy > 0) b.vy = -b.vy * BOUNCE;
        b.vx *= 0.85;
        touching.add(b);
      }
    }
    // Let pieces land on each other. A few passes keep the pile from sinking into itself.
    for (let pass = 0; pass < 3; pass++) {
      for (let i = 0; i < bodies.length; i++) {
        const p = bodies[i];
        for (let j = i + 1; j < bodies.length; j++) {
          const q = bodies[j];
          const dx = q.x - p.x;
          const dy = q.y - p.y;
          const min = p.r + q.r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= min * min || d2 === 0) continue;
          const d = Math.sqrt(d2);
          const nx = dx / d;
          const ny = dy / d;
          const push = (min - d) / 2;
          p.x -= nx * push;
          p.y -= ny * push;
          q.x += nx * push;
          q.y += ny * push;
          touching.add(p);
          touching.add(q);
          const vn = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (vn < 0) {
            const imp = (-(1 + BOUNCE) * vn) / 2;
            p.vx -= imp * nx;
            p.vy -= imp * ny;
            q.vx += imp * nx;
            q.vy += imp * ny;
            // Friction: pieces resting on each other stop sliding, with only a slight nudge to turn.
            const tx = -ny, ty = nx;
            const vt = (q.vx - p.vx) * tx + (q.vy - p.vy) * ty;
            const f = vt * 0.25;
            p.vx += f * tx * 0.5;
            p.vy += f * ty * 0.5;
            q.vx -= f * tx * 0.5;
            q.vy -= f * ty * 0.5;
            if (vn < -80) {
              // Only a real knock turns a piece, not the small jostling of a settled pile.
              p.va -= (vt / p.r) * 0.015;
              q.va += (vt / q.r) * 0.015;
            }
          }
        }
      }
    }
    for (const b of bodies) {
      if (touching.has(b)) {
        b.va *= CONTACT_SPIN_DRAG;
        // Settled in the pile: stop turning altogether.
        if (Math.abs(b.vx) + Math.abs(b.vy) < 40) b.va *= 0.5;
      }
      b.va = clamp(b.va, -MAX_SPIN, MAX_SPIN);
    }
  }

  function draw() {
    for (const b of bodies) {
      b.el.style.transform = `translate3d(${(b.x - b.w / 2).toFixed(1)}px,${(b.y - b.h / 2).toFixed(1)}px,0) rotate(${b.a.toFixed(3)}rad)`;
    }
  }

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;
    for (let s = 0; s < SUBSTEPS; s++) step(dt / SUBSTEPS);
    draw();
    if (floor) {
      const moving = bodies.some((b) => Math.abs(b.vx) + Math.abs(b.vy) > 14 || Math.abs(b.va) > 0.05);
      still = moving ? 0 : still + 1;
      if (still > 30) return;
    } else if (bodies.every((b) => b.y - b.h > H)) {
      card.classList.remove('is-live');
      bodies = [];
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  function run() {
    still = 0;
    if (raf) return;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  return {
    enter() {
      measure();
      if (!W) return;
      floor = true;
      if (!bodies.length) bodies = els.map(make);
      else {
        // Pieces that already fell out come back in from the top.
        bodies = bodies.map((b, i) => (b.y - b.h > H ? make(b.el, i) : b));
      }
      card.classList.add('is-live');
      run();
    },
    leave() {
      if (!bodies.length) return;
      floor = false;
      for (const b of bodies) b.vy = Math.min(b.vy, -120 - Math.random() * 160);
      run();
    },
    settle(frames = 600) {
      cancelAnimationFrame(raf);
      raf = 0;
      for (let f = 0; f < frames; f++) for (let s = 0; s < SUBSTEPS; s++) step(1 / 60 / SUBSTEPS);
      draw();
    },
    resize() {
      if (!bodies.length) return;
      // Start again at the new size rather than stretching the old pile.
      cancelAnimationFrame(raf);
      raf = 0;
      measure();
      bodies = els.map(make);
      floor = true;
      run();
    },
  };
}
