// The homepage photo collage: scrolling down moves the chapters sideways, every layer drifts at its own
// depth, and the egret flies ahead of you. It lands where a chapter has a perch, glides where it has none,
// and takes off again as the next chapter comes in. Clicking it moves on to the next chapter.
// With reduced motion, or ?still in the address, the chapters stay stacked as still pages.
import { createEgretRenderer, PAD, type EgretRenderer } from './egret-gl';

interface Spot {
  el: HTMLElement;
  kind: 'perch' | 'glide';
  desk: [number, number, number];
  phone: [number, number, number];
  depth: number;
}
interface ChapterState {
  el: HTMLElement;
  id: string;
  label: string;
  p: number;
  spot: Spot;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const STAND_ASPECT = 0.88; // width / height of the standing egret picture
const BIRD_BASE = 260; // the flying bird's canvas is laid out for a 260 px wide bird, then scaled
const BODY = { x: 0.45, y: 0.66 }; // where the body sits in the flying photo, as a share of its size

export function startCollage(): void {
  const root = document.querySelector<HTMLElement>('[data-collage]');
  const track = root?.querySelector<HTMLElement>('[data-track]');
  const birdBtn = root?.querySelector<HTMLButtonElement>('[data-bird]');
  if (!root || !track || !birdBtn) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || new URLSearchParams(location.search).has('still')) return;
  const html = document.documentElement;
  html.classList.add('cg-on');

  const num = (el: HTMLElement, key: string) => Number(el.dataset[key]);
  const chapters: ChapterState[] = [...track.querySelectorAll<HTMLElement>('[data-chapter]')].map((el) => {
    const spotEl = el.querySelector<HTMLElement>('[data-perch], [data-glide]')!;
    return {
      el,
      id: el.id,
      label: root.querySelector<HTMLElement>(`[data-rail="${el.id}"] .cg-rail-l`)?.textContent ?? el.id,
      p: 1,
      spot: {
        el: spotEl,
        kind: spotEl.hasAttribute('data-perch') ? 'perch' : 'glide',
        desk: [num(spotEl, 'x'), num(spotEl, 'y'), num(spotEl, 'w')],
        phone: [num(spotEl, 'mx'), num(spotEl, 'my'), num(spotEl, 'mw')],
        depth: num(spotEl, 'depth'),
      },
    };
  });
  const railLinks = new Map([...root.querySelectorAll<HTMLAnchorElement>('[data-rail]')].map((a) => [a.dataset.rail!, a]));

  // Links like #land: the browser jumps to the element with that id while the page loads. Sideways, a
  // chapter's own box is in the wrong place for that, so the id moves to a marker at the right scroll height.
  const marks = chapters.map((c) => {
    const mark = document.createElement('div');
    mark.className = 'cg-mark';
    mark.setAttribute('aria-hidden', 'true');
    c.el.removeAttribute('id');
    mark.id = c.id;
    root.append(mark);
    return mark;
  });

  let vw = 0;
  let vh = 0;
  let top = 0;
  let travel = 0;
  let current = 0;
  let target = 0;
  let running = false;
  let activeId = '';
  // The stage: where it sits in a chapter, its width, and one stage unit in pixels.
  let stageL = 0;
  let stageT = 0;
  let sw = 0;
  let unit = 1;
  let portrait = false;
  const tall = window.matchMedia('(max-aspect-ratio: 1/1)');

