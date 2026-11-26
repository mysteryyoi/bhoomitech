# 04 — Technical architecture (Agent A4)

Scope: stack, hosting, performance, content model, forms, languages, SEO, accessibility, analytics, QA, delivery. This replaces the "page-by-page" and "wireframe" sections with a route map and repo structure.

Verified vs unverified: package versions below were read from the npm registry on 2026-11-26. Form-service limits come from third-party comparison sites (vendor pages were not directly confirmed) and are marked `[VERIFY]`.

## 1. Purpose

Build a static, fast, motion-rich site that works for three audiences: households (find produce, find a seller), farm businesses (software demo enquiry) and farmers (services enquiry). The architecture serves one rule above all: the site must be excellent on a Rs 8,000 Android phone on 4G, and extraordinary on a laptop. Everything heavy is progressive enhancement over a complete, fast, HTML-first baseline.

## 2. Stack decision

**Decision: Astro (static output) + TypeScript + vanilla CSS with design tokens (CSS custom properties, plus native CSS nesting/layers) + GSAP/ScrollTrigger + Lenis + Three.js, with Astro "islands" kept to a minimum.**

| Concern | Choice | Version (verified) |
|---|---|---|
| Framework | Astro, `output: 'static'` | astro 7.4.13 (pin the major; read the changelog before bumping) |
| Language | TypeScript, `strict` | typescript 7.0.2 (if tooling lags, pin the latest 5.x) |
| Animation | GSAP + ScrollTrigger (free for all uses since GSAP became free) | gsap 3.15.1 |
| Smooth scroll | Lenis, wired to ScrollTrigger ticker | lenis 1.3.28 |
| 3D | Three.js, custom-built minimal import (no postprocessing stack by default) | three 0.187.0 |
| Sitemap | @astrojs/sitemap | 3.7.6 |
| Tests | Playwright, Lighthouse CI | @playwright/test 1.65.1, @lhci/cli 0.16.1 |

Pin exact versions with a committed lockfile; use Node 22 LTS in CI. `[VERIFY]` Astro 7 compatibility of each integration at install time.

**Why Astro.** The site is content-heavy, mostly static and needs near-zero JS by default. Astro ships HTML and zero JS unless a script is added, has first-class content collections with Zod schemas (the produce/seller data files), built-in image optimisation (`astro:assets`), and built-in i18n routing. GSAP/Lenis/Three are framework-agnostic and run fine in plain `<script>` modules. No React/Vue runtime is needed, which saves 40-60 KB of JS that low-end phones would pay for.

**Alternatives considered.**
- *Next.js static export:* works, but ships a React runtime (~70 KB+ gz) on every page, has weaker static image optimisation under `output: 'export'`, and gives nothing the site needs. Rejected.
- *SvelteKit static adapter:* excellent runtime size and good for the interactive bits, but weaker content-collection and image tooling and a smaller pool of freelancers in India to maintain it. Close second; rejected on maintainability.
- *Challenge to the brief:* nothing in the brief needs overturning. One caution: Lenis (smooth scroll) hurts some low-end devices and some assistive-tech users. It is enabled only on Tier 1 (see section 4) and always off for `prefers-reduced-motion`.

**Styling: vanilla CSS with tokens, not Tailwind.** Rationale: the design is bespoke and motion-driven (long, custom keyframes and GSAP-controlled states), where utility classes add noise; tokens (colour, type scale with `clamp()`, spacing, easing, durations) map directly from A1's brand system; Astro scoped styles give component isolation with zero runtime; output CSS stays tiny (target under 30 KB gz total). Structure: `@layer reset, tokens, base, layout, components, utilities;`. Tailwind remains acceptable if the implementers strongly prefer it, but the plan assumes vanilla.

**JS architecture.**
- One tiny always-loaded core (`core.ts`, under 6 KB gz): device-tier detection, nav, reduced-motion handling, analytics events.
- GSAP + ScrollTrigger (about 30 KB gz for core + ScrollTrigger) loaded on Tier 1 and 2 only, via dynamic `import()` after first paint (`requestIdleCallback`, with timeout fallback).
- Lenis (about 3 KB gz) Tier 1 only.
- Three.js loaded only for the "seed grows" scene, only on Tier 1, only when the scene is within about 1.5 viewport heights of the viewport (IntersectionObserver), through its own chunk. Use named imports from `three` and a manual chunk so tree-shaking drops unused modules (target about 150-190 KB gz for the chunk; verify with the bundle analyser).
- No client framework. Interactive widgets (seller filter, forms) are small vanilla TS modules with progressive enhancement: the seller list renders as real HTML and filtering enhances it.

