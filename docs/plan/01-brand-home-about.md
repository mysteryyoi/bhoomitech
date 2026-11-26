# 01 — Brand system, creative direction, motion language, Home + About

Owner: A1 · Status: plan v1, for the lead to consolidate · Date: 2026-11-26

Anything the owner hasn't confirmed is marked `[PLACEHOLDER: …]`. Draft copy is direction, not final text.

---

## 0. Decisions the owner needs to make (from this file)

1. **Creative direction:** "Soil, Annotated" (recommended), "Morning Market" or "Strata". See §3.
2. **How the produce is grown.** The hero's 3D model depends on the answer: a soil core or a hydroponic grow cube. See §12, Q1.
3. **Display font licence:** paid GT Alpina, or the free Fraunces fallback. See §4.3.

---

## 1. Purpose

This file sets the look, feel and motion that every page inherits, and it plans the two pages that tell the brand story:

- **Home** tells the whole seed-to-fork chain in about 90 seconds of scrolling, then sends each of the three audiences through its own door. Households should leave knowing **what we grow and where to buy it**, farm businesses knowing **the farm runs on our AI**, and farmers knowing **we can help on their land**.
- **About** is the slower, factual version for people who want to trust the company before they buy, enquire or partner: the story, the process step by step, the values and the people.

---

## 2. Reference research

I used web search and fetch. Fetch returns page text, not visuals, so the visual notes on Apple and Linear come from well-known patterns rather than a fresh look at those sites. These are references to borrow from, not to copy.

| # | Site | Why it's top-tier | What we borrow |
|---|---|---|---|
| 1 | **Igloo Inc.** (igloo.inc, Abeto × Bureaux; Awwwards Site of the Year 2024) | The whole page is one 3D camera move driven by scroll, with crisp HUD-like labels riding on the scene. | Scroll position equals camera position, with mono labels pinned to 3D anchor points. We use this **only for Home chapters 1–2** (one shared canvas), not the whole site. |
| 2 | **Pioneer "Corn Revolutionized"** (Resn; Awwwards Site of the Month, July 2020) | A seed-to-harvest scroll story. The plant's stems and roots grow by scaling the bones of a rigged, nearly flat model, with lighting baked into textures and the story looping back to seed. | The growth technique (grow a chain, don't morph a mesh), **baked lighting for phone performance**, and the **loop back to the seed** at the end. Our footer's dot is the seed again. |
| 3 | **Lando Norris** (landonorris.com, OFF+BRAND; listed on Awwwards as Site of the Year 2025) | A glTF helmet with swappable textures, plus a cursor-reactive mask that reveals a second layer over the hero image. | The **"survey lens"**: the cursor reveals the data view hidden under a photo (§9). Also its confidence with oversized type. |
| 4 | **Oishii** (oishii.com) | A premium indoor-farm produce brand that treats strawberries like luxury goods. | Each product gets a **name plus a one-line personal descriptor**, "Find us in store" is **permanent in the header**, and a "Not in your area?" prompt. We skip its e-commerce clutter: promo bar, cart and modals. |
| 5 | **Carbon Robotics** (carbonrobotics.com) | Agritech credibility through hard specs (camera count, firing interval) and engineers on video. | **Concrete numbers as typographic heroes** and real people explaining the tech. Our versions wait for real figures (`[PLACEHOLDER]`). |
| 6 | **Apple product pages** (AirPods / iPhone) | Pinned sections that scrub **pre-rendered image sequences** while the copy swaps in place. | The harvest chapter uses scrubbed turntable sequences instead of real-time 3D: cinematic, and far cheaper on a phone. |
| 7 | **Linear** (linear.app) | Dark UI, 1px hairlines, restrained glow, and product UI drawn as crafted fragments. | Show the farm software as **designed UI fragments** (an alert card, a moisture sparkline) rather than screenshots, which don't exist yet. |

---

## 3. Creative direction

### Recommended: "Soil, Annotated" (a refinement of "Precision meets soil")

"Precision meets soil" names the mood correctly, but a builder can't act on a mood. "Soil, Annotated" keeps its dark, cinematic, lime-signal mood and turns it into **three rules a builder can follow**:

1. **The annotation layer.** Every living thing on the site (a seed, a leaf, a crate, a plate) gets annotated by "the AI": hairline leader lines, anchor dots, corner brackets and mono labels with readings. The organic layer is warm and tactile; the annotation layer is crisp, fast and lime. Annotations speak plain language, for example "Soil is drying, water at 5:40", never "Hydro-optimisation index 0.82". That plain speech is what earns a farmer's trust.
2. **The ground line.** In the existing logo, the bar through the middle of the "B" splits the letter into an upper bowl and a lower bowl. We read that bar as a **horizon: above it things grow, below it things are measured**. The ground line, a 1px horizontal hairline, becomes the core graphic device: section dividers, the line headlines sit on, the line annotations anchor to. On About it becomes the shirorekha, the headline bar of "भूमि" (§7).
3. **The dawn arc.** Home runs from **night to daylight**. Seed and grow are in deep soil-black. Harvest warms toward marigold. At the market chapter a sunrise wipe floods the page with warm cream daylight. Plate and doors happen in daylight, and the footer returns to night with the seed waiting. Households land in an appetising, daylight world, while the technical chapters keep the cinematic dark.

**Feel on the homepage:** a dark, quiet opening. A single lime dot drops out of the wordmark into a hexagonal soil core and germinates as you scroll, with readings ticking beside it. It pulls back into a field the AI is scanning, then a sunrise, then a plate in daylight. It should feel calm, precise and alive, not like crypto: no neon gradients, no glassmorphism and no floating coins.

### Alternative B: "Morning Market"

- Light-first: warm cream, produce colour and editorial food photography. It feels like a premium grocer or a cookbook.
- Tech appears as neat botanical-plate diagrams (Latin-label style), never as dark dashboards.
- Serif-led, generous whitespace, cookbook tone.

*On the homepage:* it opens on a bright top-down crate of lettuce, kale and cucumber. Scrolling lifts one leaf into a botanical plate with its growth data, and the AI chapter is a calm diagram. It is appetising, but it **gives up the existing dark/lime brand equity**, weakens software credibility, and **depends on top-class photography that doesn't exist yet**.

### Alternative C: "Strata"

