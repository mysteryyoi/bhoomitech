# A2: Our Produce and Where to Buy (consumer side)

Status: planning only. Assumes India (`.in` domain), flagged as an open question. Everything the owner has not told us is a `[PLACEHOLDER: ...]`.

---

## 1. Purpose

**Who it serves:** households who want to know what Bhoomi Tech grows and, above all, **where they can actually buy it**. Nobody can buy on the site. So the two pages work as one flow: *"Meet it, then go and get it."*

**Jobs to be done**
1. Make three vegetables (lettuce, kale, cucumber) feel like a premium, living brand rather than a commodity.
2. Make the *seed-to-fork* promise tangible per item: how it grows, how quickly it reaches the shelf, how to keep it.
3. Get a visitor from "I want this" to a shop address or an outbound marketplace link in **two taps**.
4. Stay honest. No fake stock, no invented shops, no health claims. Everything uncertain is a placeholder until the owner supplies it.

**Success looks like:** a visitor on a phone with a mid-range Android lands on `/where-to-buy/`, picks a city, and sees the right shops in under 5 seconds. The produce pages are the most beautiful part of the consumer experience, but the locator is the page that does the actual work.

**Principle:** the produce and seller lists are data. Every page, filter, count, cross-link and sitemap entry is generated from two data files. Adding a vegetable or a shop never needs a developer to touch a layout.

---

## 2. Page-by-page breakdown

### 2.1 `/produce/` (Our Produce overview)

**Concept: "The Harvest Index".** Not a grocery grid. It reads like a botanical specimen catalogue crossed with a technical spec sheet. Each vegetable is a **specimen**: a cut-out hero image on the dark green field, set in giant editorial type, with small technical annotations (lime hairlines and `+` marks borrowed from the existing placeholder).

The layout **switches mode by item count**, chosen at build time from the data, so it scales from 3 to about 20 without a redesign:

| Items | Mode | What the visitor sees |
|---|---|---|
| 1 to 6 | **Chapters** | Each vegetable gets a full-viewport "chapter" with a huge cut-out and big name, scroll-snapped feel. 3 items means 3 cinematic screens. |
| 7 to 20 | **Index** | A dense typographic index (one big line per vegetable, numbered `01`, `02`, ...). Hovering or focusing a row reveals its cut-out in a sticky stage on the right. Category chips (Leafy, Fruiting, Herbs, Roots) and a "In season now" toggle filter the rows. |

The same data and the same components drive both. Mode is a build-time constant (`produce.length > 6`), with an override in site config.