**3D loading.** `<canvas>` is created in JS, never in markup. The poster is real HTML: an optimised AVIF/WebP image (or inline SVG) of the scene, which is also the LCP element on pages that have the scene. Upgrade sequence: poster shown → tier check passes → import Three chunk → fetch compressed model/textures → crossfade to canvas. Failure at any step leaves the poster in place. Assets: glTF binary with Draco/meshopt compression and KTX2/WebP textures; procedural geometry preferred over models where possible (seed, sprout and leaf can be generated in code with small shaders, which costs a few KB instead of megabytes).

## 3. Hosting and deploy

**Recommendation: move to Cloudflare Pages, keep the GitHub repo as source of truth.** GitHub Pages works and is acceptable for launch day, but has real limits for this site: no custom response headers (no cache-control tuning, no security headers, no `Link: rel=preload`), no redirect rules, no preview deployments per branch, no image CDN and no serverless function for forms. Cloudflare Pages is free, has Indian PoPs (good for 4G latency), serves Brotli, supports `_headers` and `_redirects`, gives per-branch/PR preview URLs, allows a Pages Function if forms ever need one, and has free cookieless Web Analytics. Netlify and Vercel would also work; Cloudflare wins on India edge coverage and free bandwidth. Decision needed from the owner on DNS access (see open questions).

**Fallback and phase 1: GitHub Pages stays valid.** The brief's constraint holds: the output is plain static files, so both hosts work. Keep `public/CNAME` containing `bhoomitech.in` and `public/.nojekyll` so GitHub Pages keeps working; Cloudflare ignores them.

**Changes to `.github/workflows/deploy.yml`** (keep the existing Pages permissions, concurrency and `environment`):
1. Replace the "upload `dist`" flow with a build job: `actions/checkout@v4` → `actions/setup-node@v4` with `node-version: 22` and `cache: npm` → `npm ci` → `npm run check` (astro check + lint + typecheck) → `npm run build` (output to a new `dist/` that is gitignored; the current hand-written `dist/` moves to `public/` or an `archive/placeholder/`).
2. Cache `node_modules/.cache` and Astro's image cache (`.astro`/`node_modules/.astro`) keyed on lockfile and `src/assets/**` hash, so image processing is not redone on each run.
3. `actions/upload-pages-artifact` with `path: dist`; separate `deploy` job `needs: build`, using `actions/deploy-pages`. Verify the CNAME file exists in `dist` after build (a one-line `test -f dist/CNAME` step) so a deploy can never drop the custom domain.
4. Add a `pull_request` workflow (`ci.yml`): build, Lighthouse CI, Playwright smoke, link check. It does not deploy.
5. `.openai/hosting.json` keeps pointing at `dist`; it keeps working because the build writes to `dist`.

**Previews.** On Cloudflare Pages: every PR/branch gets `<branch>.<project>.pages.dev` automatically, set to `noindex` through a `_headers` rule (`X-Robots-Tag: noindex` on non-production hosts). On GitHub Pages only (no Cloudflare): publish PR previews as a build artifact plus run Playwright against `astro preview` in CI; or use a `staging` branch deployed to a second Pages environment via `rossjrw/pr-preview-action`. The staging site always carries `noindex`.

**Headers and redirects (Cloudflare `public/_headers`, `_redirects`).** Immutable long cache for hashed `/_astro/*`; short cache plus revalidate for HTML; CSP (self, analytics host, form endpoint, Turnstile), `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` locking camera/mic/geolocation. Redirects: `www` to apex, trailing-slash normalisation, and any retired URLs.

## 4. Performance budget and device tiers

**Targets (measured on mid-tier Android, Slow 4G, mobile Lighthouse and field data):**

