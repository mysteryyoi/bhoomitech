// Our Produce and the vegetable pages: titles that rise in letter by letter, the crop row at the bottom of
// the screen, the pack cards with their tumbling pieces, the label that follows the mouse, the pack that
// turns as you scroll on a vegetable's page, and the photo strip's buttons.
// With reduced motion everything is shown at once and nothing moves on its own.
import { createTumble, type Tumble } from './tumble';
import { startOrbit } from './orbit';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function startProduce(): void {
  (window as unknown as Record<string, unknown>).__pdStarted = true;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Reveals ------------------------------------------------------------------------------------- */
  const reveal = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        reveal.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => reveal.observe(el));

  /* The packs on their belt at the top of Our Produce --------------------------------------------- */
  const orbitEl = document.querySelector<HTMLElement>('[data-orbit]');
  const orbit = orbitEl ? startOrbit(orbitEl, reduced) : undefined;

  /* The crop row at the bottom of the screen ------------------------------------------------------ */
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  const heroEnd = document.querySelector<HTMLElement>('[data-hero-end]');
  const foot = document.querySelector<HTMLElement>('.pd-foot');
  if (rail) {
    const links = new Map([...rail.querySelectorAll<HTMLAnchorElement>('[data-rail-link]')].map((a) => [a.dataset.railLink!, a]));
    let current = '';
    const setCurrent = (id: string) => {
      if (id === current) return;
      links.get(current)?.removeAttribute('aria-current');
      current = id;
      links.get(id)?.setAttribute('aria-current', 'true');
    };
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    let queued = false;
    const update = () => {
      queued = false;
      const vh = window.innerHeight;
      const past = heroEnd ? heroEnd.getBoundingClientRect().bottom < vh * 0.4 : true;
      const footIn = foot ? foot.getBoundingClientRect().top < vh * 0.92 : false;
      rail.classList.toggle('is-shown', past && !footIn);
      let id = '';
      for (const s of sections) if (s.getBoundingClientRect().top < vh * 0.55) id = s.dataset.section!;
      setCurrent(id);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }

  /* Pack cards ----------------------------------------------------------------------------------- */
  const tumbles: Tumble[] = [];
  if (!reduced) {
    const onView = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          tumbleOf.get(e.target as HTMLElement)?.enter();
          onView.unobserve(e.target);
        }
      },
      { threshold: 0.6 },
    );
    const tumbleOf = new Map<HTMLElement, Tumble>();
    document.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
      const t = createTumble(card);
      tumbles.push(t);
      tumbleOf.set(card, t);
      const link = card.querySelector<HTMLAnchorElement>('a')!;
      if (fine) {
        link.addEventListener('pointerenter', () => t.enter());
        link.addEventListener('pointerleave', () => t.leave());
        link.addEventListener('focus', () => t.enter());
        link.addEventListener('blur', () => t.leave());
      } else {
        // No hover on touch screens: the pieces fall once as the card comes into view.
        onView.observe(card);
      }
    });
    if (new URLSearchParams(location.search).has('debug')) {
      // __pd.drop(i): drop the pieces into card i and let them come to rest at once.
      // __pd.orbit(): move the belt straight to where the current scroll puts it.
      (window as unknown as Record<string, unknown>).__pd = {
        drop(i: number) {
          const t = tumbles[i];
          t.enter();
          t.settle();
        },
        orbit(i?: number) {
          if (i === undefined) orbit?.settle();
          else orbit?.go(i);
        },
        tumbles,
      };
    }
    let resizeTimer = 0;
    let lastW = window.innerWidth;
    window.addEventListener('resize', () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => tumbles.forEach((t) => t.resize()), 200);
    });
  }

  /* The label that follows the mouse over a card --------------------------------------------------- */
  const cursor = document.querySelector<HTMLElement>('[data-cursor-label]');
  const cursorText = cursor?.querySelector<HTMLElement>('[data-cursor-text]');
  if (cursor && cursorText && fine) {
    let x = 0, y = 0, tx = 0, ty = 0;
    let raf = 0;
    let shown = false;
    const follow = () => {
      raf = 0;
      if (reduced) {
        x = tx;
        y = ty;
      } else {
        x += (tx - x) * 0.22;
        y += (ty - y) * 0.22;
      }
      cursor.style.transform = `translate3d(${(x + 18).toFixed(1)}px,${(y - 17).toFixed(1)}px,0)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.5) raf = requestAnimationFrame(follow);
    };
    document.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const card = (e.target as Element).closest<HTMLElement>('[data-cursor]');
      tx = e.clientX;
      ty = e.clientY;
      if (card) {
        if (!shown) {
          // Appear at the pointer, not slide in from wherever it was last.
          x = tx;
          y = ty;
          shown = true;
        }
        cursorText.textContent = card.dataset.cursor ?? '';
        cursor.classList.add('is-on');
      } else if (shown) {
        shown = false;
        cursor.classList.remove('is-on');
      }
      if (!raf) raf = requestAnimationFrame(follow);
    });
    const hide = () => {
      shown = false;
      cursor.classList.remove('is-on');
    };
    document.addEventListener('pointerleave', hide);
    // Scrolling slides the page under a still pointer, so the label would point at the wrong thing.
    window.addEventListener('scroll', hide, { passive: true });
  }

  /* A vegetable's page: the pack tilts, drops and turns as you scroll ------------------------------ */
  const pack = document.querySelector<HTMLElement>('.pd-pdp-pack');
  if (pack && !reduced) {
    let queued = false;
    const update = () => {
      queued = false;
      const t = clamp(window.scrollY / (window.innerHeight * 0.95), 0, 1);
      pack.style.setProperty('--t', t.toFixed(4));
      pack.style.setProperty('--turn', smooth(0.1, 0.6, t).toFixed(4));
    };
    window.addEventListener(
      'scroll',
      () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(update);
      },
      { passive: true },
    );
    update();
  }

  /* Photo strip ---------------------------------------------------------------------------------- */
  document.querySelectorAll<HTMLElement>('[data-strip]').forEach((strip) => {
    const track = strip.querySelector<HTMLElement>('[data-strip-track]')!;
    const by = (dir: number) => {
      const slide = track.querySelector<HTMLElement>('.pd-strip-slide');
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: dir * ((slide?.offsetWidth ?? 300) + gap), behavior: reduced ? 'auto' : 'smooth' });
    };
    strip.querySelector('[data-strip-prev]')?.addEventListener('click', () => by(-1));
    strip.querySelector('[data-strip-next]')?.addEventListener('click', () => by(1));
    track.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      by(e.key === 'ArrowLeft' ? -1 : 1);
    });
  });
}