- The site is a vertical cross-section of the earth, built as an **isometric diorama** that grows the placeholder's hex sculpture into a miniature world of hex tiles.
- Home is a dig and a climb: down through soil layers (roots, sensors, water), then up the stem into light and out to market.
- Feels like a museum diorama or Monument Valley: playful and very memorable.

*On the homepage:* a tiny living hex-tile farm that you scroll through layer by layer, with sellers as little hex shops at the end. It is highly distinctive, but it **reads as a toy to farm-business buyers**, needs heavy custom 3D and illustration production, is the hardest on low-end phones, and the "down then up" scroll is disorienting.

### Recommendation

Go with **"Soil, Annotated."** It keeps the brand cues the owner already has. One system serves all three audiences: beauty for households, precision for businesses, plain-language readings for farmers. The heavy WebGL is confined to two chapters with clean fallbacks. It **works before photography exists**, because the 3D and the annotation layer carry the site, and it gets better once real photos arrive. Through the dawn arc it also takes the best part of "Morning Market", the appetising daylight, for the consumer end of the journey.

---

## 4. Brand system

### 4.1 Evolving the placeholder (nothing is thrown away)

| Placeholder cue | New role |
|---|---|
| Near-black green `#101610` + lime `#b8ed79` | Night palette and the "alive" signal colour (§4.2) |
| Isometric stacked-hexagon sculpture | Becomes the **hexagonal soil core** in the hero, then the hex cells of the field |
| Rotated orbital ellipses | Sensor ranges and scan rings in chapter 2 |
| `+` marks | Registration and crosshair marks in the annotation layer |
| "— IDEAS IN THE MAKING" caption with a leading line | The mono caption style: 38px rule, then a label |
| Lime eyebrow (12px, wide tracking) | Mono chapter labels ("02 / GROW") |
| Bottom strip with ✳ | Scroll-velocity marquee; ✳ is redrawn as a custom 8-point "seedburst" glyph |
| `bhoomitech.` with a lime dot | The dot **is the seed**: the brand's recurring motif (§4.4) |
| Calm, short lines | Kept as the voice (§4.8) |

### 4.2 Palette

| Token | Hex | Role |
|---|---|---|
| `soil-950` | `#0B100B` | Deepest night: hero, footer, behind WebGL |
| `soil-900` | `#101610` | Primary dark background (existing) |
| `soil-800` | `#172218` | Raised dark surfaces and cards |
| `soil-700` | `#202B1B` | Chips, inputs, pressed states (existing) |
| `line-700` | `#30382E` | Hairlines on dark (existing) |
| `line-600` | `#495143` | Pill and button outlines (existing) |
| `moss-600` | `#294A20` | Deep fills, data areas, text selection |
| `leaf-500` | `#629E36` | Secondary green: icons and graphics on light, chart series |
| `lime-400` | `#B8ED79` | **Signal**: alive, AI, primary CTA, focus ring. Max ~5% of any viewport |
| `lime-200` | `#E2FFB0` | Highlights, hover tint, 3D specular |
| `ink-50` | `#F3F5EB` | Text on dark |
| `ink-400` | `#A1AAA0` | Secondary text on dark (≈7.7:1 on soil-900) |
| `husk-100` | `#F2EEE3` | **Daylight** background: Home chapters 4–5 and the doors, Produce and Where to Buy pages |
| `husk-200` | `#E6E0D0` | Cards and dividers on daylight |
| `ink-700` | `#4A5446` | Secondary text on daylight (≈6.8:1) |
| `fern-700` | `#3A6B22` | Links and accent text on daylight (≈5.5:1) |
| `sun-400` | `#F2B544` | Marigold: harvest and sun moments, "harvest window" data. Never text on light |
| `water-400` | `#7CC8D8` | Moisture and irrigation data only |
| `clay-500` | `#D1683A` | Alerts in data UI only |
| `loam-800` / `loam-600` | `#2B2219` / `#4A3A2A` | Soil strata inside 3D and illustration only, never UI |

**Rules:**
- Lime is never text on cream (≈1.2:1). On daylight, the primary button is **soil-900 with a lime label** (≈13.5:1).
- Data colours (water, sun, clay) appear only inside the annotation layer and the software UI.
- Every dark section gets a 2–3% static film-grain tile: one 128px PNG, CSS only.

### 4.3 Typography

A three-voice system: **serif = life, sans = clarity, mono = the machine.** A sans-only dark site risks looking like crypto; a serif display reads as food, craft and trust.

| Role | Font | Licence | Usage |
|---|---|---|---|
| Display (Latin) | **GT Alpina** (Grilli Type), Light/Regular + Italic | **Paid**: web licence by pageviews, `[PLACEHOLDER: quote]` | Headlines, sentence case, at most **one italic word** per headline (the organic noun: "a *seed*") |
| Display fallback (free) | **Fraunces** (variable: opsz, wght, SOFT) | Free (OFL, Google Fonts) | Same role if no licence; set opsz 144, SOFT 0, wght 300–400 |
| Text / UI | **Geist** (variable) | Free (OFL) | Body, nav, buttons, forms; tabular figures for counters |
| Mono / annotation | **Geist Mono** | Free (OFL) | Labels, readings, chapter indexes; uppercase, +0.1em tracking, 11–13px |
| Devanagari display | **Eczar** (Rosetta) | Free (OFL) | Hindi headlines and the About "भूमि" artwork |
| Devanagari text | **Noto Sans Devanagari** | Free (OFL) | Hindi body. The Noto family also covers Marathi, Gujarati, Tamil, Telugu, Kannada and others if a regional language is added |

**Fluid scale.** Display XL is `clamp(56px, 11vw, 200px)` with line height 0.95 and tracking −0.03em. Display L is `clamp(44px, 7vw, 120px)`. H2 is `clamp(36px, 4.6vw, 72px)`. H3 is `clamp(24px, 2.4vw, 36px)`. Body L is 20px, body is 17px with line height 1.6 (the existing intro size), small is 14px, and mono is 11–13px. Self-host everything, subset Latin and Devanagari separately, and preload only display Regular and Geist Regular (A4 owns the loading).

### 4.4 Logo and wordmark