| Metric | Target | Hard fail in CI |
|---|---|---|
| LCP | under 2.5 s mobile 4G (aim 2.0 s) | over 3.0 s |
| INP | under 200 ms (aim 150) | over 250 ms |
| CLS | under 0.05 | over 0.1 |
| TBT (lab proxy for INP) | under 200 ms | over 300 ms |
| Lighthouse Performance (mobile) | 90 or more homepage, 95 or more other pages | under 85 |
| Homepage initial transfer, Tier 3 (no JS extras) | under 250 KB all-in | over 350 KB |
| Homepage JS, before interaction, Tier 1 | under 110 KB gz (core + GSAP + ScrollTrigger + Lenis) | over 140 KB |
| Three.js chunk | lazy only; 190 KB gz max, never in the critical path | n/a |
| 3D assets (model + textures) | under 600 KB total, ideally under 300 KB | over 900 KB |
| CSS total | under 30 KB gz | over 45 KB |
| Fonts | 2 families max, under 90 KB total woff2 including Devanagari subset when active | over 140 KB |
| Hero image | under 80 KB (AVIF), explicit width/height, `fetchpriority="high"` | over 120 KB |

**Tiers and detection.** Detection runs in `core.ts` before any heavy import, results exposed as `document.documentElement.dataset.tier` (`1|2|3`), so CSS can also branch.

- *Tier 3 (lite):* any of: `navigator.connection.saveData`, `effectiveType` in `slow-2g|2g|3g`, `navigator.deviceMemory` at most 2, `hardwareConcurrency` at most 2, or a user toggle ("Lite mode" in the footer, persisted in `localStorage`, also offered automatically via a small banner when frame rate is poor). Gets: no Lenis, no GSAP, no Three; CSS-only reveals (`animation-timeline: view()` where supported, otherwise IntersectionObserver class toggles); static posters in place of 3D; no autoplay video; smaller image sizes selected via `srcset`.
- *Tier 2 (standard):* default for most mid-range Android. Gets GSAP/ScrollTrigger reveals and pinned chapters, native scroll (no Lenis), no WebGL; 3D scene replaced by a pre-rendered scroll-scrubbed image sequence or lightweight CSS/SVG animation (under 150 KB, WebP frames at 640 px, or a 20 fps short loop).
- *Tier 1 (rich):* desktop and high-end phones: `deviceMemory` at least 4, `hardwareConcurrency` at least 6 or 8, `effectiveType` is `4g`, WebGL2 available and a quick GPU sanity check (a 200 ms warm-up measures frame time; if the median frame is over 24 ms, drop to Tier 2). Gets Lenis, full choreography, Three.js scene.
- *Always:* `prefers-reduced-motion: reduce` forces Tier 3 motion behaviour (static state, no parallax, no autoplay, crossfades only) regardless of hardware; `prefers-reduced-data` honoured where available. Detection caveat: `deviceMemory` and `connection` are Chromium-only; absent signals default to Tier 2, not Tier 1. iOS Safari defaults to Tier 1 on modern devices, gated by the frame-time check.
- *Dynamic downgrade:* an FPS monitor during the first 3 seconds of the 3D scene; if sustained under 30 fps the canvas is disposed (`renderer.dispose()`, loses context) and the poster is restored. Pixel ratio capped at 1.5 (Tier 1) and 1 on mobile.

**General rules.** Server-rendered HTML for all content (works with JS disabled); no layout shift from fonts (`font-display: swap` plus metric-matched fallbacks via `size-adjust`); self-host fonts (no Google Fonts request); images through `astro:assets` with AVIF + WebP, explicit dimensions, lazy-loaded below the fold; video only as optional background loops with a poster, under 1.5 MB, `preload="none"` on Tier 2/3; GSAP animations only use `transform` and `opacity`; `will-change` applied transiently; page transitions use Astro View Transitions only if they cost nothing on Tier 3 (otherwise omitted).

## 5. Content model

**Format: Astro content collections, using YAML (or JSON) data files validated with Zod schemas.** A bad edit fails the build with a readable message instead of shipping a broken page. Content collections use the `file()` loader for single-file lists and the `glob()` loader for one-file-per-entry.

```
src/content/
  produce/                 one file per vegetable: lettuce.yaml, kale.yaml, cucumber.yaml
  sellers/                 one file per seller:   <slug>.yaml   (or a single sellers.yaml)
  faq/                     faq.yaml
  site/                    site.yaml  (phone, WhatsApp number, email, address, socials)
```

