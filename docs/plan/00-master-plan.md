# Bhoomi Tech website: master plan

**Status:** draft v3, with the Claude and Codex plans merged and the owner's four start decisions recorded (26 Nov). Awaiting Rohit's approval. Nothing is built until he approves it.
**Date:** 26 Nov 2026
**Sources:**
- The owner's own words (in chat)
- Claude planning agents A1–A4 (`01`–`04` in this folder)
- Codex's independent plans `codex-01`–`04`, received over Agent Hub thread #21 (see §13)

This file is the single plan to build from. Each area plan holds the full detail, including wireframes, data fields and copy drafts. Where the area plans disagree, **§10 records the ruling, and the ruling here wins.**

---

## 1. What we're building and why

**Bhoomi Tech** (bhoomitech.in) is an agritech company that covers the whole chain, **seed to fork**:
- It grows vegetables. The launch list is lettuce, kale and cucumber.
- It builds AI software that automates farms.
- It offers AI-enabled and modern-farming services to farmers.
- It runs marketplace services.

Today the domain shows a one-page "coming soon" placeholder.

The owner wants a site that feels like a **$60k agency build**: modern, interactive and alive, **not a normal static website**. Time is not the constraint; craft is.

**Who the site serves, and what each visitor should do:**

| Audience | What they need | What they do on the site |
|---|---|---|
| Households | What Bhoomi Tech grows, and where to buy it | Browse produce, then find an authorized seller (shop or marketplace) |
| Farm businesses | Whether the AI farm software is credible | Book a demo |
| Farmers | Whether Bhoomi Tech can help on their land, in their language | WhatsApp, call, or a short form |

**Goals**
1. A visitor in each audience reaches their action in **two taps from the homepage doors**.
2. The site is **beautiful on a laptop and fast on an Rs 8,000 Android phone on 4G**.
3. It is **honest by construction**: no invented numbers, clients, sellers or claims.

**Non-goals:** online selling (cart, payments, accounts), a customer login, and a blog at launch.

**Anti-goals.** These make the project a failure even if everything technically works:
- It feels like a crypto or SaaS template: neon gradients, glassmorphism, stock photos.
- A farmer on a cheap phone can't use it.
- It shows a fake statistic, a fake testimonial or an unconsented seller.
- The motion gets in the way of reading.

---

## 2. Decided

**By the owner:**
- **26 Nov decisions:**
  - Creative direction: **"Soil, Annotated" with the lettuce spine**
  - Hosting: **Cloudflare Pages**
  - Visuals: **full production**, a 2-day photo shoot plus 3D scans of the real produce
  - Languages: **English first, Hindi later** (the Hindi routes are built in from the start and filled in Phase 6)
- No online selling. Vegetables are sold through **authorized sellers**, and the site says where.
- Farm software and farmer services are reached through **contact**.
- The produce list is lettuce, kale and cucumber, with more to come.

**By the lead.** These stand unless the owner objects:

| Decision | Choice | Why |
|---|---|---|
| Site map | 7 pages + per-vegetable pages + legal (§5) | Covers all three audiences without a shop |
| Stack | Astro (static) + TypeScript + vanilla CSS tokens + GSAP/ScrollTrigger + Lenis + Three.js | Ships almost no JS by default, so the heavy pieces load only where they pay off (A4 §2) |
| Data | Produce and sellers as data files validated at build time; editing through a GitHub-backed CMS | Adding a vegetable or a shop is a form edit, not a redesign |
| Forms | A third-party form service, plus WhatsApp and phone links | Static hosting has no server |
| Languages | English at launch, with Hindi routes (`/hi/`) built in from day one | Farmers need it. Retrofitting languages later is expensive |
| Honesty rule | Any component whose data is still a `[PLACEHOLDER]` renders nothing, or a dash, never a made-up value | Protects trust (A1, A2, A3 and all four Codex plans independently asked for this) |
| No-JS baseline | Every key journey works with JavaScript off: find a seller for a crop and a city, request a demo, contact as a farmer | Codex C2/C4. Cheap phones, broken scripts and search engines all get the full site |
| Name | The wordmark stays `bhoomitech.`; sentences and screen-reader labels say "Bhoomi Tech" | Codex C1. It matches how the owner says it. Confirm with Q12 |

---

### 2.1 Lead's calls from the builder review (correct any of these)