- **Mark:** keep the geometric "B". Redraw it on a 32×36 grid with a constant 5-unit stroke, then **convert to filled outlines** (today it's a stroke, which renders unevenly at small sizes). The crossbar is the ground line: never remove it, and never colour it differently from the rest of the mark.
- **Wordmark:** `bhoomitech.` (Manrope 750 today). Freeze it as an outlined SVG so it never depends on a webfont, and optically tighten the "oo" pair. The **dot is a perfect circle sitting on the baseline**: lime on dark, `leaf-500` on cream.
- **Lockups:** horizontal (mark + wordmark), wordmark only, mark only (favicon, app icon). A Devanagari lockup `भूमि टेक` only if the owner approves (`[PLACEHOLDER]`).
- **Clear space:** the B's counter height on every side. **Minimum sizes:** mark 20px, wordmark 96px wide.
- **The dot as motif:** the seed in the hero, the active-page marker in the nav, the cursor, the journey-rail traveller and the footer's breathing seed. Never use it for anything else, and never use a second accent dot colour.
- **Don't:** apply gradients to the mark, outline it, rotate it, or place it on photos without a soil scrim.
- **Favicon:** keep the existing B on a soil rounded square. Add a 180px apple-touch icon and a maskable PWA icon.
- **Name in running text:** the brief says "Bhoomi Tech" but the placeholder says "Bhoomitech". This needs a decision (§12, Q4).

### 4.5 Iconography

- **UI icons:** **Phosphor Icons "Light"** (free, MIT), on a 24px grid with a 1.5px stroke and round caps. Phosphor includes WhatsApp, phone, map pin and the arrows we need.
- **Chapter glyphs** (custom, about 12): seed, sprout, sensor, drop, sun, crate, route, storefront, plate, chip, hand, leaf. Same 1.5px spec, drawn from circles and straight lines only, so they belong with the annotation layer.
- **Annotation primitives** (SVG components, not icons): anchor dot (6px, with a pulsing 14px ring), leader line, 12px corner brackets, crosshair, dashed bounding box, tick ruler, and a scan bar.

### 4.6 Image style

1. **Photography is the destination.** Commission a 2-day shoot, `[PLACEHOLDER: budget/approval]`:
   - Produce still lifes on soil-black, side-lit, chiaroscuro (in the spirit of a Dutch still life).
   - The farm at golden hour and macro leaves.
   - Hands working, and a real seller's shop in daylight.
   - Team portraits in natural light.
   - Grade: lift the blacks into `#101610`, pull greens toward leaf/lime, keep highlights warm, add grain. No HDR, no stock smiles.
2. **Until photos exist, use 3D.**
   - Photogrammetry scans of **real Bhoomi produce**: a phone scan app plus Blender clean-up gives authentic models of the actual lettuce, kale and cucumber.
   - Render them as turntable sequences and stills on soil-black.
   - The hero soil core and seedling are procedural in Three.js.
3. **Never:** stock or AI-generated images posing as "our farm", "our team" or "our sellers". Licensed macro textures (soil grain, leaf veins) are fine as abstract backgrounds only.
4. **Illustration:** none in the cartoon sense. Only technical line diagrams in the annotation style, which double as interim visuals on About.
5. **Video:** silent 6–10s loops (misting, leaves moving) once the shoot exists. H.264 + AV1, poster first, never autoplayed on Save-Data.

### 4.7 Grid and spacing

- **Grid:** 12 columns from 1280px up, 8 on tablet and 4 on mobile.
  - Max width 1600px, as today.
  - Outer margin `clamp(20px, 5.4vw, 88px)`, keeping the placeholder's 5.4%.
  - Gutter 24px, 16px on mobile.
- **Spacing:** a 4px base. The scale is 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256.
- **Section padding:** `clamp(96px, 14vh, 192px)` top and bottom.
- **Visible "field grid":** certain sections show hairline column guides (line-700 at 40%) that draw in on reveal, as part of the annotation look.
- **Radii:**
  - Pills and buttons: 999px.
  - Data surfaces and cards: 4px.
  - Photos: 0 (sharp).

### 4.8 Voice

- Calm, confident and short, as the placeholder already is. Sentence case, no exclamation marks.
- Every tech line answers "so what?" for a plate or a farmer.
- Hindi copy is written natively, not machine-translated (`[PLACEHOLDER: translator/reviewer]`).

---

## 5. Motion language

### 5.1 Principles

1. **Growth, not bounce.** Things emerge from a point of origin. Lines draw from their anchor, images rise from the soil line. No elastic overshoot, except the single moment the seed lands.
2. **Measure, then move.** There are two tempos. **Machine tempo** (annotations, UI) is fast and crisp. **Nature tempo** (growth, images, camera) is slow and soft. The annotation always arrives first, a beat before the organic thing moves.
3. **Scroll is time.** In journey chapters, scroll scrubs days, and a `DAY 00 → DAY [N]` counter makes that literal.
4. **One hero per viewport.** Only one major thing moves at a time.
5. **Never block reading.** All copy exists in the HTML, readable with JS off, and no text waits more than 600ms.

### 5.2 Tokens

| Token | Value | Use |
|---|---|---|
| `--ease-machine` | `cubic-bezier(0.16, 1, 0.3, 1)` (out-expo) | Annotations, UI, text reveals |
| `--ease-nature` | `cubic-bezier(0.65, 0, 0.35, 1)` | Growth, image scale, camera |
| `--ease-out` | `cubic-bezier(0.25, 1, 0.5, 1)` | General entrances |
| `--ease-in` | `cubic-bezier(0.5, 0, 0.75, 0)` | Exits |
| scrub | linear, smoothed by Lenis (desktop) | Scroll-linked timelines |
| `--dur-instant` | 120ms | Colour and focus changes |
| `--dur-quick` | 240ms | Buttons, chips, menu items |
| `--dur-base` | 480ms | Body and line reveals |
| `--dur-slow` | 900ms | Headline and image reveals |
| `--dur-growth` | 1600ms | Unscrubbed organic loops |
| `--stagger-line` / `--stagger-item` | 70ms / 50ms | |

### 5.3 Reveal patterns (named so every agent reuses them)

- **R1 "Furrow"** (headlines): split by **lines**, not characters. Each line sits in an overflow mask and rises from 105% with a 2° tilt to 0, using 900ms `--ease-machine` and a 70ms stagger.
- **R2 "Soil wipe"** (images): `clip-path: inset(100% 0 0 0)` opens to `inset(0)`, rising from the ground line, while the inner image scales from 1.15 to 1.0 over 1100ms `--ease-nature`.
- **R3 "Survey"** (annotations):
  1. Corner brackets snap in from 0.6 scale.
  2. The leader line draws from its anchor dot (stroke-dashoffset, 400ms).
  3. The mono label scrambles through 0–9 and A–Z for 300ms, then settles. Only for labels under 24 characters.
  4. Values count up.
- **R4 "Sprout"** (grids and lists): items rise 24px and fade in with a 50ms stagger, **starting from the item nearest the viewport centre**, not the top left.
- **R5 "Counter"**: tabular figures tween from 0 over 1200ms `--ease-machine` at 70% viewport. The final number is in the HTML.
- **R6 "Strip"**: the marquee loops in 40s. Its speed is tied to scroll velocity (timeScale 1–4), and it reverses with scroll direction.

### 5.4 Page transition: "Till"

1. On internal navigation, a soil-950 panel with a 1px lime top edge sweeps up from the bottom over 450ms `--ease-nature`, like soil being turned.
2. The destination's mono label ("03 / FARM SOFTWARE") shows in the centre for 200ms.
3. The panel continues upward and off, and the new page's H1 runs R1.

The nav's **lime dot is a shared element** (`view-transition-name: brand-dot`): it glides from the old active link to the new one. Built on the native View Transitions API (Astro's `<ClientRouter />`, owned by A4). It is skipped for browsers without support, and becomes a 150ms crossfade under reduced motion. The whole transition stays at or under 900ms.