Produce schema (illustrative): `slug`, `name {en, hi?}`, `status` (`available|seasonal|coming-soon`), `season`, `shortBlurb`, `story`, `growMethod` (`[PLACEHOLDER: owner has not said]`), `nutrition` (optional), `howToUse`, `storage`, `image` (path under `src/assets/produce/`), `imageAlt`, `accentColor`, `order`, `sellers` (derived, not stored). Seller schema: `slug`, `name`, `type` (`shop|marketplace|online`), `city`, `area`, `address`, `phone`, `mapUrl`, `lat/lng` (optional), `url` (marketplace listing), `produce: [slugs]`, `active: boolean`, `verifiedOn: date`, `logo` (optional). The `produce` slugs in sellers are validated as references (`reference('produce')`), so a typo fails the build. "Where to buy" pages are generated from the join, so the owner edits one file and both produce and seller pages update.

**Editing by non-developers: Pages CMS (pagescms.org), a hosted git-based CMS configured by a `.pages.yml` in the repo.** `[VERIFY]` current features and free-tier status before commit. Reasoning: Keystatic's GitHub mode and Decap on GitHub both need a server-side OAuth endpoint, which static hosting cannot provide without extra infra; TinaCMS needs Tina Cloud (a vendor account and a limited free tier). Pages CMS needs only a GitHub login, edits files directly in the repo through a friendly form UI, supports images and validation, and costs nothing to run. Every edit becomes a commit, which triggers the deploy. Fallback that always works: edit the YAML in the GitHub web editor; the schema plus build-time validation makes this safe, and the README documents it in 10 lines. If the owner prefers a custom `/admin` path under their domain, Keystatic becomes viable on Cloudflare Pages (which can run the OAuth Functions); that is the upgrade path, not the starting point.

**Images.** Source originals go in `src/assets/` (not `public/`) so Astro processes them. Contributors drop in one JPG/PNG up to 3000 px; the build emits AVIF + WebP + JPEG fallback at 400/800/1200/1600 widths with `sizes`. A CI guard fails on source images over 8 MB or missing alt text (the schema makes `imageAlt` required). Open Graph images are generated at build time (see section 8). Sprite/video: stored under `public/media/` with a size guard (video max 3 MB each).

## 6. Forms

Three forms: Software demo/enquiry, Farmer services, and a general contact. All are plain `<form>` elements that work without JS (POST to the provider) and are progressively enhanced with `fetch` for inline success/error states.

| | Web3Forms | Formspree | Cloudflare Pages Function + email API (e.g. Resend) |
|---|---|---|---|
| Free tier `[VERIFY]` | about 250 submissions/month, unlimited forms, no account needed beyond an email-verified key | about 50/month | Functions free tier is generous; email API free tier is limited and separate |
| Spam | honeypot, built-in spam filter, supports hCaptcha/Turnstile/reCAPTCHA | honeypot, reCAPTCHA on paid tiers mostly | whatever we write: Turnstile + honeypot + rate limit |
| Email | instant email to owner inbox, plus auto-response on paid tiers | email notifications | full control, needs domain DNS (SPF/DKIM) |
| Data | processed on provider servers (US `[VERIFY]`); submissions are not stored long-term on the free plan `[VERIFY]` | stores 30 days of history on free | we own it, but nothing is stored unless we add storage |
| India-friendly | works from anywhere, INR-free, no card needed | requires paid plan for bulk | good, but more setup |

**Recommendation: Web3Forms at launch, with Cloudflare Turnstile and a honeypot,** because it needs no server, no account friction, has the highest free allowance and delivers to a normal email (and a second inbox, such as a shared team address). Set separate access keys per form so the farmer and software enquiries route to different inboxes. If volume passes about 200 per month or the owner wants storage or a CRM, move to the Pages Function path; the form markup does not change because the action URL is a single constant in `site.yaml`.

Spam and abuse defence: honeypot field, Turnstile (invisible/managed mode), minimum-time-on-page check, server-side validation by provider, client validation with clear inline messages (and a phone-number pattern for India: 10-digit mobile, optional +91). Privacy: collect the minimum (name, phone, optional email, farm size/crop, message); a consent line linking to a privacy page; no pre-ticked marketing boxes; a retention note that the owner deletes enquiries after follow-up. Success state offers WhatsApp as a second route.