  function measure() {
    // Keep the reader on the same spot when the window changes width: the page grows or shrinks
    // with it, so the same scroll height would land somewhere else.
    const offset = window.scrollY - top;
    const inside = vw !== 0 && offset >= 0 && offset <= (chapters.length - 1) * vw;
    const progress = inside ? offset / vw : -1;
    const widthChanged = vw !== 0 && vw !== window.innerWidth;
    vw = window.innerWidth;
    vh = window.innerHeight;
    travel = (chapters.length - 1) * vw;
    root!.style.setProperty('--cg-h', `${travel + vh}px`);
    top = root!.getBoundingClientRect().top + window.scrollY;
    if (widthChanged && progress >= 0) {
      window.scrollTo({ top: top + progress * vw, behavior: 'instant' });
    }
    target = clamp(window.scrollY - top, 0, travel);
    current = target;
    marks.forEach((m, i) => (m.style.top = `${clamp(i * vw, 0, travel)}px`));
    const first = chapters[0].el;
    const stage = first.querySelector<HTMLElement>('.cg-stage')!.getBoundingClientRect();
    const box = first.getBoundingClientRect();
    stageL = stage.left - box.left;
    stageT = stage.top - box.top;
    sw = stage.width;
    portrait = tall.matches;
    unit = sw / (portrait ? 1000 : 1600);
    frame();
  }

  function frame() {
    track!.style.transform = `translate3d(${-current}px,0,0)`;
    let nearest = chapters[0];
    chapters.forEach((c, i) => {
      const p = (i * vw - current) / vw;
      if (Math.abs(p - c.p) > 0.0005) {
        c.p = p;
        c.el.style.setProperty('--p', p.toFixed(4));
      }
      if (Math.abs(p) < Math.abs(nearest.p)) nearest = c;
    });
    if (nearest.id !== activeId) {
      railLinks.get(activeId)?.removeAttribute('aria-current');
      activeId = nearest.id;
      railLinks.get(activeId)?.setAttribute('aria-current', 'true');
    }
    html.classList.toggle('cg-scrolled', current > 30);
    egret.follow();
  }