### 5.5 Cursor and hover (only on `pointer: fine`)

- **Cursor:** an 8px lime dot (the seed) plus a 36px hairline ring that trails at lerp 0.15. The native cursor is hidden except over text inputs.

  | Over | Ring behaviour | Label inside the ring |
  |---|---|---|
  | Links and cards | Grows to 56px | "Open", "View" or "Call" |
  | Annotated images | Becomes a crosshair, with live coordinates in mono (`x 412 · y 188`) | none |
  | 3D hero | Shows a "drag to turn" hint (±15° of orbit) | "Drag" |

  It is disabled under reduced motion and forced-colors, where the native cursor returns.
- **Primary buttons:**
  - Magnetic pull, up to 8px.
  - The label rolls: the current text slides up while a duplicate rises in its place.
  - The lime fill grows as a circle from the cursor's entry point (clip-path circle, 240ms).
- **Text links:** the underline draws left to right in, and exits to the right.
- **Cards and doors:** the image scales to 1.04, the corner brackets tighten 8px toward the content, and the arrow rotates from −45° to 0.
- **Touch:** nothing is hover-only. `:active` scales to 0.98.

### 5.6 Device tiers and reduced motion (A4 implements detection; behaviours are defined here)

| Tier | When | What runs |
|---|---|---|
| **Full** | `pointer: fine` with a capable GPU | WebGL at DPR up to 1.75, 37 hex cells, grain pass, Lenis, cursor |
| **Standard** | Modern phones with WebGL2 and `deviceMemory ≥ 4` | WebGL at DPR up to 1.25, 19 cells, no post-processing, native scroll, no cursor |
| **Lite** | Save-Data, 2g/3g, `deviceMemory < 4`, no WebGL2, **or an FPS watchdog** (average frame over 28ms in the first 60 frames downgrades live) | No WebGL. AVIF stills that crossfade at scroll steps; CSS/SVG annotations |
| **Reduced motion** (overrides all) | `prefers-reduced-motion: reduce` | See below |

Under **reduced motion**: no WebGL init, no scrubbing, no pinning beyond 100vh, no parallax, no marquee, no scramble and no cursor. Every chapter shows its **composed end state** as a still with annotations already drawn. Counters show their final values. Reveals become 200ms opacity fades. Page transitions become a 150ms crossfade.

---

## 6. Home page: chapter by chapter

**Persistent on Home:**
- **Journey rail**, desktop only: a fixed left hairline with 5 nodes, `SEED · GROW · HARVEST · MARKET · PLATE`. The lime dot travels down it with scroll, and clicking a node jumps to that chapter. On mobile it becomes a 2px top progress bar with the chapter name.
- **Day counter**, top right in mono: `DAY 00` up to `DAY [PLACEHOLDER: real seed-to-harvest days per crop]`. Illustrative, and labelled as such.
- **"Skip the story →"** link in the hero, jumping to the doors. Farm-business visitors and keyboard users shouldn't have to sit through 15 viewports.

### Ch 1 — SEED (hero; pinned ~300vh desktop / 200vh mobile)

- **On screen:**
  - Left: H1 in display serif, *"Every plate starts as a seed."*
  - Lede: "Bhoomi Tech grows fresh vegetables and builds the AI that runs the farm, from seed to fork."
  - Three small door links: Where to buy · Farm software · For farmers.
  - Bottom: "SCROLL TO GROW ↓".
  - Right and centre: a WebGL hexagonal **soil core** with a seed in it.