**WhatsApp click-to-chat.** Use `https://wa.me/<number-with-country-code>?text=<url-encoded message>`; the number comes from `site.yaml` `[PLACEHOLDER: WhatsApp number]`. Prefill per context ("Hi Bhoomi Tech, I would like a demo of the farm software", "...I run a farm and want AI services", "...where can I buy your kale in [city]?"). Persistent floating action button (mobile bottom-right, 48 px, avoids covering form controls and respects safe-area insets), plus inline links on each page. Always pair with a `tel:` link. On desktop, `wa.me` opens WhatsApp Web; this is fine.

## 7. Languages

**English at launch; the structure is i18n-ready from day one.** Use Astro's built-in i18n routing: `defaultLocale: 'en'`, `locales: ['en', 'hi']`, `routing: { prefixDefaultLocale: false }`, so English lives at `/` and Hindi at `/hi/…`. Add further locales later (the regional language depends on the state `[PLACEHOLDER: location]`).

- *UI strings:* `src/i18n/ui/en.ts`, `hi.ts` (typed key map, `t('nav.produce')`). No hard-coded copy in components.
- *Content:* produce/seller/FAQ schema fields that are user-facing are `{ en: string, hi?: string }`; missing `hi` falls back to English and renders `lang="en"` on that fragment. Alternatively one file per locale (`produce/hi/kale.yaml`); the inline form is chosen because one edit screen then covers both languages. Names, phone and addresses are not translated; seller names stay as-is.
- *Fonts:* Latin: a variable display + body pair chosen by A1. Devanagari: Noto Sans Devanagari (body) and, if a display voice is needed, a matching heading face such as Poppins-plus-Devanagari or Tiro Devanagari, loaded only on `/hi/` pages through `unicode-range` subsetting (woff2, about 25-45 KB per weight). Hindi needs more line-height (about 1.6-1.7 for body) and no negative letter-spacing; display type sized with the same tokens but a `:lang(hi)` override. Test truncated headings: Devanagari is 15-30% wider.
- *SEO:* `<link rel="alternate" hreflang>` pairs for each page plus `x-default`; `<html lang>` set per page; language switcher in the header and footer that preserves the current page.
- *Routing/build:* the same Astro page components render both locales from `[...locale]` dynamic routes or mirrored folders; sitemap integration is configured with `i18n` locales.
- *Translation workflow:* human translation (not machine) of final copy; a CI check lists strings missing a `hi` value as warnings (not failures). Voice/audio explainers, and WhatsApp prefilled messages per locale, are post-launch ideas.

## 8. SEO and sharing