  function tick() {
    const diff = target - current;
    current = Math.abs(diff) < 0.3 ? target : current + diff * 0.12;
    frame();
    if (current !== target) requestAnimationFrame(tick);
    else running = false;
  }
  function onScroll() {
    target = clamp(window.scrollY - top, 0, travel);
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  const scrollToChapter = (i: number, smoothly: boolean) => {
    const y = top + clamp(i * vw, 0, travel);
    window.scrollTo({ top: y, behavior: smoothly ? 'smooth' : 'auto' });
  };

  /* The egret ---------------------------------------------------------------------------------- */

  const egret = (() => {
    let at = -1; // the chapter it is flying to or sitting in
    let mode: 'perch' | 'fly' = 'perch';
    let paused = false;
    let x = 0, y = 0, vx = 0, vy = 0, size = 200, facing = 1;
    let phase = 0, amp = 0.6, clock = 0, last = 0;
    let raf = 0;
    let peckTimer = 0;
    let renderer: EgretRenderer | undefined;
    const canvas = birdBtn!.querySelector('canvas')!;
    createEgretRenderer(canvas, birdBtn!.dataset.photo!, birdBtn!.dataset.mask!)
      .then((r) => {
        renderer = r;
        renderer.draw(0.25);
      })
      .catch(() => undefined);

    /** Where the bird should be for chapter i, in screen pixels: the middle of its body, and its wingspan. */
    function spot(i: number) {
      const c = chapters[i];
      const [sx, sy, sw0] = portrait ? c.spot.phone : c.spot.desk;
      const left = (i * vw - current) + stageL + c.p * c.spot.depth * 0.4 * sw;
      if (c.spot.kind === 'perch') {
        const h = sw0 / STAND_ASPECT;
        return { x: left + sx * unit, y: stageT + (sy - h * 0.56) * unit, w: sw0 * unit * 2.3, perch: true };
      }
      return { x: left + sx * unit, y: stageT + sy * unit, w: sw0 * unit, perch: false };
    }

    function place() {
      const s = size / BIRD_BASE;
      const bx = BIRD_BASE * (PAD.x + BODY.x);
      const by = (BIRD_BASE / 1.789) * (PAD.y + BODY.y);
      const bank = clamp(vy / 60, -12, 12) * facing;
      birdBtn!.style.transformOrigin = `${bx}px ${by}px`;
      birdBtn!.style.transform = `translate3d(${(x - bx).toFixed(1)}px,${(y - by).toFixed(1)}px,0) rotate(${bank.toFixed(2)}deg) scale(${(facing * s).toFixed(4)},${s.toFixed(4)})`;
    }

    function perchEl(i: number) {
      return chapters[i].spot.kind === 'perch' ? chapters[i].spot.el : undefined;
    }

    function schedulePeck() {
      window.clearTimeout(peckTimer);
      if (paused || mode !== 'perch') return;
      peckTimer = window.setTimeout(() => {
        const el = perchEl(at);
        if (!el || mode !== 'perch' || paused) return;
        el.classList.add('is-pecking');
        window.setTimeout(() => {
          el.classList.remove('is-pecking');
          schedulePeck();
        }, 1300);
      }, 2400 + Math.random() * 3600);
    }

    function land() {
      mode = 'perch';
      const el = perchEl(at)!;
      el.style.setProperty('--facing', String(facing));
      el.classList.remove('is-away');
      birdBtn!.hidden = true;
      cancelAnimationFrame(raf);
      raf = 0;
      schedulePeck();
    }

    function takeOff(from: number) {
      const el = perchEl(from);
      window.clearTimeout(peckTimer);
      if (el) {
        const s = spot(from);
        x = s.x;
        y = s.y;
        size = s.w * 0.9;
        el.classList.add('is-away');
        el.classList.remove('is-pecking');
      }
      const goal = spot(at);
      facing = goal.x >= x ? 1 : -1;
      vx = facing * 140;
      vy = -340;
      amp = 1;
      mode = 'fly';
      birdBtn!.hidden = false;
      place();
      start();
    }

    function start() {
      if (raf || paused) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function step(now: number) {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (advance(dt)) raf = requestAnimationFrame(step);
    }

    /** One step of flight. Returns false once the bird has landed. */
    function advance(dt: number): boolean {
      clock += dt;
      const goal = spot(at);
      let gx = goal.x;
      let gy = goal.y;
      if (!goal.perch) {
        // Cruise around the glide point instead of hanging in the air.
        gx += Math.sin(clock * 0.45) * goal.w * 0.35;
        gy += Math.sin(clock * 0.9) * goal.w * 0.1;
      }
      const dist = Math.hypot(gx - x, gy - y);
      const lift = Math.min(dist * 0.3, vh * (goal.perch ? 0.18 : 0.1)) * smooth(60, 360, dist);
      const ax = gx - x;
      const ay = gy - lift - y;
      const ad = Math.hypot(ax, ay) || 1;
      const speed = Math.min(Math.max(900, vw * 1.05), ad * 3);
      let sx = ((ax / ad) * speed - vx) * 5;
      let sy = ((ay / ad) * speed - vy) * 5;
      const sm = Math.hypot(sx, sy);
      if (sm > 4200) {
        sx *= 4200 / sm;
        sy *= 4200 / sm;
      }
      vx += sx * dt;
      vy += sy * dt;
      x += vx * dt;
      y += vy * dt;
      size += (goal.w - size) * Math.min(1, dt * 2.5);
      if (vx > 40) facing = 1;
      else if (vx < -40) facing = -1;

      // Wingbeat: hard when climbing or fast, a glide when dropping, a flare on the way in to land.
      const v = Math.hypot(vx, vy);
      const climb = -vy;
      let ampGoal = clamp(0.45 + v / 1400 + climb / 600, 0.3, 1);
      if (!goal.perch) ampGoal = dist < 120 ? 0.5 : ampGoal;
      else if (dist < 140) ampGoal = 0.8;
      else if (vy > 160) ampGoal = 0.12;
      amp += (ampGoal - amp) * Math.min(1, dt * 4);
      const rate = 2.1 + clamp(climb / 500, 0, 1) * 1.2 + (v > 900 ? 0.6 : 0);
      phase += Math.PI * 2 * rate * dt;
      const beat = Math.sin(phase + 0.35 * Math.sin(phase));
      renderer?.draw(0.25 + amp * 0.75 * beat);
      place();

      if (goal.perch && dist < 5 + size * 0.02 && v < 70) {
        land();
        return false;
      }
      return true;
    }

    function retarget() {
      let nearest = 0;
      chapters.forEach((c, i) => {
        if (Math.abs(c.p) < Math.abs(chapters[nearest].p)) nearest = i;
      });
      if (at === -1) {
        // First frame: settle straight into the chapter in view.
        at = nearest;
        chapters.forEach((c, i) => c.spot.kind === 'perch' && c.spot.el.classList.toggle('is-away', i !== at));
        if (chapters[at].spot.kind === 'perch') land();
        else {
          const s = spot(at);
          x = s.x;
          y = s.y;
          size = s.w;
          mode = 'fly';
          birdBtn!.hidden = paused;
          place();
          start();
        }
        return;
      }
      // Switch once the next chapter is mostly in view, or at once if the reader has jumped far away.
      if (nearest === at || (Math.abs(chapters[nearest].p) > 0.42 && Math.abs(chapters[at].p) < 0.8)) return;
      const from = at;
      at = nearest;
      const next = chapters[at + 1];
      birdBtn!.setAttribute('aria-label', next ? `Follow the egret to the next chapter: ${next.label}` : 'The egret');
      if (paused) {
        perchEl(from)?.classList.add('is-away');
        if (chapters[at].spot.kind === 'perch') land();
        return;
      }
      if (mode === 'perch') takeOff(from);
      else start();
    }

    return {
      follow: retarget,
      /** For checking layouts: finish the current flight at once. */
      settle(steps = 900) {
        cancelAnimationFrame(raf);
        raf = 0;
        for (let k = 0; k < steps && mode === 'fly'; k++) {
          if (!advance(1 / 60)) break;
          if (chapters[at].spot.kind === 'glide' && k > 240) break;
        }
      },
      next: () => Math.min(chapters.length - 1, Math.max(0, at) + 1),
      setPaused(on: boolean) {
        paused = on;
        if (on) {
          cancelAnimationFrame(raf);
          raf = 0;
          window.clearTimeout(peckTimer);
          if (mode === 'fly' && chapters[at].spot.kind === 'perch') land();
        } else if (mode === 'fly') {
          birdBtn!.hidden = false;
          start();
        } else schedulePeck();
      },
    };
  })();

  /* Controls ------------------------------------------------------------------------------------ */

  const pause = root.querySelector<HTMLButtonElement>('[data-pause]');
  if (pause) {
    pause.hidden = false;
    pause.addEventListener('click', () => {
      const on = !html.classList.contains('cg-paused');
      html.classList.toggle('cg-paused', on);
      pause.setAttribute('aria-pressed', String(on));
      pause.textContent = on ? 'Play motion' : 'Pause motion';
      egret.setPaused(on);
    });
  }

  root.addEventListener('click', (e) => {
    const t = e.target as HTMLElement;
    const a = t.closest<HTMLAnchorElement>('[data-rail], .cg-word');
    if (a) {
      const id = a.dataset.rail ?? 'bhoomi';
      const i = chapters.findIndex((c) => c.id === id);
      if (i < 0) return;
      e.preventDefault();
      scrollToChapter(i, true);
      history.replaceState(null, '', `#${id}`);
      return;
    }
    if (t.closest('[data-follow], [data-bird]')) scrollToChapter(egret.next(), true);
  });
  track.addEventListener('focusin', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-chapter]');
    const i = chapters.findIndex((c) => c.el === el);
    if (i >= 0) scrollToChapter(i, false);
  });

  if (new URLSearchParams(location.search).has('debug')) {
    (window as unknown as Record<string, unknown>).__cg = {
      go(i: number, steps?: number) {
        window.scrollTo({ top: top + i * vw, behavior: 'instant' });
        measure();
        egret.settle(steps);
      },
    };
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  tall.addEventListener('change', measure);
  measure();

  const goToHash = () => {
    const i = chapters.findIndex((c) => `#${c.id}` === location.hash);
    if (i >= 0) requestAnimationFrame(() => scrollToChapter(i, false));
  };
  if (document.readyState === 'complete') goToHash();
  else window.addEventListener('load', goToHash, { once: true });
  window.addEventListener('hashchange', goToHash);
}
