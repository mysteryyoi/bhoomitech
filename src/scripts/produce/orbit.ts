// The wheel (components/produce/Orbit.astro): one fixed screen, the packs on a tilted belt.
//
// Turning it: the mouse wheel or trackpad, dragging, swiping, the arrow keys, or the crop dots. It glides
// with a little momentum and always comes to rest with one pack in front. That pack opens (its vegetable
// pops out) and is named bottom left. Each pack's size, blur, brightness and lean come from how far it is
// from the middle, so the one in front is big and sharp and the rest fall back. The belt wraps round.
//
// Spacing: every pack gets a slot as wide as it really is (a wide punnet needs more room than a tall
// pouch, and a leaning pack more than an upright one), plus an even gap. Distances on screen grow with
// the packs' size, so the big ones in front get more room and the small ones at the edges close up.

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const TILT = (10 * Math.PI) / 180; // the belt runs 10° down to the right
const BASE_TURN = [0, 15.6, -15.6]; // each pack leans a little, in turn
const WHEEL_GAIN = 1.1; // belt pixels per wheel pixel
const DRAG_GAIN = 1.5; // belt pixels per pointer pixel
const SETTLE_AFTER = 180; // ms after the last wheel tick before it snaps to a pack

export interface Orbit {
  /** For checking layouts: finish the current glide at once. */
  settle(): void;
  /** For checking layouts: put pack i in front at once. */
  go(i: number): void;
}