- Per-page `<title>` (under 60 chars), meta description (under 155), canonical URL (absolute, `https://bhoomitech.in/…`, trailing-slash policy fixed in config), `og:*` and Twitter card tags, `theme-color`, favicon set (SVG + 32 px PNG + 180 px apple-touch + manifest). One `<Seo />` component takes typed props; pages cannot omit title/description (TypeScript error).
- *OG images:* 1200x630, generated at build time from templates (Satori + resvg, or the Astro `og` route pattern) for every page and every produce item (produce name, tagline, product photo). Falls back to a single static brand OG. Dynamic images are cached as build output.
- *Sitemap and robots:* `@astrojs/sitemap` with `i18n` alternates; `robots.txt` generated in Astro with the sitemap line, and `Disallow: /` on non-production hosts. Add Search Console and Bing Webmaster verification after launch `[PLACEHOLDER: owner Google account]`.
- *Structured data (JSON-LD, generated from content so it can't drift):* `Organization` (name, logo, url, sameAs, contactPoint with WhatsApp/phone `[PLACEHOLDER]`) sitewide; `WebSite`; `Product` for each produce item with `name`, `image`, `description`, `brand` (no `offers`/price since nothing is sold online; add `availability` only if accurate); `LocalBusiness` or `Store` entries for each authorized seller on Where to Buy (name, address, geo, telephone) `[PLACEHOLDER: seller data]`; `FAQPage` where an FAQ exists (Rich-result eligibility for FAQ is limited; still useful for clarity); `BreadcrumbList`. `SoftwareApplication` for the farm software once real features exist. Validate in CI with a schema checker.
- Local SEO: city landing sections on Where to Buy (e.g. `/where-to-buy/<city>/`) once real sellers exist; Google Business Profile `[PLACEHOLDER: owner]`.
- Social sharing: WhatsApp is the dominant share channel in India; ensure OG image is under 300 KB and the title/description read well in the preview.

## 9. Accessibility (target WCAG 2.2 AA)

- *Structure:* semantic landmarks, one `h1` per page, skip link to `#main`, visible `:focus-visible` rings (2-3 px lime on dark, with at least 3:1 against adjacent colours and a dark inner ring for light surfaces), logical tab order, 24 px minimum target size (we use 44 px for primary actions), no focus obscured by the sticky header or WhatsApp button (`scroll-padding-top`, 2.4.11), no drag-only interactions (2.5.7), consistent help placement (3.2.6), and no re-entry of already provided info (3.3.7).
- *Motion:* `prefers-reduced-motion: reduce` disables Lenis, parallax, pinned scroll-jacking, autoplay and scrubbed animation; content is shown in its final state; any animation longer than 5 s gets a pause control. No flashing above 3 per second. A visible "Reduce motion" / "Lite mode" toggle also exists for people whose OS is not configured.
- *Scroll behaviour:* never hijack native scroll semantics; Lenis must not break keyboard scrolling, anchor links, find-in-page, or `Home/End/PageUp/PageDown`; pinned sections must remain reachable and readable with a screen reader because the DOM order equals the reading order and all text is in the HTML.
- *3D/WebGL:* canvas is `aria-hidden="true"` and decorative; the same story is carried by the adjacent text and a descriptive `figcaption`; the poster has meaningful alt text; there is no information only available in the canvas; no keyboard trap; a "pause animation" button for any loop over 5 s.
- *Colour and contrast:* lime `#b8ed79` and pale lime `#e2ffb0` on `#101610` have very high contrast (above 12:1), so body text, links and focus are safe on dark. Risk areas: leaf green `#629e36` on near-black (about 4.4:1 by estimate, borderline for small text; use it only for large text or non-text decoration, and verify with a checker); deep green `#294a20` on near-black fails for text (decorative only); lime used as a button background needs dark text `#101610` on it (high contrast) and never white text. Any light section must use dark-green text, not lime. Disabled and placeholder text still at 4.5:1. Don't rely on colour alone for state (add icons or underline). Contrast is checked in CI against token pairs (a small script iterating the token map).
- *Forms:* visible `<label>`s (not placeholder-only), `autocomplete` attributes (`name`, `tel`, `email`), error messages associated with `aria-describedby` and announced via `role="alert"`, input `inputmode="tel"` on phone, and errors identified in text. Success messages in an `aria-live` region.
- *Language:* correct `lang` attributes and, for Hindi, tested with TalkBack. Alt text for every meaningful image (schema-enforced); decorative images `alt=""`.
- *Testing:* axe via Playwright on every page and state (menu open, form error), manual keyboard pass, NVDA/TalkBack spot check before launch.

## 10. Privacy-friendly analytics

**Decision: Umami (cloud free tier or self-host later) as the primary analytics; Cloudflare Web Analytics as a free, cookieless backup if hosted on Cloudflare.** `[VERIFY]` Umami Cloud's current free limits. Umami is cookieless, needs no consent banner, has a custom events API, and the tracker is under 2 KB. Plausible would be the polished alternative but has no free plan; Google Analytics is rejected (cookie banner, weight and privacy). Load the tracker with `defer` after first paint; honour Do Not Track.

Events (name: properties), all fire client-side, no PII ever included:
- `enquiry_submitted`: `form` (`software|farmer|contact`), `locale`
- `enquiry_started`: first field focus (funnel drop-off)
- `whatsapp_click`: `placement` (`fab|hero|form-success|footer`), `context` (page)
- `phone_click`: `placement`
- `seller_outbound_click`: `seller` (slug), `city`, `produce`
- `where_to_buy_filter_used`: `city`, `produce`
- `cta_click`: `door` (`households|business|farmers`), the three homepage doors
- `produce_viewed`: `produce` (slug)
- `tier_assigned` (once per session): `tier`, `reason`, to learn how many visitors are on the lite path and whether to invest in the 3D
- `lang_switch`

Goal definitions: enquiry rate (submissions per visitor) per form; WhatsApp-plus-phone clicks; seller outbound clicks per household visitor. A privacy page lists these in plain language.

## 11. QA

- *CI on every PR:* `astro check`, ESLint, Stylelint, Prettier; unit tests for tier detection and form validation (Vitest).
- *Lighthouse CI (`@lhci/cli`):* mobile preset, Slow 4G and 4x CPU throttle, 3 runs per URL, assertions mirroring section 4 (performance at least 0.9, accessibility at least 0.95, SEO at least 0.95, best-practices at least 0.95; LCP, CLS, TBT, `total-byte-weight` and `resource-summary:script:size` budgets). Run against home, one produce page, Where to Buy, Farm Software, For Farmers, Contact, and `/hi/` home. Run once with Save-Data emulation to prove Tier 3.
- *Playwright:* smoke tests (every route returns 200, no console errors, each form submits against a mocked endpoint and shows success/error, WhatsApp link has the correct `wa.me` href, seller filter works, language switch preserves the page, skip link works, reduced-motion renders final states, Tier 3 renders no canvas); axe-core accessibility scans on all pages; visual regression screenshots (desktop 1440, tablet 820, phone 390) on Tier 3 (stable, animation-free) and with `prefers-reduced-motion` to avoid flaky motion diffs; animation moments are tested through frame-captured checkpoints, not pixel diffs.
- *Link checking:* `lychee` in CI for internal links and (weekly, scheduled) external seller URLs, so a dead marketplace link is reported to the owner.
- *Content validation:* Zod at build; image alt, size and dimension guards; spell-check of data files (cspell, with a project dictionary).
- *Device matrix (manual before each milestone, plus BrowserStack/real devices where possible):* Low-end Android (2 GB RAM, Android 10-12, Chrome, 4G throttled, e.g. Redmi 9A-class, Samsung Galaxy M-series); mid Android (Pixel 6a/Redmi Note-class, Chrome and Samsung Internet); an iPhone (SE or 12 and newer, Safari); iPad Safari; Windows laptop Chrome and Edge; MacBook Safari and Firefox; plus UC Browser/Opera Mini sanity check for the baseline HTML (should be readable). Network profiles: Wi-Fi, Fast 4G, Slow 4G, and offline load of a cached page.
- *Real-user monitoring:* Core Web Vitals through Umami or `web-vitals` sent as events; monthly review. Uptime ping on the custom domain.

## 12. Route map and repo structure

**Routes (English at `/`, Hindi mirrored at `/hi/…`):**

```
/                             Home
/produce/                     Our Produce (index)
/produce/[slug]/              lettuce, kale, cucumber, ... (generated from collection)
/where-to-buy/                Where to Buy (filters by city and produce)
/where-to-buy/[city]/         optional, generated once sellers exist
/farm-software/               Farm Software  (+ #demo form)
/for-farmers/                 For Farmers  (+ #talk form)
/about/                       About
/contact/                     Contact (both forms, WhatsApp, phone)
/privacy/   /terms/           Legal pages [PLACEHOLDER: owner/legal]
/thanks/                      post-submit fallback when JS is off
/404                          custom 404
/og/[...slug].png             build-time OG images
/sitemap-index.xml  /robots.txt  /manifest.webmanifest
```

**Repository:**

```
boomitech/
  .github/workflows/ deploy.yml  ci.yml  links.yml
  docs/plan/                      (planning docs)
  public/                         CNAME  .nojekyll  _headers  _redirects  favicons/  fonts/
  src/
    assets/                       images, produce photos, svg, 3D (glb, ktx2)
    components/                   Header, Footer, Seo, Hero, Section, Door, ProduceCard,
                                  SellerCard, EnquiryForm, WhatsAppFab, LangSwitch ...
    content/                      produce/, sellers/, faq/, site/ + config.ts (Zod schemas)
    i18n/                         ui/en.ts, ui/hi.ts, utils.ts
    layouts/                      BaseLayout.astro
    pages/                        file routes above (+ [locale] mirrors)
    scripts/
      core.ts                     tier detection, nav, analytics
      motion/ (gsap setup, scrolltrigger scenes, lenis)
      three/  (seed scene, loader, fps guard)  -- dynamic chunk only
    styles/                       tokens.css, base.css, layers.css, components/
  tests/                          e2e/ (Playwright), unit/ (Vitest)
  astro.config.mjs  tsconfig.json  lighthouserc.json  .pages.yml  package.json
```

The current `dist/` placeholder is moved to `public/` or archived; `dist/` becomes build output and is gitignored.

## 13. Phased delivery (each phase ends in something deployable)

| Phase | Deliverable | Effort |
|---|---|---|
| 0. Foundation | Astro project, tokens from A1, base layout, CI (build, Lighthouse, Playwright smoke), deploy workflow keeps the "coming soon" live while preview builds are available; deploy to staging | S |
| 1. Content skeleton | All routes with real structure and placeholder copy, content collections and schemas, Pages CMS config, SEO component, sitemap, robots, 404, nav, footer, language-ready strings. Fully usable, no motion | M |
| 2. Forms and contact | Web3Forms plus Turnstile, WhatsApp/phone, analytics events, privacy page. Site can already take enquiries. **Soft launch candidate** | M |
| 3. Motion layer | Tier detection, Lenis, GSAP reveals and chapters, page transitions, reduced-motion paths, Tier 2/3 fallbacks | L |
| 4. Signature 3D | Three.js seed scene, poster/sequence fallbacks, FPS guard, asset compression, budgets locked | L |
| 5. Produce and sellers | Real produce pages, seller data, JSON-LD, OG images, city pages | M |
| 6. Hindi/regional | Translation pass, Devanagari fonts, hreflang, switcher, QA with native speakers | M |
| 7. Hardening and launch | Device-matrix pass, axe and screen-reader pass, perf tuning, DNS cutover (Cloudflare Pages or stay on GitHub Pages), Search Console, monitoring | M |

Phase 2 is the earliest point at which the site beats the placeholder and could replace it; Phases 3-4 can follow without blocking the business.

## 14. Content and assets needed from Bhoomi Tech

- [ ] DNS access for `bhoomitech.in` (needed for Cloudflare, Search Console and email DNS)
- [ ] GitHub accounts for the people who will edit content (collaborator access to `mysteryyoi/bhoomitech`)
- [ ] Notification inbox(es) for enquiries (software vs farmer) `[PLACEHOLDER: emails]`
- [ ] WhatsApp number and phone number, business hours `[PLACEHOLDER]`
- [ ] Languages to support and a translator `[PLACEHOLDER]`
- [ ] Produce photos (and any farm video), with usage rights; seller list; logo files
- [ ] Privacy/terms text, or approval for a standard template reviewed by their advisor
- [ ] Analytics account, Google Search Console and Business Profile access

## 15. Dependencies

- A1: design tokens (colour, type, spacing, easing), the motion language, and the 3D scene brief (which defines the Three.js asset budget).
- A2: produce and seller schemas and fields (this plan defines a starting point; A2 amends fields).
- A3: form fields and the WhatsApp message wording; forms must conform to the accessibility and spam rules here.
- Lead: confirmation to move hosting (Cloudflare) or stay on GitHub Pages.

## 16. Open questions for the owner (most important first)

1. **Where are your customers, and which languages?** (State/cities, Hindi and/or a regional language.) This decides the Phase 6 language, font choice and seller seed data.
2. **Can we move DNS to Cloudflare (free) and host there**, or must it stay on GitHub Pages? Staying works, but loses headers, previews and a path to a serverless form handler.
3. **Who edits the produce and seller lists, and are they comfortable with a GitHub login** (Pages CMS) or do they need a branded admin screen?
4. Do you have real farm photography/video, or should we plan for illustration/3D only (changes asset budget and Hero approach)?
5. Where should enquiries go (email, shared inbox, a CRM), and how quickly must someone respond (affects whether a basic storage/CRM hook is needed in Phase 2)?

## 17. Risks

- Astro 7 and TypeScript 7 are recent majors; pin versions and have a 5.x TypeScript fallback if tools lag.
- Web3Forms and Pages CMS terms and limits are third-party; keep a swap path (form action in one constant; content stays as plain files in git).
- Lenis and pinned scroll can regress accessibility and INP; keep them behind the tier gate and test on real low-end devices.
- Form data crosses to a US provider; the privacy page must say so, and a self-owned function is the upgrade.