A reviewer read this plan as the builder and flagged gaps. These are settled as follows unless the owner says otherwise:

- **Built for a non-technical editor.** All routine edits go through the CMS forms. A one-page runbook covers adding a vegetable, adding or suspending a seller, and what to do when a build fails. Ongoing technical maintenance (keys, dependency updates, Hindi updates) is a named person or a retainer. **That choice is the owner's.**
- **Bhoomi Tech owns every account.** GitHub, Cloudflare, the form service, Umami and Search Console are all created under a Bhoomi Tech email, never a contractor's. The owner holds the credentials list.
- **Analytics:** Umami Cloud's free tier if its limits fit (verify in Phase 0); self-host later if needed.
- **Branded inboxes on bhoomitech.in** (for example `hello@`, `sales@`, `farmers@`), with SPF and DKIM set up in Phase 0. Form notifications and auto-replies depend on them.
- **Food and claims rules (India).**
  - The footer and the vegetable template get a slot for an **FSSAI licence number**, shown once supplied.
  - Nutrition is shown as cited "general information".
  - Claims like "organic", "pesticide-free" or "fresh" are not used without evidence.
  - Claims and the privacy notice get a legal review **in Phase 1**, not at launch.
- **Marketplace links are plain outbound links**, with no affiliate tracking. If any link is ever paid or affiliate, it carries a disclosure.
- **The farmer form launches only if someone is staffed to reply** in the farmers' language. Otherwise For Farmers launches with WhatsApp and Call plus published hours, and the form follows.
- **If the software is pre-launch,** Farm Software uses "join the pilot" framing, with no customer claims, and the demo form becomes a pilot enquiry.

## 3. Approaches considered

### 3.1 Creative direction (owner to pick; A1 §3)

| Direction | What it is | Trade-off |
|---|---|---|
| **"Soil, Annotated"** *(recommended)* | Dark, cinematic soil with lime "AI annotations" that label living things in plain language. The logo's B crossbar becomes a "ground line". Home runs from night to daylight. | Keeps the existing dark and lime brand. Works **before** photography exists, because 3D and annotations carry it. Serves all three audiences in one system. |
| "Morning Market" | Light, appetising, cookbook-editorial | Lovely for households, weaker for software credibility. It **depends on top-class photography that doesn't exist yet**, and drops the current dark and lime look. |
| "Strata" | An isometric earth-cross-section diorama you dig through | Very memorable, but it reads as a toy to farm-business buyers and is the heaviest to produce and to run on phones. |
| "One lettuce" *(Codex C1)* | Calm and photographic. One head of lettuce is followed through five matched compositions: a seed between two fingers, a leaf, the head, a seller's counter, a plate. Each frame is composed around the same spot, so the cut itself carries the movement. Native scroll, no 3D needed. | The most honest and lightest option, and the story has a subject people can follow. It needs a commissioned matched shoot or illustration set. On its own it is calmer than the "insane" bar the owner asked for. |

**Owner's pick (26 Nov):** "Soil, Annotated", **with Codex's lettuce as its spine.**
- The seedling that grows in the hero *is* a lettuce.
- The harvest chapter opens on that same head.
- The plate shows its leaf.
- One subject is followed from seed to fork, wrapped in Claude's cinematic system.

### 3.2 Hosting (owner to decide; A4 §3, Codex note #226)

| Option | Pros | Cons |
|---|---|---|
| **Cloudflare Pages** *(recommended)* | Free. Has edge locations in India. Adds security and cache headers, redirects and per-branch preview links, and leaves a path to our own form handler. Cookieless analytics. | Needs DNS for bhoomitech.in moved to Cloudflare |
| Stay on GitHub Pages | Works today, with no DNS change | No headers, redirects or previews. GitHub's Pages terms say it is not meant as free hosting for business sites, so a company site is a grey area (raised by Codex). |

Either way the site is plain static files, so moving later is cheap.

**Owner's pick (26 Nov): Cloudflare Pages.** The GitHub repo stays the source of truth, and the domain's DNS moves to Cloudflare in Phase 0.

### 3.3 Where the 3D runs (lead's ruling, §10)

A1 wanted real-time 3D on most modern phones. A4 wanted it on desktops and high-end phones only. **Ruling:** real-time WebGL runs only on Tier 1. Everyone else gets the **same scene, pre-rendered** as a scroll-scrubbed image sequence. That keeps one creative idea on every device, without risking a cheap phone.