export function startOrbit(root: HTMLElement, reduced: boolean): Orbit {
  const stage = root.querySelector<HTMLElement>('[data-orbit-stage]')!;
  const ring = root.querySelector<SVGGElement>('[data-orbit-ring]');
  const live = root.querySelector<HTMLElement>('[data-orbit-live]');
  const caps = new Map([...root.querySelectorAll<HTMLElement>('[data-cap]')].map((el) => [el.dataset.cap!, el]));
  const dots = new Map([...root.querySelectorAll<HTMLButtonElement>('[data-dot]')].map((el) => [el.dataset.dot!, el]));
  const items = [...root.querySelectorAll<HTMLElement>('[data-orbit-item]')].map((el, i) => ({
    el,
    crop: el.dataset.crop!,
    ar: Number(getComputedStyle(el).getPropertyValue('--ar')) || 1,
    turn: BASE_TURN[i % 3],
    w: 0,
    h: 0,
    at: 0, // where its slot's middle sits along the belt
  }));
  const n = items.length;
  root.classList.add('is-live');

  let W = 0, H = 0, H0 = 0, fx = 0, fy = 0;
  let slot = 1, loop = 1;
  let target = 0, current = 0, prev = 0, lean = 0;
  let raf = 0, last = 0, settleTimer = 0;
  let front = -1;
  let touched = false;
  let dragging = false;
  let moved = false;

  const wrap = (d: number) => ((((d + loop / 2) % loop) + loop) % loop) - loop / 2;
  const scaleAt = (d: number) => 0.49 + 0.83 * (1 - smooth(0.45, 2.5, Math.abs(d) / slot));

  /** Distance on screen from the middle for a distance along the belt: the sum of the sizes on the way. */
  function screen(d: number) {
    const a = Math.abs(d);
    const steps = 14;
    const h = a / steps;
    let sum = 0;
    for (let k = 0; k < steps; k++) sum += scaleAt((k + 0.5) * h);
    return Math.sign(d) * sum * h;
  }

  /** The pack nearest the middle for a belt position. */
  function nearest(pos: number) {
    let best = 0;
    for (let i = 1; i < n; i++) if (Math.abs(wrap(items[i].at - pos)) < Math.abs(wrap(items[best].at - pos))) best = i;
    return best;
  }

  function measure() {
    const keep = loop > 1 ? current / loop : 0;
    const r = root.getBoundingClientRect();
    W = r.width;
    H = r.height;
    const portrait = H > W;
    H0 = portrait ? H * 0.27 : Math.min(H * 0.38, W * 0.24);
    fx = W * 0.5;
    fy = H * (portrait ? 0.53 : 0.57);
    // On a phone the packs sit closer, so the neighbours peek in at the edges.
    const gap = H0 * (portrait ? -0.06 : 0.16);
    const across: number[] = [];
    for (const it of items) {
      // Wide packs (the lettuce punnet) are scaled down so they don't dwarf the tall ones.
      it.h = H0 * (it.ar > 1 ? 0.5 : 1);
      it.w = it.h * it.ar;
      it.el.style.width = `${it.w.toFixed(1)}px`;
      it.el.style.height = `${it.h.toFixed(1)}px`;
      const t = (it.turn * Math.PI) / 180;
      across.push(it.w * Math.abs(Math.cos(t)) + it.h * Math.abs(Math.sin(t)));
    }
    let at = 0;
    items.forEach((it, i) => {
      it.at = at;
      at += (across[i] + across[(i + 1) % n]) / 2 + gap;
    });
    loop = at;
    slot = loop / n;
    // Keep the same pack in front across a resize.
    current = keep * loop;
    target = items[nearest(current)].at + Math.round((current - items[nearest(current)].at) / loop) * loop;
    current = target;
    prev = current;
    draw(0);
  }

  function setFront(i: number) {
    if (i === front) return;
    front = i;
    const crop = i >= 0 ? items[i].crop : '';
    caps.forEach((el, k) => el.classList.toggle('is-shown', k === crop));
    dots.forEach((el, k) => el.setAttribute('aria-pressed', String(k === crop)));
    if (live && crop) live.textContent = caps.get(crop)?.querySelector('.pd-orbit-cap-name')?.textContent ?? '';
  }

  function draw(dt: number) {
    const vel = dt > 0 ? (current - prev) / dt : 0;
    prev = current;
    lean += (clamp((vel / slot) * 5, -14, 14) - lean) * 0.15;
    const c = Math.cos(TILT), s = Math.sin(TILT);
    const resting = Math.abs(target - current) < 1 && !dragging;
    items.forEach((it, i) => {
      const d = wrap(it.at - current);
      const k = Math.abs(d) / slot;
      const scale = scaleAt(d);
      const blur = 4 * smooth(0.75, 2.4, k);
      const bright = 1.03 - 0.33 * smooth(0.6, 2.4, k);
      const turn = it.turn + (d / slot) * 6 - lean;
      const along = screen(d);
      const x = fx + along * c;
      const y = fy + along * s + (i % 2 ? -1 : 1) * H * 0.02;
      it.el.style.transform = `translate3d(${(x - it.w / 2).toFixed(1)}px,${(y - it.h / 2).toFixed(1)}px,0) rotate(${turn.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
      it.el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px) brightness(${bright.toFixed(3)})` : `brightness(${bright.toFixed(3)})`;
      it.el.style.zIndex = String(10 + Math.round(scale * 100));
      // The pack in front opens once the wheel stops.
      it.el.classList.toggle('is-front', resting && k < 0.3);
    });
    setFront(nearest(current));
    if (ring) ring.style.transform = `rotate(${((-current / slot) * 14).toFixed(2)}deg)`;
  }

  function frame(now: number) {
    raf = 0;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const diff = target - current;
    current = Math.abs(diff) < 0.3 ? target : current + diff * Math.min(1, dt * 6.5);
    draw(dt);
    if (current !== target || Math.abs(lean) > 0.05) raf = requestAnimationFrame(frame);
    else draw(0); // one more pass so the front pack opens
  }

  function run() {
    if (reduced) {
      current = target;
      draw(0);
      return;
    }
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }

  /** Move the target to the nearest pack, so the wheel always rests with one in front. */
  function snap() {
    const i = nearest(target);
    target += wrap(items[i].at - target);
    run();
  }

  function firstTouch() {
    if (touched) return;
    touched = true;
    root.classList.add('is-touched');
  }

  /** Bring the next (dir 1) or previous (dir -1) pack to the front. */
  function stepBy(dir: number) {
    firstTouch();
    let best = 0;
    let bestD = Infinity;
    for (const it of items) {
      const d = wrap(it.at - target) * dir;
      if (d > slot * 0.2 && d < bestD) {
        bestD = d;
        best = d;
      }
    }
    target += best * dir;
    run();
  }

  /* Mouse wheel and trackpad ---------------------------------------------------------------------- */
  window.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey) return; // pinch to zoom
      e.preventDefault();
      firstTouch();
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? H : 1;
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * unit;
      if (reduced) {
        // No gliding: one notch, one pack.
        if (Math.abs(d) > 4) stepBy(Math.sign(d));
        return;
      }
      target += d * WHEEL_GAIN;
      run();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(snap, SETTLE_AFTER);
    },
    { passive: false },
  );

  /* Dragging and swiping --------------------------------------------------------------------------- */
  let startX = 0, startY = 0, startTarget = 0, lastX = 0, lastY = 0, lastT = 0, flick = 0;
  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    dragging = true;
    moved = false;
    startX = lastX = e.clientX;
    startY = lastY = e.clientY;
    startTarget = target;
    lastT = performance.now();
    flick = 0;
    window.clearTimeout(settleTimer);
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!moved && Math.hypot(dx, dy) < 6) return;
    if (!moved) {
      moved = true;
      firstTouch();
      root.classList.add('is-dragging');
    }
    // Drag left (or up) to bring the next pack in.
    const d = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
    target = startTarget - d * DRAG_GAIN;
    const now = performance.now();
    const step = Math.abs(e.clientX - lastX) >= Math.abs(e.clientY - lastY) ? e.clientX - lastX : e.clientY - lastY;
    flick = (step * DRAG_GAIN) / Math.max(1, now - lastT);
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
    if (reduced) current = target;
    run();
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('is-dragging');
    if (moved) {
      // A quick flick carries on a little before it settles.
      target -= clamp(flick * 220, -slot * 2.5, slot * 2.5);
      snap();
    }
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  // A drag that started on a pack shouldn't open it.
  stage.addEventListener(
    'click',
    (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    },
    true,
  );

  /* Keys and dots ---------------------------------------------------------------------------------- */
  window.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    // Space on a focused button or link should still press it.
    if (e.key === ' ' && (e.target as Element).closest('a, button, summary')) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
      e.preventDefault();
      stepBy(1);
    } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      stepBy(-1);
    }
  });
  dots.forEach((el, crop) => {
    el.addEventListener('click', () => {
      firstTouch();
      // The nearest pack of that crop, front view first.
      const options = items
        .map((it, i) => ({ i, d: wrap(it.at - target), front: !it.el.classList.contains('pd-orbit-item--extra') }))
        .filter((o) => items[o.i].crop === crop)
        .sort((a, b) => Number(b.front) - Number(a.front) || Math.abs(a.d) - Math.abs(b.d));
      target += options[0].d;
      run();
    });
  });
  // Tabbing to a pack brings it to the front.
  items.forEach((it) =>
    it.el.addEventListener('focus', () => {
      target += wrap(it.at - target);
      run();
    }),
  );

  /* Start ------------------------------------------------------------------------------------------ */
  let lastW = 0;
  const onResize = () => {
    // Phones fire resize as the address bar slides; only re-measure when the size really changes.
    if (window.innerWidth === lastW && Math.abs(root.getBoundingClientRect().height - H) < 80 && W) return;
    lastW = window.innerWidth;
    measure();
  };
  window.addEventListener('resize', onResize);
  onResize();
  if (!reduced) {
    // The packs glide in from the right as the page opens.
    current = -slot * 1.6;
    prev = current;
    draw(0);
    run();
  }

  return {
    settle() {
      cancelAnimationFrame(raf);
      raf = 0;
      current = target;
      lean = 0;
      draw(0);
    },
    go(i: number) {
      target += wrap(items[i].at - target);
      this.settle();
    },
  };
}