**Sections in scroll order**
1. **Hero.** Eyebrow `OUR PRODUCE`. Headline draft: **"Grown with care. Found near you."** Sub: "Three vegetables to start. More every season." (The count is data-driven: "{n} vegetables to start".) A slow drifting field of small hexagon "seed" shapes sits behind the headline. A single scroll cue links to the first specimen.
2. **The catalogue** (Chapters or Index mode, above). Each specimen shows: number, name, local-language name (`[PLACEHOLDER: local name]`), a one-line taste note, a freshness chip ("Harvested to order" only if the owner confirms, otherwise omitted), and two actions: **Meet {name}** (detail page) and **Find it near you** (locator, pre-filtered).
3. **"Where do I buy it?" band.** A full-width strip with a city selector ("Pune, Mumbai, ...", built from the cities that exist in the seller data) and a primary button into `/where-to-buy/?city=...`. This is the page's real conversion point.
4. **Seed-to-fork reminder.** A short 4-step strip (Seed, Grow, Harvest, Shelf) linking to About for the full story. Keeps the brand promise in view without repeating A1's work.
5. **Coming next** (only when the data has `status: coming-soon` entries). Dimmed specimen cards with a "Coming soon" tag. This makes the catalogue feel alive and gives the brand a roadmap, at zero cost.
6. **Footer CTA:** "Sell our produce? Become an authorized seller" (see section 5.3, pending the owner's decision).

**Copy direction:** calm, confident, short lines (the existing tone). Sensory words (crisp, cool, snap), never superlatives we cannot prove. No "organic", "pesticide-free", "100% fresh" or any similar claim unless the owner supplies the evidence and certification: `[PLACEHOLDER: approved claims list]`.

**Wireframe, desktop, Chapters mode**
```
+--------------------------------------------------------------------+
| (B) bhoomitech.   Produce  Where to Buy  Software  Farmers  About  |
+--------------------------------------------------------------------+
|  OUR PRODUCE                                          + . . +      |
|                                                                    |
|  Grown with care.                          . hexagon seed field .  |
|  Found near you.                                                   |
|  Three vegetables to start. More every season.         v scroll    |
+--------------------------------------------------------------------+
|  01 / 03                                  +-- ---- --- ---+        |
|                                           |   [ cut-out ]  |       |
|  Lettuce                                  |   hero image   |       |
|  [local name]                             |  leaf-tip note |       |
|  Crisp, cool, quietly sweet.              +-- ---- --- ---+        |
|  [ Meet lettuce -> ]  [ Find it near you ]   hairline + labels     |
+--------------------------------------------------------------------+
|  02 / 03   Kale     (mirrored layout, same pattern)                |
+--------------------------------------------------------------------+
|  Where do I buy it?   [ Pick your city v ]   [ Show sellers -> ]   |
+--------------------------------------------------------------------+
|  Seed -> Grow -> Harvest -> Shelf        Coming next: [dimmed]     |
+--------------------------------------------------------------------+
```
**Mobile:** one specimen per screen, cut-out above the text, the two actions as stacked full-width buttons. Index mode becomes a simple list (name, number, thumbnail 64px); tapping opens the detail page and the sticky stage is dropped. No hover dependence anywhere.

### 2.2 `/produce/{slug}/` (per-vegetable detail page)

Same template for every item. Per-item differences come from data, so a new vegetable needs no new layout.

**Sections in scroll order**
1. **Specimen hero.** Large cut-out, name, local name, one-line taste note, and a sticky mini-bar holding **Find it near you** (visible once the hero scrolls away). Facts row: season `[PLACEHOLDER]`, pack sizes `[PLACEHOLDER]`, shelf life (from storage data).
2. **Seed to shelf** (the signature scrubber, see section 4.2). Pinned section that walks the item from seed to the shelf with a live "day counter".
3. **How it's grown.** Method is a placeholder: `[PLACEHOLDER: growing method (open field / polyhouse / greenhouse / hydroponic / vertical), water source, inputs]`. Layout is ready to hold a short paragraph, 3 "how" facts, and an optional photo or loop. If AI-farm details are confirmed, a contextual link goes to Farm Software ("See how the farm runs itself"). **Do not link this until the owner confirms it is true for this item.**
4. **Harvest-to-shelf freshness story.** A simple three-stop route: Harvest, Pack and chill, Shelf. Each stop shows a time `[PLACEHOLDER: hours/days]` and a one-line note `[PLACEHOLDER: cold chain details]`. If real batch data exists, this section becomes the "freshness signal" (section 5.1).
5. **Taste and how to use it.** Short flavour profile, 3 to 4 "good with" chips (for example "Salads", "Sandwiches", "Smoothies" for kale), and 2 simple ideas. Recipe links are optional later. Copy is written by us and approved by the owner.
6. **Nutrition highlights.** 3 to 4 plain-language tiles (for example, kale: vitamins K and C). Labelled clearly **"General nutrition information, not a claim about this specific batch. Source: USDA FoodData Central / ICMR-NIN `[PLACEHOLDER: confirm source and values]`."** No numbers are entered until copied from the cited source and checked. No disease or cure claims. Ever.
7. **Storage tips.** Three icon-led tips (where, how, how long) from data. Example shape: "Keep it cool and dry in the fridge. Wash just before use." Real durations come from Bhoomi Tech's own testing: `[PLACEHOLDER]`.
8. **Find it at.** The sellers that stock this item, as compact cards (name, type, area, outbound or directions link), filtered to the visitor's remembered city if any. Ends with "See all sellers for {name}" (deep link to the locator). Empty state: "We're working on getting {name} to more shelves. Tell us your city." (A WhatsApp or enquiry link, per A3.)
9. **Neighbours.** "Also from the farm": two other produce cards, then a link to the full catalogue.

**Wireframe, desktop**
```
+--------------------------------------------------------------------+
|  <- All produce                                        02 / 03     |
|  Kale                                 +--------------------+       |
|  [local name]                         |     [cut-out]      |       |
|  Deep, earthy, a little sweet.        +--------------------+       |
|  Season [..]  Pack [..]  Keeps [..]       [Find it near you]       |
+--------------------------------------------------------------------+
|  SEED TO SHELF   (pinned)                                          |
|  [stage image  ]   Day 0 --o--------------------o-- Day [n]       |
|   Seed  Sprout  Growth  Harvest  Chill  Shelf                      |
|   "Day 21. First true leaves." (caption changes per stage)         |
+--------------------------------------------------------------------+
|  How it's grown       |  Harvest to shelf: [H] ---[P]---[S]        |
|  [placeholder text]   |  [hrs]  [hrs]  [hrs]                       |
+--------------------------------------------------------------------+
|  Taste & use          |  Nutrition (general info)   Storage        |
|  chips + 2 ideas      |  tile  tile  tile           3 tips         |
+--------------------------------------------------------------------+
|  FIND IT AT   [Pune v]                                             |
|  [Shop card] [Shop card] [Marketplace card ->]    See all ->       |
+--------------------------------------------------------------------+
|  Also from the farm:  [Lettuce]  [Cucumber]                        |
+--------------------------------------------------------------------+
```
**Mobile:** single column. The pinned scrubber becomes a horizontal swipe carousel of stages (CSS scroll-snap) with a dot indicator. "Find it at" cards are a horizontal snap row. The sticky "Find it near you" bar sits at the bottom edge.

### 2.3 `/where-to-buy/` (the seller locator)

**Decision: list-first, map as a lazy, optional second view. Not map-first.**

Reasons: farmers and households on low-end Android over 4G need the answer fast. A tile map costs bandwidth, JavaScript and battery, and is poor for accessibility, while a seller list is instant, searchable, indexable by Google, and works with a screen reader. A map earns its place only when there are enough sellers spread across enough places to need it.

**Phased plan**
- **Launch (fewer than about 25 sellers, 1 to 3 cities):** list only, plus a **stylised city selector** (a lightweight inline SVG of dots, one per city, not a real map). No tile map, no map library, near-zero cost.
- **Later (about 25+ sellers across 3+ cities, or owner request):** add a **"Map" toggle** that lazy-loads MapLibre GL JS (or Leaflet, which is lighter) *only on tap*, with a self-hosted or free-tier tile source `[PLACEHOLDER: tile provider decision, A4]`. The list stays the primary view. Because `lat`/`lng` are stored from day one (section 3), this is purely additive.

**Sections in scroll order**
1. **Hero.** Eyebrow `WHERE TO BUY`. Headline draft: **"From our farm to a shelf near you."** Sub: "We don't sell online. Our produce reaches you through sellers we've authorized." That line also states the "not sold on this site" fact up front.
2. **Filter bar** (sticky on scroll):
   - **City** (chips built from seller data; default none, remembered in `localStorage` if the visitor chose one, which is a per-device convenience and is never sent anywhere).
   - **Area / pincode** text box (filters within the city; matches `area` and `pincode` fields).
   - **Seller type** segmented control: All, Shops, Online marketplaces.
   - **Produce** multi-select chips (Lettuce, Kale, Cucumber, ...). Pre-selected when arriving from a produce page.
   - **Near me** button (see below).
   - Live result count ("7 sellers in Pune stock kale") announced via `aria-live`.
3. **Results.**
   - **Shops:** card with name, area, address, opening hours (optional), produce stocked (chips), and two actions: **Directions** (opens the visitor's own maps app via a standard maps URL built from the address or lat/lng) and **Call** (`tel:`) when a phone exists.
   - **Online marketplaces:** card with logo or name, "Delivers to: {cities / pincode check on their site}", and a primary **Buy on {Marketplace}** button that is an **outbound link** (`target="_blank" rel="noopener noreferrer"`). A short line says, "You'll leave bhoomitech.in to complete your order." The link goes to that marketplace's Bhoomi Tech brand page or product listing (`product_url` per item where it exists).
4. **Empty states** (all with a next step, never a dead end):
   - **City has no sellers yet:** "We're not in {city} yet. Here is the nearest city we are in." Shows nearest cities from stored coordinates, plus any online marketplaces that deliver nationally, plus a **Tell us your city** link (WhatsApp or short enquiry form via A3) so demand is a signal we can use.
   - **Filters too narrow:** "No sellers match all filters" with one-tap "Clear {last filter}" buttons.
   - **No JavaScript:** the full seller list is rendered into static HTML at build time, grouped by city, so it works without JS. Filters are a progressive enhancement.
5. **Become an authorized seller** (low-key block, see 5.3).
6. **Trust note:** "Look for the Bhoomi Tech label" with a picture of the packaging `[PLACEHOLDER: packaging image]` and the line "Not sure it's genuine? Tell us" linking to Contact.

**Near me (opt-in, no tracking)**
- A button, never automatic: **"Use my location"**. Only on tap does the page call `navigator.geolocation.getCurrentPosition` (one-shot, never `watchPosition`).
- Distance sorting happens **entirely in the browser** (Haversine against each seller's stored `lat`/`lng`). Coordinates are never sent to any server, never stored (not even in `localStorage`), and never put in a URL. A line under the button says exactly this: "Your location stays on your phone. We don't store it."
- If denied or unavailable: no error wall. The page shows the city chips and pincode box, and a hint to use them. Sellers lacking `lat`/`lng` simply sort after those that have it.
- The permission prompt wording is the browser's, so our button label sets expectation first.

**Wireframe, desktop (list view)**
```
+--------------------------------------------------------------------+
|  WHERE TO BUY                                                      |
|  From our farm to a shelf near you.                                |
|  We don't sell online. Sellers we've authorized stock our produce. |
+--------------------------------------------------------------------+
| City: (Pune)(Mumbai)(...)  Area/pincode [______]  [Use my location]|
| Type: [All|Shops|Online]   Produce: (Lettuce)(Kale)(Cucumber)      |
| 7 sellers in Pune stock kale                       [List | Map*]   |
+--------------------------------------------------------------------+
| +----------------------+ +----------------------+                  |
| | Shop name  [Shop]    | | Shop name  [Shop]    |   *Map toggle    |
| | Area, City           | | Area, City           |   appears only   |
| | (Lettuce)(Kale)      | | (Kale)(Cucumber)     |   once data      |
| | [Directions] [Call]  | | [Directions] [Call]  |   justifies it   |
| +----------------------+ +----------------------+                  |
| +----------------------+                                           |
| | Marketplace [Online] |   [Buy on Marketplace ->] (opens new tab) |
| +----------------------+                                           |
+--------------------------------------------------------------------+
|  Run a shop or marketplace?  Become an authorized seller ->        |
+--------------------------------------------------------------------+
```
**Mobile:** filters collapse into one **"Filter" sheet** (bottom drawer) with a persistent city pill and result count above the list. Cards are full-width, with the primary action (Directions or Buy on...) as a large thumb-reach button. The filter sheet respects the on-screen keyboard.

**SEO and deep links:** filters write to the query string (`?city=pune&produce=kale&type=shop`) so a visitor can share a link. For search visibility, generate static city pages `/where-to-buy/{city}/` (build-time, only for cities that have at least one seller), each with a unique title and a plain list ("Buy Bhoomi Tech kale in Pune"). Structured data (`LocalBusiness`, `Product` without price) is A4's call.

---

## 3. Data model

Two data files, edited by a non-developer. **Recommended format: YAML or JSON in `src/data/produce.*` and `src/data/sellers.*`** (the final choice and any CMS editing UI belong to A4). Both are validated at build time by a schema (A4), so a typo like an unknown produce slug **fails the build with a plain-English message** instead of shipping a broken page. Optional: a spreadsheet-to-JSON convenience so the owner can maintain sellers in Google Sheets or Excel `[open question for A4]`.

### 3.1 `produce` entry

```yaml
- slug: lettuce                 # required, lowercase, used in URL /produce/lettuce/
  status: available             # available | coming-soon | paused
  order: 1                      # display order
  name: Lettuce
  name_local:                   # optional, per language
    hi: "[PLACEHOLDER: Hindi name]"
  category: leafy               # leafy | fruiting | herb | root | other
  tagline: "Crisp, cool, quietly sweet."        # one line
  taste: "[PLACEHOLDER: 2-3 sentence flavour note]"
  uses: ["Salads", "Sandwiches", "Wraps"]       # chips
  season: "[PLACEHOLDER: months or 'year-round']"
  pack_sizes: ["[PLACEHOLDER: e.g. 200 g]"]
  hero_image: /img/produce/lettuce-cutout.webp   # transparent cut-out
  hero_alt: "A head of lettuce on a dark green background"
  accent: "#b8ed79"             # per-item tint, defaults to brand lime
  growing:
    method: "[PLACEHOLDER: open field | polyhouse | greenhouse | hydroponic | vertical]"
    summary: "[PLACEHOLDER: short paragraph]"
    facts: ["[PLACEHOLDER: fact 1]", "[PLACEHOLDER: fact 2]", "[PLACEHOLDER: fact 3]"]
  stages:                       # drives the Seed-to-shelf scrubber
    - { key: seed,    day: 0,  caption: "[PLACEHOLDER]", image: /img/produce/lettuce/1.webp }
    - { key: sprout,  day: "[PLACEHOLDER]", caption: "[PLACEHOLDER]", image: ... }
    - { key: growth,  day: "[PLACEHOLDER]", caption: "[PLACEHOLDER]", image: ... }
    - { key: harvest, day: "[PLACEHOLDER]", caption: "[PLACEHOLDER]", image: ... }
    - { key: chill,   day: "[PLACEHOLDER]", caption: "[PLACEHOLDER]", image: ... }
    - { key: shelf,   day: "[PLACEHOLDER]", caption: "[PLACEHOLDER]", image: ... }
  freshness:
    harvest_to_shelf: "[PLACEHOLDER: typical hours/days]"   # generic, not per batch
    steps: ["[PLACEHOLDER: harvest note]", "[PLACEHOLDER: pack/chill note]", "[PLACEHOLDER: shelf note]"]
  nutrition:
    basis: "per 100 g"          # shown on page
    source: "[PLACEHOLDER: USDA FoodData Central ID or ICMR-NIN table]"
    highlights: ["[PLACEHOLDER: e.g. 'A source of vitamin K']"]   # plain language, no health claims
  storage:
    where: "[PLACEHOLDER]"
    how: "[PLACEHOLDER]"
    keeps_for: "[PLACEHOLDER: tested duration]"
  seo: { title: "", description: "" }           # optional overrides
```

### 3.2 `seller` entry

```yaml
- id: sample-shop-pune-1        # required, unique
  active: true                  # false hides without deleting
  name: "[PLACEHOLDER: Shop name]"
  type: shop                    # shop | marketplace
  city: pune                    # slug, grouped into city pages
  area: "[PLACEHOLDER: neighbourhood]"
  address: "[PLACEHOLDER: full address]"
  pincode: "[PLACEHOLDER]"
  lat: null                     # optional, decimal degrees, see 3.4
  lng: null
  phone: "[PLACEHOLDER]"        # optional; shown as tel: link
  hours: "[PLACEHOLDER: e.g. Mon-Sat 8-8]"      # optional
  website: ""                   # optional
  logo: ""                      # optional
  verified_on: "[PLACEHOLDER: date]"            # when Bhoomi Tech last confirmed stock
  stocks:                       # THE link between the two files
    - { produce: lettuce, status: in-stock }
    - { produce: kale,    status: usually }     # in-stock | usually | seasonal
  # marketplace only:
  url: ""                       # brand page URL (outbound)
  product_urls:                 # optional per-item deep links
    kale: ""
  delivers_to: ["[PLACEHOLDER: cities or 'pan-India']"]
  notes: ""
```

A third small file lists **cities**: `{ slug, name, state, lat, lng }`. It powers the city chips, the "nearest city" empty state and the city pages.

### 3.3 How they link

**One direction of truth: the seller owns the relationship** (`seller.stocks[].produce` is a produce `slug`). The "Find it at" section on each produce page is computed by inverting it at build time. This is deliberate: the real-world event is "a shop starts or stops stocking kale", and the person editing that is looking at the shop. Editing one place means no drift, no two files to keep in step. The build **fails** if a seller references a missing slug, and warns on sellers whose `verified_on` is older than `[PLACEHOLDER: e.g. 90 days]` so stale listings do not quietly mislead people.

### 3.4 Map and geocoding implications

- Store `lat`/`lng` **optionally** from day one. They are needed for Near me, nearest-city fallback and any future map. A non-developer can get them in 10 seconds from a maps app (right-click, copy coordinates), and the editing guide should show how.
- **No runtime geocoding.** A client-side geocoding API would leak addresses to a third party, cost money and slow the page. If coordinates are missing the seller still appears (filter by city/area/pincode) and just doesn't participate in distance sort.
- Marketplaces have no `lat`/`lng` and are always shown, sorted below nearby shops, never filtered out by distance.
- Keep coordinates to about 4 decimal places (around 10 m). Shops are public places, so this is fine.

---

## 4. Signature moments

### 4.1 "The Specimen Stage" (Our Produce overview)

- **What it is:** each vegetable is a cut-out "specimen" floating over the dark field with lime hairline callouts (`+` marks and a short label such as "Leaf, crisp" pointing at parts of the image).
- **What moves:** on scroll into each chapter, the specimen **rises and de-blurs** into place while its callout lines **draw themselves** (stroke-dashoffset) and the huge name slides in with a staggered letter reveal. On desktop the image has a subtle **pointer-follow tilt** (about 4 degrees max) and its hexagon backdrop shifts in parallax. The next specimen crossfades through a hexagonal clip-path wipe, echoing the brand's hex sculpture.
- **Trigger:** scroll position (ScrollTrigger), plus pointer movement on desktop only.
- **Degrades:** with `prefers-reduced-motion`, no tilt, no parallax, no line-drawing; elements simply fade in once, or just appear. On low-end phones (detected via `hardwareConcurrency <= 4` or `saveData`, A4 to define) the images are static, the hexagon backdrop becomes a flat CSS gradient, and reveal animations are limited to opacity. The content is identical in every mode.
- **Asset dependency:** needs real cut-out photography. Until it exists, use **illustrated SVG vegetables in the brand's isometric hexagon style** (A1 to define the illustration language). This is a good interim and arguably a lasting look.

### 4.2 "Seed to Shelf" scrubber (per-vegetable page; **one shared interaction for every item**)

- **What it is:** a pinned section, roughly 4 viewport-heights of scroll on desktop. A large stage image on the left; on the right a timeline rail with six stops (Seed, Sprout, Growth, Harvest, Chill, Shelf) and a big lime **day counter** ("Day 0" ... "Day [n]").
- **What moves:** scrolling scrubs through the item's `stages` array. The stage image **crossfades between 6 pre-rendered frames** (WebP/AVIF sequence, about 30 to 60 KB each, no video, no WebGL needed). The rail's lime fill extends, the counter ticks up to the stage's `day` value, and the caption changes. At "Shelf" the counter freezes and a button pulses: **"Find {name} near you"**.
- **Why one shared version:** it uses the same component with different data per item (leafy and fruiting differ only in stage images and day values). That keeps cost and consistency sane. If the owner later wants item-specific flair (for example, a cucumber vine that climbs), it is added by adding an optional `scene` field, not a rebuild.
- **Degrades:** `prefers-reduced-motion` or no JS, or phones on slow data, or `saveData`: the pin is released and the stages render as a plain **vertical or horizontal list** (stage image, day label, caption), fully informative. On mobile generally it is already the swipe carousel by design, with the counter updating as slides change. Only the first frame preloads; others lazy-load as the section nears the viewport.
- **Honesty guard:** `day` values and captions are placeholders until the owner supplies real figures. The component must refuse to render a number that is still `[PLACEHOLDER]` and show "Day --" instead.

### 4.3 "City reveal" (Where to Buy)

- **What it is:** picking a city makes the filter bar's dot-map **zoom to that city's dot**, which then pulses once, while result cards **stagger in** (about 40 ms apart) and the count animates up ("0 to 7 sellers").
- **Trigger:** tapping a city chip or finishing Near me.
- **Degrades:** reduced motion means no zoom or stagger, just an instant swap and a polite announcement via `aria-live`. On low-end phones, the dot-map is hidden and only chips and list remain. Result rendering is virtual-free plain DOM (lists are short).

---

## 5. Trust and traceability

### 5.1 Idea A: batch QR code and "Harvested X days ago"

- **Idea:** a small QR on each pack encodes `bhoomitech.in/produce/kale/?b=K-1126-A`. Scanning opens the kale page with a **batch banner** at the top: "Your pack: Batch K-1126-A, harvested {date} ({n} days ago), grown at {unit}."
- **Works on static hosting:** the batch lookup is a small `batches.json` fetched client-side; the code is matched on the page. If a code is not found (or the data has not been uploaded yet), the page quietly shows the normal produce page, with no error. The pack can therefore be printed *before* the batch data is published, which matters because printing and harvesting happen on different timelines. Adding a batch is one more row in the data file, and a deploy takes about a minute on GitHub Pages.
- **The freshness signal:** "harvested {n} days ago" computed from the batch's `harvested_on` in the visitor's browser. If the number is large (over `[PLACEHOLDER: threshold]`), it is shown plainly rather than hidden, because the credibility is the point.
- **Needs real data from Bhoomi Tech:** batch codes, harvest dates, growing unit or block, packing date, optional lab or quality results, whether packaging can carry a QR at all, and who is responsible for entering batches each week. **If no one can maintain this, do not ship the batch banner.** An out-of-date traceability feature damages trust more than having none.
- **Privacy:** no scan analytics beyond whatever A4 chooses for the whole site, and no personal data collected.

### 5.2 Idea B: "Stocked and checked" seller badge (no new data pipeline)

- **Idea:** every seller card shows "Stocks: kale (confirmed {Month YYYY})" built from `verified_on`, so the site visibly says when Bhoomi Tech last verified a listing. Listings past the staleness limit auto-collapse into a "May have stock" group rather than disappearing silently.
- **Needs real data:** a genuine verification routine. Someone at Bhoomi Tech must actually confirm sellers on a schedule `[PLACEHOLDER: owner and cadence]`.
- Cheap, honest, and supports the "authorized" claim, which is otherwise only a word.

### 5.3 "Become an authorized seller" call to action

**Recommendation: include it, but small.** One quiet block at the foot of Where to Buy (and the produce overview footer), not in the hero or main nav, so households are never distracted from finding a shop. A new business audience (shops and marketplaces) is a real growth lever for the "marketplace services" offering and the data model already supports adding sellers. **Risks:** it invites enquiries the team may not be ready to answer, and it needs a third enquiry type, which A3 owns. A simple version is a link to Contact with `?topic=seller` pre-selecting a "Become a seller" option. **Flagged for the owner (question 4 below).**

---

## 6. Linking into the rest of the site

- **Homepage door:** the journey's final chapters ("Harvest" then "Marketplace / sellers" then "Your plate") end on a **"Find it near you"** door: a city selector that jumps straight to `/where-to-buy/?city=...`, plus "Meet the produce" to `/produce/`. The homepage's household door should be the *most prominent* of the three audience doors, since households are the broadest audience. Coordinate wording with A1.
- **Main nav:** `Our Produce` and `Where to Buy` as top-level items (order: Produce, Where to Buy, Farm Software, For Farmers, About, Contact). On mobile, "Where to Buy" is one tap from the menu and also available as a persistent bottom action on produce pages.
- **Cross-links**
  - Produce page to Locator (hero button, sticky bar, "Find it at" section).
  - Locator to Produce (each produce chip on a seller card links to that item page).
  - Produce "How it's grown" to Farm Software, only once the owner confirms the method and the AI link is true.
  - Produce and Locator to About (seed-to-fork) via the 4-step strip.
  - Locator to Contact (seller CTA, "Tell us your city", "Not sure it's genuine?").
  - Footer: both pages appear in the footer sitemap.
- **Persistence:** the chosen city is remembered in `localStorage` (per-device convenience only) and pre-filters "Find it at" and the homepage selector.
- **Languages:** UI strings and `name_local` fields are written to be translatable (A4 owns i18n). City and seller names are proper nouns and are not translated.

---

## 7. Content and assets needed from Bhoomi Tech

- [ ] Country, states and cities where sellers will be listed at launch
- [ ] For each launch seller: legal or trading name, type, address, pincode, phone, hours, website, **written consent to be listed**, logo
- [ ] For marketplaces: brand page or product URLs, delivery coverage
- [ ] Which sellers stock which vegetable at launch, and who verifies this and how often
- [ ] Growing method per vegetable, and photos or video of the farm
- [ ] **Cut-out photography** of lettuce, kale, cucumber (on a plain background), plus 6 growth-stage images per item (or approval to use illustrations instead)
- [ ] Day counts: seed to harvest, harvest to shelf, timings per stage
- [ ] Pack sizes, season, tested shelf life per item
- [ ] Approved claims list (what we may and may not say: "organic", "residue-free", etc.) and any certification
- [ ] Local-language names (and whether to launch in Hindi or a regional language)
- [ ] Packaging: can it carry a QR? Existing label artwork for the trust note
- [ ] Decision on the "Become an authorized seller" CTA, and who answers those enquiries
- [ ] Nutrition source preference (USDA FoodData Central, or India's ICMR-NIN tables)
- [ ] The list of next vegetables (for "Coming next")

---

## 8. Dependencies

- **A1 (brand/motion):** specimen illustration or photography style, hex-clip transition, `+` hairline annotation system, eyebrow/heading styles, shared card and button components, homepage "find it" door wording.
- **A3 (contact):** a "Become a seller" enquiry type, a "tell us your city" lightweight route, WhatsApp link behaviour.
- **A4 (tech):** data file format and schema validation, build-time pages (per-item, per-city), image pipeline (AVIF/WebP, responsive `srcset`), map library and tile provider choice (if and when), low-end device detection policy, analytics policy (none preferred here), i18n, structured data and sitemap.
- **Shared components needed:** `SpecimenHero`, `StageScrubber`, `SellerCard`, `CityChips`, `FilterSheet`, `ProduceCard`, `Placeholder` (visibly flags unfilled data in dev builds), `OutboundLink`.

---

## 9. Open questions for the owner (most important first)

1. **Where do you operate?** Which country, states and cities will the first authorized sellers be in? (Decides the city list, whether we need a real map early, languages and delivery wording. We are assuming India.)
2. **Who are the first authorized sellers, and have they agreed to be listed?** Roughly how many shops and which marketplaces at launch? (Under about 25 means list-first with no map; more means we add the map sooner. A seller needs to agree before we publish their name.)
3. **How is the produce grown, and do you have photos or video?** Open field, polyhouse, hydroponic or vertical? Real photography of the produce and the farm decides whether the specimen pages use photo cut-outs or illustration, and fills "How it's grown".
4. **Should the site invite shops and marketplaces to become authorized sellers?** If yes, who answers those enquiries, and is "marketplace services" the offering they would be buying into?
5. **Do you want batch traceability (QR on pack, harvest date)?** And can someone realistically enter batch data weekly? If not, we ship only the "last verified" seller badge and the generic freshness story.

---

## 10. Rough effort

| Piece | Effort | Notes |
|---|---|---|
| Data schema, validation, two data files, sample placeholder entries | S | Foundation; do first |
| `/produce/` overview (Chapters + Index modes) | M | Index mode and filter chips are the extra work |
| Specimen Stage motion (4.1) | M | Gated on A1's illustration/photo style |
| `/produce/{slug}/` template (all sections except scrubber) | M | |
| Seed-to-Shelf scrubber (4.2) incl. fallbacks | M | Needs stage frames from the owner |
| `/where-to-buy/` list, filters, URL state, empty states | M | Highest priority; most of the real value |
| Near me (opt-in, client-side) | S | |
| City pages (`/where-to-buy/{city}/`) | S | Generated from data |
| City reveal motion (4.3) | S | |
| Map toggle (lazy-loaded) | M | **Deferred** until seller count justifies it |
| Batch QR banner and `batches.json` | M | **Conditional** on owner answer 5 |
| Seller-CTA block | S | Pending owner decision |

Suggested order: data model, locator list, produce template, overview, scrubber, motion polish, then the optional map and batch features.