---

## 4. Creative system, in brief (full spec: A1 §4–5)

- **Three rules:**
  1. **The annotation layer.** Lime hairlines, anchor dots and mono labels show "the AI" reading the world in plain words: "Soil is drying, water at 5:40".
  2. **The ground line.** A 1px horizon taken from the B's crossbar. Things grow above it and are measured below it.
  3. **The dawn arc.** Home moves from night soil to daylight at the market and the plate.
- **Dark and daylight rule** (lead's ruling, settles the A1/A2/A3 conflict):
  - **Dark (soil)** is used for **growing and technology**: Home chapters 1–3, Our Produce and vegetable pages (the specimen look), Farm Software and About.
  - **Daylight (husk cream)** is used for **people and action**: Home chapters 4–5 and the doors, Where to Buy, For Farmers, and Contact.
  - Daylight is also easier to read outdoors and in sunlight, where farmers and shoppers often are.
- **Palette:**
  - Existing: near-black `#101610`, lime `#b8ed79`, pale lime `#e2ffb0`, leaf `#629e36`, deep green `#294a20`.
  - New: cream `#F2EEE3`, marigold `#F2B544`, water `#7CC8D8` and clay `#D1683A`, the last three for data only.
  - **Lime is never used as text on cream.**
- **Type:** serif display for life, sans for clarity, mono for the machine.
  - Display: GT Alpina (paid), or free Fraunces.
  - Sans: Geist.
  - Mono: Geist Mono.
  - Hindi: Noto Sans Devanagari, plus Eczar for display.
- **Motion:**
  - Two tempos: machine (fast, crisp) and nature (slow, soft).
  - Six named reveal patterns, R1–R6.
  - A "Till" page transition, where soil turns over.
  - A seed-dot cursor on desktop only.
- **Imagery:**
  - The destination is a 2-day photo shoot.
  - Until then: photogrammetry 3D scans of the **real** produce, plus technical line drawings.
  - **Never** stock or AI images posing as "our farm", "our team" or "our sellers".

---

## 5. Site map

```
/                         Home: the seed-to-fork journey, then three doors
/produce/                 Our Produce: "Harvest Index" (chapters ≤6 items, index 7–20)
/produce/[slug]/          one page per vegetable, generated from data
/where-to-buy/            seller finder: list-first, city anchors, filters in the URL
/where-to-buy/produce/[crop]/   static page per vegetable, grouped by city; works without JS (Codex C2)
/where-to-buy/[city]/     generated per city once sellers exist
/farm-software/           AI software story + Live Farm Console + demo form
/for-farmers/             daylight, WhatsApp-first, Hindi/English, "Tap what you need"
/about/                   "Bhoomi means earth", seed-to-fork step by step, values, people
/contact/                 chooser → software-demo form or farmer form; direct channels
/privacy/ /terms/ /thanks/ /404
/hi/…                     Hindi mirror (farmer-facing pages first)
```

**Nav order:** Our Produce · Where to Buy · Farm Software · For Farmers · About · Contact.

---

## 6. Pages and their signature moments

Each page gets **one** signature moment. Everything else is restrained craft.

| Page | Signature moment | Fallback on cheap phones / reduced motion | Detail |
|---|---|---|---|
| **Home** | **First screen:** the H1 plus three direct routes. **"Find a seller" is the primary button**, and the two farm routes are prominent links, so nobody has to sit through the story (Codex C1). **Then Seed to field.** The lime dot falls out of the wordmark into a hexagonal soil core, and the seed grows into **a lettuce**, the subject followed all the way to the plate. Scrolling grows the root down and the shoot up, and the leaves unfurl. The camera pulls back into a 37-cell field that an AI scan bar sweeps. Then the harvest turntables, then the **sunrise wipe** into daylight, the market route, the plate, and the three doors. | Tier 2: the same scene as a pre-rendered scrubbed sequence. Tier 3: 3 stills. Reduced motion: one composed still with the annotations already drawn. | A1 §6, §8 |
| **Our Produce** | **Specimen Stage.** Each vegetable rises and sharpens into place while its hairline callouts draw in. Specimens change through a hexagonal wipe. | Opacity-only reveals, static images | A2 §2.1, §4.1 |
| **Vegetable page** | **Seed to Shelf scrubber.** Six stage frames and a day counter, ending in "Find {name} near you". Shared by every vegetable. | A plain list of stages | A2 §2.2, §4.2 |
| **Where to Buy** | **City reveal.** A dot-map zooms to the chosen city, cards stagger in and the count ticks up. Shops and "Order from a marketplace" are listed separately. "Near me" (opt-in, runs in the browser only) waits until most sellers have coordinates. | Instant swap, with the result announced to screen readers. Without JS: static crop pages and city anchor links | A2 §2.3, §4.3; Codex C2 |
| **Farm Software** | **Live Farm Console.** A simulated 4-zone greenhouse. Visitors inject a heatwave, dry spell or leaf stress, and **switch Autopilot off** to watch crops struggle, then on to watch them recover. Always labelled "Simulated demo".
- **Control mode matches the real product** (Codex C3):
  - If the software acts on its own, the console shows "Autopilot".
  - If it suggests and a person approves, the console shows "AI suggests → you approve".
  - It never claims more than the product does.
- The scenario needs owner approval. | A step-by-hour mode, a one-zone low-fps mode, and a no-JS static decision transcript plus a 3-frame comparison | A3 §2.3; Codex C3 |
| **For Farmers** | **Tap what you need.** Crop and problem icon tiles build a ready-made WhatsApp message in the visitor's language. Nothing is collected by us. About 3KB of JS. | Each tile is a plain WhatsApp link | A3 §3.3 |
| **About** | **The ground line.** A giant "भूमि". Its headline bar extends into the site's lime ground line, the letters fill with soil and a tendril sprouts from the vowel sign. SVG only. | The final state, static | A1 §7–8 |
| **Contact** | **Chooser + sprout success.** The audience chooser reveals the right form. On success, the B-mark "sprouts". | A static tick | A3 §4 |

---

## 7. Shared systems

### 7.1 Device tiers (one definition for every page; settles A1 vs A4)

Detection happens once, in a tiny core script, before anything heavy loads. The result is written to `<html data-tier>`.

| Tier | Who | Detection (A4 §4) | Gets |
|---|---|---|---|
| **1 · Rich** | Desktops and high-end phones | deviceMemory ≥4, ≥6 cores, 4G, WebGL2, and passes a 200ms GPU check | Real-time WebGL hero, Lenis smooth scroll, cursor, full choreography, "Till" transition |
| **2 · Standard** | Most mid-range Android, and **the default when signals are missing** | Everything else | GSAP reveals and pinned chapters, **native scroll**, **no WebGL**: the 3D scenes play as pre-rendered scrubbed image sequences |
| **3 · Lite** | Save-Data, 2G/3G, ≤2GB memory, ≤2 cores, or a manual "Lite mode" toggle in the footer | Any of those signals | CSS-only reveals, stills, no autoplay media; homepage **under 250KB** in total |
| **Reduced motion** | Overrides every tier | `prefers-reduced-motion` | Final composed states, no pinning beyond one screen, no scrubbing, crossfades only |

**Live downgrade:** if the 3D runs under 30fps in its first 3 seconds, it shuts down and falls back to the sequence.

### 7.2 Performance budgets (A4 §4; checked in CI)

- **Speed:**
  - LCP under 2.5s on mobile 4G (hard fail at 3.0s)
  - INP under 200ms
  - CLS under 0.05
  - Lighthouse mobile at least 90 on Home and at least 95 elsewhere
- **Page weight** (Codex C4): a cold load at 390px wide, up to the first settled screen, is **at most 320KiB on Home** and **at most 240KiB on every other route**. That covers HTML, CSS, JS, fonts, analytics and first images.
- **JavaScript:**
  - **Critical JS (before first paint and idle) is at most 35KB per route**, including analytics (Codex C4). Everything else loads after first paint.
  - Homepage JS on Tier 1 after idle (GSAP, ScrollTrigger, Lenis): at most 110KB gz (aim 90)
  - The 3D scene must hold **33ms per frame at p95** on an integrated-GPU laptop, or it ships as the sequence instead
  - Three.js and scene code: **at most 250KB gz**, lazy-loaded, never in the critical path
- **3D assets:** at most 600KB (aim 300)
- **CSS and fonts:**
  - CSS at most 30KB gz
  - Fonts: three Latin families allowed (display, sans, mono), **at most 100KB woff2 in total**, with the mono subset to capitals, digits and symbols
  - The Devanagari subset loads on `/hi/` only

### 7.3 Shared components (A1 §9, A2 §8, A3 §6)

- **Page frame:** header, mobile menu, footer (with a giant wordmark whose dot breathes) and the "Till" page transition.
- **Layout pieces:** section header, CTA band, door cards (full and compact), media frame, marquee.
- **Annotation kit:** callout, brackets, crosshair, scan bar and field grid.
- **Data display:** stat counter (**it never renders without a real, sourced value**), "Find it at" chip, seller card, produce card, stage scrubber.
- **Contact pieces:** enquiry form (two variants), WhatsApp and Call buttons, sticky action bar, language switch, "Simulated demo" badge, sprout success.

### 7.4 Header call to action (settles A1 vs A3)

- **Everywhere:** a **"Where to buy"** pill plus a **Contact** button. Households are the widest audience.
- **On `/farm-software/`:** Contact becomes **"Book a demo"**.
- **On `/for-farmers/`:** Contact becomes **"WhatsApp us"**.
- **Floating WhatsApp button:** only on For Farmers, Contact and About. It is never sitewide, so the consumer and B2B pages stay clean.

### 7.5 Data files (A2 §3 is authoritative; A4 §5 for the plumbing)

- **`produce`:** A2's full schema (slug, status, names, taste, uses, stages[], freshness, nutrition with a cited source, storage and so on). User-facing strings use A4's `{ en, hi? }` shape.
- **`sellers`:**
  - **One record per branch** (Codex C2). Two branches of the same shop are two records, each with its own crops.
  - Type is `shop | marketplace`.
  - **Lifecycle:** `pending | active | suspended | retired`. Only `active` sellers are published. Suspending a seller removes it everywhere on the next deploy.
  - **Three separate facts, never merged** (Codex C2):
    1. The seller is **authorized**, with a date.
    2. A crop is **listed** at that branch, with a date per crop.
    3. Stock today, which **the site never claims**. It says "Check stock with the seller" and "Listing checked {date}". No "in stock" labels. *(This replaces A2's `in-stock` status.)*
  - An authorized seller whose crops aren't confirmed yet appears in the general directory with "Check produce with the seller", but on no crop page.
  - **Marketplaces:** coverage is explicit (by city, wider verified scope, or a postcode check). A marketplace is never labelled "national" without the seller's evidence.
  - Coordinates (lat/lng) are optional.
  - **Private evidence** (agreements, internal contacts) stays out of the public data files.
  - The build fails on an unknown produce slug, a duplicate ID or a broken link.
- **Other data files:** `cities` (slug, name, state, lat/lng) and `site` (phone, WhatsApp number, message templates, inboxes, form endpoint).
- **Editing:**
  - **Pages CMS**, a GitHub-login form UI with no server needed. To be verified before committing to it.
  - Fallback: editing the YAML in GitHub's web editor.

### 7.6 Forms (A3 §4; A4 §6; settles their differences)

- **Two forms at launch:**
  - **Software demo:** name, company, work email, optional phone, farm type, optional message.
  - **Farmer services:** name, mobile, village/district, optional need chips, optional call time and language. **No email field.**
- **Both forms:** plain HTML forms that post without JS. A honeypot. A time trap.
- **Turnstile on the demo form only.** A challenge that fails on an old Android browser would lose the farmers who matter most.
- **Service: decided by a proof, not by reading a comparison.**
  - A4 picked **Web3Forms**. Codex C4 shortlisted **Formspree**, citing its documentation, including that over-quota enquiries can be stored without being emailed.
  - In Phase 0, wire **both forms to two test inboxes** with each candidate. Test a plain no-JS POST and the enhanced (fetch) version.
  - Keep whichever meets A3's list: two inboxes or tagged subjects, a no-JS redirect, an auto-reply, a Sheet or webhook backup, and quota alerts.
- **Delivery states** (Codex C3): invalid, sending, accepted, rejected and **"couldn't confirm"** (a timeout).
  - On a timeout, keep the fields and say a resend may duplicate.
  - Offer WhatsApp and phone instead.
  - **No silent automatic retry.** *(This replaces A3's auto-retry after 3 seconds.)*
- **Personal data never goes into a URL, an analytics event or a WhatsApp prefill** (Codex C3/C4).
  - WhatsApp prefills carry only page, crop and problem context.
  - *(A3's error-fallback prefill drops the name and village.)*
- **Privacy:** a privacy notice reviewed for India's DPDP Act.

---

## 8. Technical architecture, in brief (full detail: A4)

- **Rendering and scripts:**
  - Astro `output: 'static'`. All content is server-rendered HTML that works with JS off.
  - A tiny always-loaded core script (6KB or less).
  - GSAP loads only on Tiers 1–2, after first paint. Lenis loads on Tier 1 only.
  - Three.js loads on Tier 1 only, near the scene.
- **Build and deploy:**
  - The build moves to GitHub Actions: Node 22, `npm ci`, check, build, `test -f dist/CNAME`, then deploy.
  - A `ci.yml` on pull requests runs Lighthouse CI, Playwright smoke tests with axe, and a link check.
  - The current placeholder moves to `archive/`, and `dist/` becomes build output.
- **Search and sharing:**
  - Per-page meta and OG images generated at build time for every page and every vegetable.
  - Sitemap with hreflang.
  - Structured data: `Organization`, `Product` (no price), `LocalBusiness` per seller, `FAQPage` and `BreadcrumbList`.
- **Analytics:** Umami (cookieless). Events: enquiry started and submitted, WhatsApp and phone clicks, seller outbound clicks, door clicks, tier assigned, language switch. **No personal data.**
- **Accessibility:** WCAG 2.2 AA. Every 3D canvas is decorative and the same story is told in text. Scrolling stays native wherever Lenis is off. Contrast is checked in CI against the design tokens.

---

## 9. Phased delivery (each phase ends deployable; A4 §13, re-ordered)

| Phase | What ships | Effort | Waits on the owner for |
|---|---|---|---|
| 0. Foundation + proofs | Astro project, design tokens, CI, deploy workflow. The "coming soon" page stays live. **Exit only when** (Codex C4): the host is confirmed, the build is reproducible, and a test enquiry from each form has been received in each test inbox, both with and without JS. | M | Hosting decision (Q2) |
| 1. Skeleton | Every route with real structure and placeholder copy, data schemas, CMS, SEO basics, nav and footer. No motion yet. | M | Name (Q12) |
| 2. Contact live | Both forms, WhatsApp and phone, analytics, privacy page. **Earliest point it can replace the placeholder.** | M | Phone/WhatsApp, inboxes, response times (Q9) |
| 3. Motion layer | Tiers, Lenis, reveals, pinned chapters, "Till", reduced-motion paths | L | Creative direction (Q1) |
| 4. Signature moments | Home seed-to-field scene + sequences, Live Farm Console, Specimen Stage, Seed-to-Shelf, "भूमि" hero | L | Growing method (Q5), real days per crop, budget (Q3) |
| 5. Produce and sellers | Real vegetable pages, sellers, city pages, JSON-LD, OG images | M | Seller list with consent (Q6), photos or scans (Q11) |
| 6. Hindi | Human translation, Devanagari type, hreflang | M | Languages and translator (Q4) |
| 7. Launch hardening | Real low-end device pass, screen readers (TalkBack, VoiceOver), performance tuning, DNS cutover, Search Console. **Rollback rehearsal:** redeploy the last known-good build. **A real test enquiry lands in each production inbox** before sign-off (Codex C4). | M | DNS access |

---

## 10. Conflicts between the area plans, and the rulings

| # | Topic | Disagreement | Ruling |
|---|---|---|---|
| 1 | Where WebGL runs | A1: most modern phones. A4: Tier 1 only | Tier 1 only. Everyone else gets the same scene pre-rendered (§3.3, §7.1) |
| 2 | Three.js chunk | A1: ≤350KB gz. A4: ≤190KB | ≤250KB gz for Three.js plus scene code. Procedural geometry, no post-processing stack |
| 3 | Produce page theme | A1: daylight. A2: dark specimens | Dark for Produce and vegetable pages; daylight for Where to Buy (§4) |
| 4 | Farmer page theme | A3: daylight. Brand is dark | Daylight. A1's palette already has the cream surface |
| 5 | Header CTA | A1: "Where to buy" + Contact. A3: "Book a demo" sitewide | Context-aware header (§7.4) |
| 6 | Floating WhatsApp | A4: sitewide. A3: three pages only | Three pages only (§7.4) |
| 7 | Fonts | A1: three Latin families. A4: two max | Three allowed, 100KB in total, mono subset (§7.2) |
| 8 | Turnstile | A4: all forms. A3: not on the farmer form | Demo form only (§7.6) |
| 9 | Seller schema | A2: `type: shop/marketplace`, `stocks[]`. A4: `shop/marketplace/online`, `produce[]` | A2's schema, with A4's reference validation (§7.5) |
| 10 | Number of forms | A4: three (including general). A3: two plus wrong-door links | Two at launch. "Become a seller" waits on the owner (Q10) |
| 11 | Homepage JS | A1: ≤90KB. A4: ≤110KB | 110KB hard limit, aim for 90 |
| 12 | Smooth scroll | A1/A4: Lenis on Tier 1. Codex C1/C4: native scroll only at launch, to protect anchors, keyboard and testing | **Lenis on Tier 1 only, behind one switch.** If it breaks anchor jumps, keyboard scrolling or find-in-page on any test device, it's switched off. That costs a config change, not a redesign |
| 13 | When the 3D loads | A1/A4: automatically on Tier 1. Codex C4: only after the visitor taps to activate it | **Automatic on Tier 1.** The "insane" bar needs the opening moment to happen by itself. The 33ms frame rule and the live downgrade (§7.1–7.2) are the safety net |
| 14 | Seller stock status | A2: `in-stock / usually / seasonal`. Codex C2: never claim stock | Codex. "Listing checked {date}" and "Check stock with the seller" (§7.5) |
| 15 | Form service | A4: Web3Forms. Codex C4: Formspree | Decided by the Phase 0 proof (§7.6) |
| 16 | Analytics | A4: Umami (free). Codex C4: Plausible (paid) | Umami. Same events and privacy rules, no cost |
| 17 | Fonts | A1: GT Alpina/Fraunces + Geist + Geist Mono. Codex C1: Bricolage Grotesque + Source Sans 3 | A1's set goes with "Soil, Annotated". Codex's pair belongs to the "One lettuce" direction if the owner picks it |
| 18 | Software demo depth | A3: numeric live console with event buttons. Codex C3: a finite 4-step decision story with qualitative states | A3's console, **with Codex's guards**: control mode matches the real product, the scenario is owner-approved, and a static transcript sits in the HTML |

---

## 11. What we need from Bhoomi Tech (merged and de-duplicated)

**Needed to start (Phases 0–2)**
- [ ] Hosting decision: move DNS to Cloudflare, or stay on GitHub Pages
- [ ] Name in running text: **"Bhoomi Tech" or "Bhoomitech"**
- [ ] WhatsApp number (Business?), phone and hours, inbox(es) for demo and farmer enquiries, response-time promise, business address
- [ ] Who edits the produce and seller lists (do they have a GitHub login?)
- [ ] **Named owners** (Codex C2), who can be the same person:
  - a **produce editor**
  - a **sales approver**, who authorizes sellers, rechecks them on a set schedule, and can take one down quickly
  - **who answers households** who can't find a seller
- [ ] Privacy notice text, or approval to adapt a template with your advisor

**Needed for the look (Phases 3–4)**
- [ ] Creative direction pick (Q1)
- [ ] **How the produce is grown** (open field, polyhouse, hydroponic or vertical)
- [ ] Real seed-to-harvest and harvest-to-shelf days per crop
- [ ] Photos or video, or a decision on a 2-day shoot; permission to 3D-scan real produce
- [ ] Logo source files; a font licence decision (GT Alpina or free Fraunces)
- [ ] What the software actually does today, and whether it runs on your own farm. Screenshots if they exist.

**Needed for content (Phases 5–6)**
- [ ] Country, states and cities; the first sellers with **written consent to be listed**, addresses, and what each stocks
- [ ] Marketplace links, and what "marketplace services" means for you
- [ ] Farmer services list, pricing approach, and areas served
- [ ] Approved claims list (organic, residue-free and so on, only with evidence)
- [ ] Languages, plus a human translator who knows farming words
- [ ] Founding story, team, values, and any publishable numbers or partners (sections stay hidden without them)

---

## 12. Questions for Rohit

### Decided on 26 Nov

1. **Creative direction:** "Soil, Annotated" with the lettuce spine.
2. **Hosting:** Cloudflare Pages. DNS access for bhoomitech.in is needed in Phase 0.
3. **Visual production:** full. A 2-day photo shoot plus 3D scans of the real lettuce, kale and cucumber, which unlocks the full Tier 1 and Tier 2 experience. *Still open:* a budget figure and any hard launch date.
4. **Languages:** English first, Hindi later. The For Farmers language switch stays hidden until the Hindi copy and a Hindi-speaking responder are ready.

### Answer when you can (the build works around placeholders until then)

5. **How is the produce grown, and is your AI software used on your own crops?** The first answer changes the homepage 3D model (soil core vs hydroponic grow cube). The second decides whether the story can say "this lettuce was grown by our AI", or only "we also build farm AI".
6. **Where do you operate, and who are the first authorized sellers?**
   - Cities, roughly how many shops and marketplaces at launch, and which crops each carries.
   - What does "authorized" mean: a written agreement, a supply relationship?
   - Have the sellers agreed to be listed?
7. **The software:**
   - Does it act on its own, or suggest and wait for a person?
   - Is it in use anywhere today (your farm, a pilot, a customer), and may we say so?
   - May we show a redacted screenshot?
   - Are there real thresholds for the demo scenario?
8. **Farmer services:** which services exist today, in which districts, and are prices shown or "call us"? These become the service cards, the "Tap what you need" tiles and the WhatsApp messages.
9. **Who answers WhatsApp, the phone and the forms, in which languages, during which hours, and how fast?** The site will promise exactly that.
10. **What does "marketplace services" mean?** You selling through marketplaces, or a service helping other farmers sell? Should the site invite shops to become authorized sellers?
11. **Do real photos or video exist?** Farm, produce, team, a seller's shop.
12. **Name:** the proposal is `bhoomitech.` for the wordmark and "Bhoomi Tech" in sentences. OK?

---

## 13. Codex's independent plans (Agent Hub thread #21)

Codex planned the same four areas **without seeing the Claude plans**. Its helpers:
- C1 (brand, Home, About) ran on gpt-6.2-astra.
- C2 (produce, sellers), C3 (software, farmers, contact) and C4 (tech) ran on gpt-6.2-sol.

Their files are copied into `docs/plan/codex/` (originals in `B:\bhoomi tech website\codex-planning-2026-11-26\agents\`). Codex's earlier solo drafts sit one folder up from the originals, as a separate input.

**How the two takes differ.**
- **Claude** aimed for spectacle: a cinematic WebGL hero, a playable farm console, a dark and lime design system, and a motion vocabulary.
- **Codex** aimed for restraint and proof:
  - native scroll
  - stills first
  - every journey working without JavaScript
  - strict separation of what is verified from what is illustrative
- **They agree** on the stack (Astro, static), a seller list before any map, two forms, WhatsApp first for farmers, honest placeholders, and Hindi-ready routes.

**Adopted from Codex** (credited inline above):

| Idea | Where it landed |
|---|---|
| One lettuce as the story's subject, from seed to plate | §3.1 recommendation, §6 Home |
| Three direct routes in the first screen, "Find a seller" primary | §6 Home |
| Static crop seller pages and city anchors that work with no JS | §5, §6 |
| Authorized, listed and in stock as three separate facts; one record per branch; seller lifecycle | §7.5 |
| Explicit marketplace coverage; never "national" without evidence | §7.5 |
| The console's control mode matches the real product; a static transcript | §6 Farm Software |
| A "couldn't confirm" form state; no silent retry | §7.6 |
| No personal data in URLs, analytics or WhatsApp prefills | §7.6 |
| Form delivery and hosting proven in Phase 0 | §7.6, §9 |
| Critical-JS and page-weight caps; the 33ms frame rule | §7.2 |
| Rollback rehearsal; a real test enquiry per production inbox | §9 |
| The GitHub Pages commercial-use question | §3.2, Q2 |
| "Bhoomi Tech" in sentences, `bhoomitech.` as the wordmark | §2 |
| Named produce editor and sales approver | §11 |

**Not adopted, and why** (rulings 12, 13 and 16–18 in §10):
- Native scroll only, and 3D only after a tap. Too restrained for the bar the owner set. The risk is handled by tiers, the frame rule and a single switch instead.
- Plausible, because it isn't free.
- Codex's font pair, which goes with its own direction.

Codex's own short summary (its direction, the idea it thinks Claude missed, its top questions) was requested in hub message #231. It will be added here if it changes anything.
