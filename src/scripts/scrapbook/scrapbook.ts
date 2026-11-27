// The homepage scrapbook: scrolling down moves the spreads sideways, pieces drift at their own depth,
// and Rive pieces load as their spread approaches and pause once it has passed.
// With reduced motion the scrapbook is left as stacked spreads with still pictures.
import type { Rive as RiveInstance } from '@rive-app/canvas-lite';
import wasmUrl from '@rive-app/canvas-lite/rive.wasm?url';

type RiveModule = typeof import('@rive-app/canvas-lite');

interface SpreadState {
  el: HTMLElement;
  id: string;
  p: number;
  pieces: PieceState[];
}
interface PieceState {
  el: HTMLElement;
  src: string;
  control: string | undefined;
  rive?: RiveInstance;
  loading?: boolean;
  playing?: boolean;
  lastProgress?: number;
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
let riveModule: Promise<RiveModule> | undefined;
const loadRive = () => {
  riveModule ??= import('@rive-app/canvas-lite').then((m) => {
    m.RuntimeLoader.setWasmUrl(wasmUrl);
    return m;
  });
  return riveModule;
};

export function startScrapbook(): void {
  const root = document.querySelector<HTMLElement>('[data-scrapbook]');
  const track = root?.querySelector<HTMLElement>('[data-track]');
  if (!root || !track) return;

  // Stacked spreads with stills is the default markup. ?still in the address shows it on purpose.
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || new URLSearchParams(location.search).has('still')) return;

  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const liteMotion = Boolean(nav.connection?.saveData);
  document.documentElement.classList.add('sb-on');

  const spreads: SpreadState[] = [...track.querySelectorAll<HTMLElement>('[data-spread]')].map((el) => ({
    el,
    id: el.id,
    p: 1,
    pieces: [...el.querySelectorAll<HTMLElement>('[data-riv]')].map((pel) => ({
      el: pel,
      src: pel.dataset.riv!,
      control: pel.dataset.control,
    })),
  }));
  const railLinks = new Map(
    [...root.querySelectorAll<HTMLAnchorElement>('[data-rail]')].map((a) => [a.dataset.rail!, a]),
  );

  // Links like #land: the browser jumps to the element with that id, and keeps re-applying the jump while
  // the page loads. Sideways, a spread's own box is in the wrong place for that, so the id moves to an
  // invisible marker at the scroll height that brings the spread into view.
  const marks = spreads.map((s) => {
    const mark = document.createElement('div');
    mark.className = 'sb-mark';
    mark.setAttribute('aria-hidden', 'true');
    s.el.removeAttribute('id');
    mark.id = s.id;
    root.append(mark);
    return { s, mark };
  });

  let vw = 0;
  let top = 0; // where the scrapbook starts on the page
  let travel = 0; // how far the track can move
  let current = 0;
  let target = 0;
  let running = false;
  let activeId = '';

  function measure() {
    vw = window.innerWidth;
    const vh = window.innerHeight;
    travel = Math.max(0, track!.scrollWidth - vw);
    root!.style.setProperty('--sb-h', `${travel + vh}px`);
    top = root!.getBoundingClientRect().top + window.scrollY;
    target = clamp(window.scrollY - top, 0, travel);
    current = target;
    for (const { s, mark } of marks) mark.style.top = `${clamp(s.el.offsetLeft, 0, travel)}px`;
    for (const s of spreads) for (const pc of s.pieces) pc.rive?.resizeDrawingSurfaceToCanvas(dpr());
    frame();
  }

  const dpr = () => Math.min(window.devicePixelRatio || 1, vw < 820 ? 1.5 : 2);

  function frame() {
    track!.style.transform = `translate3d(${-current}px,0,0)`;
    let nearest = spreads[0];
    for (const s of spreads) {
      const center = s.el.offsetLeft + s.el.offsetWidth / 2 - current;
      const p = (center - vw / 2) / vw;
      if (Math.abs(p - s.p) > 0.0005) {
        s.p = p;
        s.el.style.setProperty('--p', p.toFixed(4));
      }
      if (Math.abs(p) < Math.abs(nearest.p)) nearest = s;
      if (!liteMotion) updatePieces(s);
    }
    if (nearest.id !== activeId) {
      railLinks.get(activeId)?.removeAttribute('aria-current');
      activeId = nearest.id;
      railLinks.get(activeId)?.setAttribute('aria-current', 'true');
    }
  }