- **Intro:** non-blocking, about 900ms after the canvas is ready. The **lime dot detaches from the nav wordmark**, falls along a gentle arc, and lands on the core's top face with a tiny soil puff. This is the one permitted overshoot (`back.out(1.4)`). The H1 is painted immediately and is the LCP element; the canvas fades in over a poster still.
- **The 3D scene, concretely:**
  - **Core:** a hexagonal prism (the placeholder sculpture, made real) split into **3 strata slabs** with 4px gaps: topsoil, loam and substrate. It uses a custom shader with triplanar FBM noise grain, colours `loam-800` to `loam-600`, a darkened moisture band and a lime fresnel rim at 0.35.
  - **Seed:** a small smooth mesh.
  - **Seedling** (procedural, so there's no heavy rigged glTF):
    - The root is a `TubeGeometry` along a CatmullRom curve that reveals by `setDrawRange`.
    - The stem is the same technique, growing upward.
    - Cotyledons and true leaves are bent planes with an `uUnfurl` (0→1) vertex-shader uniform that curls them open.
  - **Optional:** if a modeller supplies a rigged seedling, swap to Pioneer-style bone scaling.
- **Scroll mapping (0 to 1):**

  | Progress | What happens | Annotation (R3) |
  |---|---|---|
  | 0–0.15 | The seed "breathes" (scale 1→1.03 loop) | `DAY 01 · GERMINATION` |
  | 0.15–0.45 | The root grows down through the strata while the camera dollies down the cut face | `ROOT DEPTH [PLACEHOLDER] cm` and `SOIL MOISTURE [PLACEHOLDER]%` tick up |
  | 0.45–0.75 | The shoot breaks the top face (20 soil particles lift and fall), the cotyledons open and the camera rises | |
  | 0.75–1.0 | True leaves unfurl. The camera pulls back and rotates 30°, revealing that the core is **one cell in a hex field** (an `InstancedMesh`: 37 cells on Full, 19 on Standard) whose rings light up from the centre outward | |
- **Handoff:** the camera tilts to near top-down over the field, and chapter 2's copy slides in. It is the same canvas, with no cut.
- **Fallbacks:**
  - **Lite:** 3 pre-rendered AVIF stills (seed, sprout, field; about 60KB each), crossfaded at scroll thirds, with SVG annotations drawn by CSS.
  - **Reduced motion:** the sprout still only, with annotations shown.
- **Budget:** the scene chunk is about 350KB gz or less (three.js tree-shaken plus scene code). It loads after LCP, on idle, and only on the Full and Standard tiers.

### Ch 2 — GROW: the AI-run farm (pinned ~250vh)

- **On screen:**
  - Left: H2 *"A farm that watches itself."*
  - Lede: "Sensors read the soil. Cameras read the leaves. Our software decides what each plant needs next." `[PLACEHOLDER: confirm the real sensing stack]`
  - A "Farm software →" link.
  - Right: the top-down hex field.
- **Animation:**
  - A **lime scan bar** sweeps across the field.
  - Cells it passes recolour to a moisture heatmap (`water-400` → lime).
  - The placeholder's orbital ellipses return as **sensor range rings** around three cells.
- **Three scroll-stepped decisions,** each an R3 callout pinned to its cell (illustrative; A3 and the owner replace them with real features):
  1. `C-14 · DRYING` → "Irrigation scheduled, 05:40" (water)
  2. `B-07 · LEAF COLOUR SHIFT` → "Nutrient dose adjusted" (lime)
  3. `FIELD · HARVEST WINDOW` → "Ready in [PLACEHOLDER] days" (sun)

  Each step also shows a small Linear-style **UI fragment card** (an alert row plus a sparkline) sliding in from the right edge.
- **Handoff:** the scan completes, the whole field ripples lime ("ready"), and the camera dives into one cell. The canvas fades out, its render loop pauses and stays ready for back-scroll, and the harvest sequence fades in.
- **Lite:** an SVG hex map with CSS fill transitions, with the same three callouts as static cards.

### Ch 3 — HARVEST (pinned ~240vh: 80vh per vegetable)

- **On screen:**
  - Left: a giant serif list, *Lettuce. Kale. Cucumber.* The active name is ink-50 and the others sit at 25% opacity.
  - Right: a **turntable image sequence** of the current vegetable. Scroll scrubs it through 180°.
  - Mono specs per item: `HARVEST WINDOW [PLACEHOLDER] · FARM TO SHELF [PLACEHOLDER]`.
  - Link: "See all produce →".
- **Dawn arc begins:** the background moves from soil-900 to `#1E1C12`, and a marigold radial glow rises in the bottom right as the sun comes up. The day counter reaches the harvest day.
- **Data:** names and order come from A2's produce data file, so adding a vegetable adds a step, capped at 5 on Home.
- **Asset budget:**
  - Full: 48 frames per vegetable at 960px (about 18KB AVIF each), loaded every 4th frame first, then filled in.
  - Standard: 24 frames at 640px.
  - Lite: 1 still each.
- **Copy direction:** let the produce speak. One line only, `[PLACEHOLDER: confirm any freshness claim]`.
- **Handoff:** see signature moment S2, the sunrise wipe.

### Ch 4 — MARKET (daylight; pinned horizontal ~250vh on desktop, native swipe on mobile)

- **On screen:**
  - H2 *"Not online. Just around the corner."*
  - Lede: "We don't sell on this website. Our vegetables go to authorized shops and marketplaces near you."
  - A **route line** (dashed fern-700) runs `farm ● → hub ● → seller ● ● ●` and draws via stroke-dashoffset as the horizontal track moves.
  - **Seller cards** sit on the track: logo or initial, name, type (shop or marketplace), area and a "Find it at" chip. They come from A2's sellers file; the top 6 are flagged `featured`.
  - The track ends with an "All sellers & areas →" card linking to Where to Buy.
  - The map is an **abstract dot-grid**, not real geography, until the cities are confirmed (`[PLACEHOLDER: city/area]`).
- **Mobile:** no scroll-jacking. Use a scroll-snap swipe row with a progress hairline beneath it.
- **Handoff:** the track ends, vertical scroll resumes, and the route line continues downward into chapter 5's plate.

### Ch 5 — YOUR PLATE (daylight, ~150vh, lightly pinned)

- **On screen:** a top-down plate (photo once the shoot exists; interim, a render composed from the scanned produce) rotates 0→25° with scroll.
- **Annotation layer flips to ink:** fern leader lines label each ingredient with its own journey, e.g. `KALE · SEEDED DAY 01 · ON YOUR PLATE DAY [PLACEHOLDER]`.
- **Copy:** H2 in Display XL, *"Seed to fork."* Lede: "Every step between, looked after by us."
- **"What we do" index:** four rows, one per offering:
  - Seed-to-fork services → About
  - Marketplace services → `[PLACEHOLDER: depends on Q5]`
  - AI solutions → Farm Software
  - Modern farming solutions → For Farmers

  Each row is an index number, a serif name, a one-liner and an arrow. On hover, the row's hairline draws in lime-on-ink and a 240×300 visual follows the cursor (lerp 0.12, R2 reveal). On mobile, each row shows an inline thumbnail.
- **Numbers band** (conditional): it renders only when the owner supplies real stats, using R5 counters. With no data it is not rendered at all.

### The three doors (daylight, ~100vh)

- **Header:** "Where do you come in?"
- **Desktop:** three tall portrait panels in a row, each framed with a hairline and corner brackets.

  | Panel | Mono label | Title | Visual | CTA |
  |---|---|---|---|---|
  | 01 | HOUSEHOLDS | "I'm buying vegetables" | Lettuce still | "Find where to buy" → Where to Buy, plus "See our produce" |
  | 02 | FARM BUSINESSES | "I run a farm business" | UI fragment | "Book a demo" → Farm Software |
  | 03 | FARMERS | "I'm a farmer" (+ "किसानों के लिए" if Hindi is confirmed) | Hands in soil | "Talk to us" → For Farmers, plus a WhatsApp chip |

- **Interaction:** hovering or focusing a door grows it to 50% width while the other two compress to 25% (flex-grow, 600ms `--ease-nature`). Its image slides 8% to reveal more ("the door opens"), and a second paragraph and secondary links fade in.
- **Mobile:** three stacked cards with the visual on the left, all content visible, no hover needed.

### Footer (night again, closing the loop)

1. A big CTA band: *"Grow with us."* with the three door links plus WhatsApp and phone.
2. Columns: Explore · For business · For farmers · Contact (WhatsApp, phone, email, address, all `[PLACEHOLDER]`) · Social `[PLACEHOLDER]` · Legal.
3. A **giant wordmark** `bhoomitech.` across the full width, cropped 20% by the page bottom. Its dot breathes (scale 1→1.15, 2.4s) as the seed waiting to be planted again, the Pioneer loop-back.

### Home wireframe (desktop 1440)

```
+--------------------------------------------------------------------------------+
| [B] bhoomitech.   Produce  Where to buy  Farm software  For farmers  About      |
|                                              EN | HI   (Where to buy) [Contact]  |
+--------------------------------------------------------------------------------+
|o 01 / SEED                                                          DAY 00     |
|o                                               ___                             |
|o  Every plate                                /     \    +-- DAY 01 . GERMINATION|
|o  starts as                                 | hex   |                          |
|o  a *seed*.            (serif ~160px)       | soil .|   +-- MOISTURE [PH] %    |
|                                              \ core /                          |
|  We grow fresh vegetables and build            ---       <- WebGL canvas       |
|  the AI that runs the farm.                                                    |
|  Where to buy . Farm software . For farmers         Skip the story ->          |
|                                                       SCROLL TO GROW  v        |
+---------------------------------- pinned 300vh ---------------------------------+
| 02 / GROW                                                         DAY 14       |
|  A farm that              [ top-down hex field, 37 cells ]    +--------------+ |
|  watches itself.          ===== lime scan bar sweeps =====>   | ALERT C-14   | |
|  Sensors read the soil..      ( ) sensor rings  [C-14]--      | ~~sparkline~~| |
|  Farm software ->             step  o o o                     +--------------+ |
+---------------------------------- pinned 250vh ---------------------------------+
| 03 / HARVEST                                                      DAY [PH]     |
|  LETTUCE.            [ turntable sequence, 180deg on scroll ]                  |
|  kale.               HARVEST WINDOW [PH] . FARM TO SHELF [PH]                  |
|  cucumber.                                              (marigold glow) *      |
|  See all produce ->                                   <- sunrise wipe starts * |
+============================= DAYLIGHT (husk-100) ===============================+
| 04 / MARKET     Not online. Just around the corner.                            |
|  farm o - - - - o hub - - - - o - - - - o - - - - o - - ->  (route draws)      |
|   [Seller][Seller][Seller][Seller][Seller][Seller] [All sellers & areas ->]    |
|            <------ horizontal track, pinned 250vh ------>                      |
+--------------------------------------------------------------------------------+
| 05 / PLATE              ( top-down plate, rotates )   KALE . SEEDED DAY 01 --+ |
|  Seed to fork.                                        CUCUMBER . ...       --+ |
|  ---------------------------------------------------------------------------   |
|  01  Seed-to-fork services        one line ...                         ->      |
|  02  Marketplace services         one line ...                         ->      |
|  03  AI solutions                 one line ...                         ->      |
|  04  Modern farming solutions     one line ...                         ->      |
|  [ numbers band - only if real stats exist ]                                   |
+--------------------------------------------------------------------------------+
|  Where do you come in?                                                         |
|  +-----------------+ +----------------------------+ +-----------------+        |
|  | 01 HOUSEHOLDS   | | 02 FARM BUSINESSES (hover) | | 03 FARMERS      |        |
|  | I'm buying      | | I run a farm business      | | I'm a farmer    |        |
|  | vegetables      | | [UI fragment] ...          | |                 |        |
|  | Find where ->   | | Book a demo ->             | | Talk to us ->   |        |
|  +-----------------+ +----------------------------+ +-----------------+        |
+============================== NIGHT (soil-950) =================================+
|  Grow with us.            [Where to buy] [Book a demo] [Talk to us] (WA) (Ph)  |
|  Explore | Business | Farmers | Contact | Social | Legal                       |
|  b h o o m i t e c h .   <- giant, cropped by page bottom; dot breathes        |
+--------------------------------------------------------------------------------+
 o = journey rail, fixed left (desktop)
```

**Mobile:**
- The hero canvas fills the top 55% with the text below it; pinning is about 200vh.
- Only one annotation is visible at a time.
- Ch 2 callouts stack under the field.
- Ch 3 uses 24-frame sequences.
- Ch 4 is a native swipe row.
- The offerings index shows thumbnails inline.
- The doors stack.
- The journey rail becomes a 2px top progress bar.
- The nav is the wordmark, a "Where to buy" icon and the menu.

---

## 7. About page

| # | Section | Content and behaviour |
|---|---|---|
| A1 | **Hero: "The ground line"** (signature S3) | A huge **"भूमि"** with H1 *"Bhoomi means earth."* Lede: `[PLACEHOLDER: one-paragraph why-we-exist]`. "Bhoomi" means earth or land, which is a language fact. Whether the founders named the company for that reason is `[PLACEHOLDER: confirm]`. |
| A2 | **Our story** | Editorial split: a sticky mono "OUR STORY" label on the left, serif body on the right, with one large pull quote (R1). Founding year, founders and origin are all `[PLACEHOLDER]`. A milestone timeline (horizontal, drag-scroll) renders only if real milestones exist. |
| A3 | **Seed to fork, step by step** | A sticky stepper. On the left, 7 steps: Choosing the seed → Growing `[method PLACEHOLDER]` → Watching (AI) → Harvest → Packing `[PLACEHOLDER: cold chain?]` → To the seller → Your plate. On the right, a visual stage that changes per step: annotated line diagrams now, photos later. Each step has a "Where the AI helps" chip. This is the factual twin of the Home journey. On mobile it is unpinned, with each step's visual inline. |
| A4 | **How we grow** | Built in variants depending on Q1 (soil, polyhouse or hydroponic). Includes a **survey lens** photo (§9): the cursor reveals the data view underneath. On touch, a "Show data view" toggle. |
| A5 | **What we believe** | Four values as a 2×2 grid of serif-word tiles with corner brackets and a mono definition under each (R3 on reveal). **Drafts for the owner to replace:** "Measure, don't guess." · "Respect the soil." · "Farmers are partners." · "Tell the truth about food." |
| A6 | **The people** | A team grid: 4:5 portraits in soil/lime duotone that turn full colour on hover, each with a name, role and a one-line "field note". **Until real photos exist, show no fake faces:** a single honest block ("A team of growers and engineers, `[PLACEHOLDER: size/composition]`") with mono role tags. |
| A7 | **Numbers, partners, certifications** | Conditional: rendered only with real data. |
| A8 | **Closing** | *"Grow with us."* plus a compact three-door row (the shared component). |

### About wireframe (desktop)

```
+--------------------------------------------------------------------------------+
| nav                                                                            |
+--------------------------------------------------------------------------------+
|                 ,~~ tendril grows from the i-matra, leaf unfolds               |
|  ===========  B H O O M I  (Devanagari, ~40vw)  ===============  <- ground line |
|               letter bodies fill with soil from below                          |
|  Bhoomi means earth.                    SHIROREKHA . THE LINE LETTERS HANG FROM|
|  [PH: why we exist]                                                            |
+--------------------------------------------------------------------------------+
| OUR STORY  |  serif body ........................  "pull quote, large" ...      |
| (sticky)   |  [timeline - only if real milestones]                              |
+--------------------------------------------------------------------------------+
| 01 Choosing the seed  <-- active  |   [ annotated line diagram / photo ]       |
| 02 Growing [PH]                   |    +-- WHERE THE AI HELPS: ...             |
| 03 Watching                       |                                            |
| 04 Harvest  05 Packing  06 Seller |   (stage swaps per step, R2 + R3)          |
| 07 Your plate                     |                                            |
+--------------------------------------------------------------------------------+
| How we grow [variant per Q1]      [ survey-lens photo: cursor reveals data ]   |
+--------------------------------------------------------------------------------+
| [ Measure, don't guess. ] [ Respect the soil. ]                                |
| [ Farmers are partners. ] [ Tell the truth about food. ]                       |
+--------------------------------------------------------------------------------+
| The people [PH grid or honest block]  | numbers/partners (conditional)         |
+--------------------------------------------------------------------------------+
| Grow with us.  [door][door][door]                                     footer   |
+--------------------------------------------------------------------------------+
```

**Mobile:** "भूमि" sits at about 80vw, the stepper unpins into a vertical list with inline visuals, the values become a single column, and the survey lens becomes a toggle button.

---

## 8. Signature moments

**S1 — Seed to field (Home Ch 1→2).** The full spec is in §6 Ch 1–2.
- **What moves:** the dot falls from the wordmark, the root and shoot grow through the strata, leaves unfurl, the camera pulls back into a 37-cell field, and a scan bar sweeps it.
- **Trigger:** scroll progress across 550vh of pinned sections, using one fixed canvas.
- **Fallbacks:** Standard tier gets 19 cells, DPR 1.25 and no grain. Lite gets 3 AVIF stills crossfaded at scroll thirds, with SVG annotations. Reduced motion gets a single composed still with annotations, no pinning beyond 100vh and no WebGL init.

**S2 — Sunrise wipe (Home Ch 3→4).**
- **What moves:** as the last vegetable finishes turning, the marigold glow in the bottom right becomes a sun. Over 1.0 viewport of scroll, a **circular `clip-path` of husk-100 expands from the sun's centre** to cover the page (circle 0% to 150%, scrubbed). Behind it, the annotation colour tokens switch from lime-on-soil to fern-on-husk. The nav inverts to ink-on-cream at the same moment, and the day counter reads `MORNING`.
- **Cost:** pure CSS custom properties plus ScrollTrigger, no WebGL.
- **Reduced motion and Lite:** a hard cut at the section boundary, with a 200ms colour fade.

**S3 — The ground line (About hero).**
- **Artwork:** "भूमि" as outlined SVG from Eczar (OFL allows outlining). Its shirorekha, the headline bar every Devanagari letter hangs from, is **extended into a full-width 1px lime hairline**: the brand's ground line.
- **Scroll mapping:**

  | Progress | What happens |
  |---|---|
  | 0→0.5 | Below the line, the letter bodies **fill with a soil texture rising from the bottom** (an SVG mask rect translating up over a loam-noise image) |
  | 0.5→0.85 | Above the line, the i-matra's hook (ि, which already arches over the bar like a sprout) is **redrawn as a growing tendril** (stroke-dashoffset), and a small lime leaf scales open at its tip |
  | 0.85→1 | An R3 annotation draws in: `SHIROREKHA · THE LINE ALL LETTERS HANG FROM` |

- **Cost:** SVG/CSS only, so it runs on every tier.
- **Reduced motion:** the final state, static.

---

## 9. Shared components (for A2, A3 and A4 to reuse)

| Component | Spec summary |
|---|---|
| **Header / nav** | 88px, transparent over heroes. It hides on scroll down (translateY −100%, 400ms) and returns on scroll up with soil-900 at 80% plus a 12px backdrop blur (no blur on Lite). The active link is marked by the lime dot. "Where to buy" pill and "Contact" button are always visible, plus an EN/हिं slot. It inverts on daylight sections. |
| **Mobile menu** | A full-screen soil-950 panel. Serif links at 44px with an R1 stagger, the three doors as chips, WhatsApp and phone buttons, and the language toggle. Focus is trapped while it's open. |
| **Footer** | As described in §6: CTA band, columns, and the giant wordmark with a breathing dot. |
| **Section header** | A mono index ("02 / GROW") on a ground-line hairline, a serif H2 (R1), and an optional lede (max 60ch). |
| **Annotation kit** | `Callout` (anchor, leader, label, value), `Brackets`, `Crosshair`, `BBox`, `ScanBar`, `FieldGrid`. Dark and light themes. Positions come from props or from 3D projection. |
| **Survey lens** | A photo plus a pre-rendered "data view" image. A 220px circular mask follows the cursor (lerp 0.15) to reveal the data view with live labels. On touch it becomes a toggle. Suggested for Farm Software (A3). |
| **Stat counter** | A value in display serif with tabular figures, a unit and a **source footnote**. It never renders without a real value. |
| **"Find it at" chip** | A pill (999px) in soil-700 or husk-200 with a 1px line border, the seller's logo or initial in a 20px circle, the name, the area and an external-arrow icon. Hover runs the underline draw and the arrow rotation. Used on produce cards (A2), Home Ch 4 and Where to Buy. |
| **Buttons** | Primary: a lime pill (soil-900 on daylight) with magnetic pull, label roll and circle fill. Secondary: a hairline outline. Text link with an arrow. WhatsApp: the brand pill with the Phosphor WhatsApp glyph. |
| **CTA band** | A big serif ask plus 2–3 actions. Dark and Daylight variants. |
| **Door cards** | The three-audience row in full and compact variants. |
| **Media frame** | An image with an R2 reveal, an optional annotation overlay and a mono caption with a leading rule. |
| **Marquee strip** | R6, with seedburst glyph separators. |
| **Journey rail and day counter** | Home only (About's stepper reuses the rail's styling). |
| **Page transition and cursor** | "Till" and the seed cursor (§5.4–5.5). |
| **Empty-state pattern** | Sections with no real data hide entirely. There are no "coming soon" holes, except the seller list's "Not in your area? Tell us" capture (A2/A3). |
| **Form field styling** | A bottom-border-only input, a mono label above it, a lime focus line drawing from the left, and an error in clay-500 with an icon (A3 owns the forms). |

I hand over to A4 as tokens: colour, type scale, spacing, radii, easing and durations as CSS custom properties, plus the R1–R6 patterns as named utilities.

---

## 10. Content and assets needed from Bhoomi Tech

- [ ] Original logo source files (vector), and the name used in running text: "Bhoomi Tech" or "Bhoomitech"
- [ ] Growing method, with photos of the growing setup (Q1)
- [ ] Real seed-to-harvest days per crop, and harvest-to-shelf time (for the day counter and specs)
- [ ] What the AI actually senses and decides, to replace the illustrative callouts (shared with A3)
- [ ] Photo/video shoot approval and budget, or existing photos: farm, produce, hands, packing, a seller shop, team
- [ ] Permission to photogrammetry-scan real produce for interim 3D
- [ ] Top 6 featured sellers with logos (via A2's data file)
- [ ] Founding story, year, founders; team list (name, role, photo, one line)
- [ ] Values: approve or replace the drafts
- [ ] Any publishable numbers, certifications or partners
- [ ] Confirmation of the "Bhoomi = earth" naming story; Devanagari lockup approval
- [ ] Hindi or regional copy writer/reviewer, if a language is in scope
- [ ] Font licence budget (GT Alpina) or approval of the free fallback
- [ ] WhatsApp number, phone, email, address, social links

## 11. Dependencies

- **From A2:**
  - The produce data schema (name, descriptor, order, images or sequence path), which drives Ch 3.
  - The sellers schema (name, type, area, city, URL, logo, `featured`), which drives Ch 4 and the chip.
- **From A3:**
  - Real software features for the Ch 2 callouts and UI fragments.
  - Form routes and the WhatsApp/phone pattern for the doors and footer.
- **From A4:**
  - The Astro component and island strategy, plus the GSAP, ScrollTrigger, Lenis and Three.js integration (lazy, tier-gated).
  - Tier detection and the FPS watchdog.
  - View Transitions.
  - Font self-hosting and subsetting (Latin and Devanagari).
  - The image pipeline (AVIF/WebP, frame sequences, posters) and the i18n routing.
  - Performance budgets: hero LCP is the H1; initial JS (excluding three) at or under about 90KB gz.
  - Confirmation that the H1 reveal doesn't hurt LCP. If it does, the H1 renders static and only the lede and annotations animate.
- **To all agents:** tokens, type, motion patterns R1–R6 and the shared components above.
- **External:** a 3D generalist (optional rigged seedling, cleanup of the produce scans) and a photographer.

## 12. Open questions for the owner (most important first)

1. **How is the produce grown?** (Open field, polyhouse, hydroponic or vertical.) The hero is a *soil* core. If you grow hydroponically, it becomes a grow cube with water roots, which is a different model and shader.
2. **Do real photos or video exist, or will you fund a 2-day shoot?** This decides between photography and 3D renders, and how soon the site looks finished.
3. **Hindi or a regional language at launch?** This changes copy lengths, the Devanagari type work, the nav toggle and the farmers' door.
4. **"Bhoomi Tech" or "Bhoomitech" in running text?** And may we use the "भूमि = earth" story on About?
5. **What does "marketplace services" mean?** Does Bhoomi Tech sell via marketplaces, or is it a service that helps *other* farmers sell? This changes the offerings row and possibly the site map.
6. **Which creative direction?** "Soil, Annotated", "Morning Market" or "Strata".
7. **Font licence:** buy GT Alpina, or use the free Fraunces fallback?
8. **Are any real numbers, partners or certifications publishable?** If not, those sections stay hidden.

## 13. Rough effort

| Item | Size |
|---|---|
| Brand system (tokens, type setup, logo redraw, icon set, annotation kit) | M |
| Motion system (tokens, R1–R6, Till transition, cursor, tiers) | M |
| Home Ch 1–2 WebGL hero (scene, growth, field, scan, fallbacks) | **L** |
| Home Ch 3 harvest sequences (scans, renders, scrubber) | M (asset-heavy) |
| Home Ch 4 market track and S2 sunrise wipe | M |
| Home Ch 5, offerings index, doors, footer | M |
| About page (incl. S3 ground line, stepper, survey lens) | M |
| Shared components (nav, menu, CTA, chips, counters, media frame) | M |