  function tick() {
    const diff = target - current;
    current = Math.abs(diff) < 0.3 ? target : current + diff * 0.14;
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

  function updatePieces(s: SpreadState) {
    const near = Math.abs(s.p) < 1.6;
    const visible = Math.abs(s.p) < 1.1;
    // 0 as the spread comes in from the right, 100 once it is centred.
    const progress = clamp((1 - s.p) * 100, 0, 100);
    for (const pc of s.pieces) {
      if (near && !pc.rive && !pc.loading) createRive(pc);
      if (!pc.rive) continue;
      if (visible && !pc.playing) {
        pc.rive.play();
        pc.playing = true;
      } else if (!visible && pc.playing) {
        pc.rive.pause();
        pc.playing = false;
      }
      // scrollProgress: 0 → 100 as the spread arrives. driveProgress: 0 → 100 across the whole pass.
      const name = pc.control === 'scroll' ? 'scrollProgress' : pc.control === 'drive' ? 'driveProgress' : '';
      const value = pc.control === 'drive' ? clamp((1 - s.p) * 50, 0, 100) : progress;
      if (name && (pc.lastProgress === undefined || Math.abs(value - pc.lastProgress) > 0.4)) {
        const prop = pc.rive.viewModelInstance?.number(name);
        if (prop) prop.value = value;
        pc.lastProgress = value;
      }
    }
  }

  async function createRive(pc: PieceState) {
    pc.loading = true;
    const { Rive, Layout, Fit, Alignment } = await loadRive();
    const canvas = pc.el.querySelector('canvas');
    if (!canvas) return;
    const instance = new Rive({
      src: pc.src,
      canvas,
      autoplay: false,
      stateMachines: 'Bhoomi Motion',
      autoBind: Boolean(pc.control),
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
      onLoad: () => {
        instance.resizeDrawingSurfaceToCanvas(dpr());
        pc.rive = instance;
        pc.el.classList.add('is-live');
        pc.lastProgress = undefined;
        const s = spreads.find((sp) => sp.pieces.includes(pc));
        if (s) updatePieces(s);
      },
      onLoadError: () => {
        pc.loading = false; // keep the still picture
      },
    });
  }

  // Tap buttons fire the piece's "activate" trigger, the same as clicking the artwork.
  root.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-tap]');
    if (!btn) return;
    const pel = btn.closest<HTMLElement>('[data-riv]');
    const pc = spreads.flatMap((s) => s.pieces).find((x) => x.el === pel);
    pc?.rive?.viewModelInstance?.trigger('activate')?.trigger();
  });

  // Chapter links and keyboard focus: move the page to the spread instead of jumping inside the track.
  const scrollToSpread = (el: HTMLElement, smooth: boolean) => {
    const y = top + clamp(el.offsetLeft + el.offsetWidth / 2 - vw / 2, 0, travel);
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
  };
  root.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('[data-rail]');
    if (!a) return;
    const s = spreads.find((sp) => sp.id === a.dataset.rail);
    if (!s) return;
    e.preventDefault();
    scrollToSpread(s.el, true);
    history.replaceState(null, '', `#${s.id}`);
  });
  track.addEventListener('focusin', (e) => {
    const spreadEl = (e.target as HTMLElement).closest<HTMLElement>('[data-spread]');
    if (spreadEl) scrollToSpread(spreadEl, false);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', measure);
  measure();

  // A link to a spread (#land): the browser's own jump targets the element inside the moving track,
  // so after it has happened, move the page to the matching sideways position instead.
  const goToHash = () => {
    const s = spreads.find((sp) => `#${sp.id}` === location.hash);
    if (s) requestAnimationFrame(() => scrollToSpread(s.el, false));
  };
  if (document.readyState === 'complete') goToHash();
  else window.addEventListener('load', goToHash, { once: true });
  window.addEventListener('hashchange', goToHash);
}
