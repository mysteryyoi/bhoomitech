# C2 · Our Produce and Where to Buy

Independent Codex planning · 26 November 2026 · Helper model **gpt-6.2-sol**. Company details come from the shared brief. Page copy, interaction, route and content decisions below are proposals.

## 1. Purpose

Help households recognize what Bhoomi Tech grows and reach an authorized shop or marketplace that has been confirmed to carry that crop. The launch catalogue is lettuce, kale and cucumbers. The purchase happens with the seller. City, seller names, shipping reach and current crop arrangements are `[PLACEHOLDER: verified launch locations and authorized sellers]`. India is a working assumption from the domain. Use geography confirmed by Bhoomi Tech when publishing.

The catalogue should feel like a close look at the harvest. The locator should quickly show which seller to try and how to get there or check delivery. A crop link should carry the selected crop through to the locator, including when JavaScript is unavailable. A seller relationship and a crop listing each need separate confirmation. Stock, hours and delivery remain subject to the seller’s own information.

## 2. Page-by-page breakdown

### Our Produce · proposed route `/our-produce/`

1. **Show the crops in the first screen.** Lead with “What we grow.” Use a close crop photograph paired with the title and a short explanation that Bhoomi Tech produce is sold through authorized shops and marketplaces. Link “Find a seller” to the full directory. A short in-page index anchors to Lettuce, Kale and Cucumbers in that order. On desktop, show the start of the first crop under the introduction.
2. **Give each crop an editorial panel.** Pair one representative photo with the crop name, a one- or two-sentence description and one primary action such as “Find lettuce.” Write descriptions from `[PLACEHOLDER: approved varieties, sensory descriptions and household-use notes]`. Keep them practical and distinct. Include a variety or pack only when it has been approved for publication. The panel works with a single still and no extra copy beyond the name and action if material is limited. Optional secondary detail, such as a real texture photograph or a serving suggestion, should earn its space by helping people recognize or use the crop.
3. **End with the full directory and a modest brand link.** Repeat “See all authorized sellers” for people who buy multiple crops or shop by locality. Link back into the broader seed-to-fork story after the shopping action. Keep the catalogue on one page at launch, with stable crop anchors so Home can link to individual crops and an editor can add a crop in the data file.

Product calls to action use generated pages such as `/where-to-buy/produce/lettuce/`, which share one locator template and the same seller source. Render each route even if it has zero confirmed matches, so the link keeps context as sellers change. On that route, display “Find lettuce” as the page title with a clear “See all produce” filter reset and a quieter “Back to Our Produce” link. Future additions use the same template and stable crop IDs.

### Where to Buy · proposed route `/where-to-buy/`

1. **Put locality selection before storytelling.** Lead with “Where to buy Bhoomi Tech produce.” Follow with “Find an authorized shop or check delivery from a marketplace.” Display the selected crop where relevant. Crop links switch between All produce and the generated crop views. A location control shows All locations and the cities in the published directory. On a no-script visit, show city jump links and the complete list for the selected crop, grouped by city. A city with stores in the general directory and no confirmed matches for this crop gets a short empty message under its heading. Selecting a city in the enhanced view narrows store results. A city fragment restores context on back, forward and sharing, and leads to the same heading without JavaScript. The directory works without location permission or a typed address.
2. **Lead with the seller list.** Group storefronts under city headings, then show neighborhood or area in each entry. With several represented cities, disambiguate duplicate city names using the verified state or region. Sort cities and branches alphabetically by display name, with a stable secondary sort. Each branch gets seller name, area, public address or sufficient directions, product names confirmed for that branch, a listing-check date and a primary “Get directions” action. Include a secondary call link only when the seller approves its publication. Directions resolve to an approved URL for that branch. Nearby shops remain discoverable in the list without exact coordinates. The text address remains usable if the directions service is unavailable.
3. **Treat marketplace delivery as its own path.** Group marketplace listings beneath a separate “Order from a marketplace” heading. Show the approved marketplace name, confirmed crops, the published coverage label if known and “Check delivery” linking to the relevant seller or Bhoomi Tech product listing. With a city selected, matches with verified coverage for that city appear beneath the stores. Listings whose coverage requires a postcode check can appear separately under “Check delivery for your address” when the crop itself is confirmed. Listings whose verified coverage excludes the selected city stay outside that city’s results. Only label coverage national if Bhoomi Tech supplies the seller’s supporting information.
4. **Make absence actionable and precise.** A crop-and-city empty state reads “We haven’t listed a seller for [crop] in [city] yet.” Offer “Show all locations” and “See all produce” while retaining the context until the visitor changes it. If there's relevant marketplace coverage to check, surface it with its own label and keep it outside the verified city match count. If the whole directory is pending, say “We’re confirming where to buy Bhoomi Tech produce” and show a support link only if Bhoomi Tech confirms a team and channel that can answer purchase enquiries. On a seller entry, “Check stock with the seller” is enough. Use the date label “Listing checked [date]” where the date exists, so an old verification is visible without being confused with real-time availability.
**Discovery and access.** Launch with the list and external directions. Revisit an optional “View map” after accurate public coordinates are available and when results density warrants it. Load the provider only when visitors explicitly open the map. Keep each source card accessible through the list, even for entries without coordinates. If built, use labeled markers and a “Show in list” control that takes the visitor to the associated card when explicitly invoked. Keep map interaction opt-in and avoid collecting browser location in the launch scope. In the directory, keyboard focus stays on the area control during filtering. Announce the updated result count once and keep headings and contact actions in normal reading order. Capture the selected city in the crop links where feasible and clear it only when the user selects All locations.

## 3. ASCII wireframes

### Our Produce · desktop

```text
+--------------------------------------------------------------------------+
| bhoomitech.        Our Produce   Where to Buy   Farm Software   Menu     |
+--------------------------------------------------------------------------+
| What we grow.                     |                                      |
| Sold through authorized           | [Approved close produce photograph]  |
| shops and marketplaces.           |                                      |
| [Find a seller]                   |                                      |
+--------------------------------------------------------------------------+
| Jump to     Lettuce               Kale               Cucumbers           |
+--------------------------------------------------------------------------+
| [Lettuce photograph]              | Lettuce                              |
|                                   | [Approved description]               |
|                                   | [Find lettuce]                       |
+--------------------------------------------------------------------------+
| Kale                              | [Kale photograph]                    |
| [Approved description]            |                                      |
| [Find kale]                       |                                      |
+--------------------------------------------------------------------------+
| [Cucumber photograph]             | Cucumbers                            |
|                                   | [Approved description]               |
|                                   | [Find cucumbers]                     |
+--------------------------------------------------------------------------+
| [See all authorized sellers]          Explore the seed-to-fork story     |
+--------------------------------------------------------------------------+
```

**Mobile.** Stack each panel in the same reading order with its name, compact photograph, description and visible locator link close together. Keep the hero sufficiently short to expose the crop index or first crop on a typical phone. Allow index links to wrap. Load later photos as they approach the viewport and give images a reserved aspect ratio to prevent surrounding text from jumping.

### Where to Buy · desktop

```text
+--------------------------------------------------------------------------+
| bhoomitech.        Our Produce   Where to Buy   Farm Software   Menu     |
+--------------------------------------------------------------------------+
| Where to buy / Find [crop on crop route]                                 |
| Find an authorized shop or check delivery from a marketplace.            |
| All produce    Lettuce    Kale    Cucumbers     [City v]                 |
+--------------------------------------------------------------------------+
| [Results count]   See all locations when a city is selected              |
| [PLACEHOLDER: verified city]                                             |
| +--------------------------------+ +--------------------------------+    |
| | [Authorized shop name]         | | [Authorized shop name]         |    |
| | Area, address, confirmed crops | | Area, address, confirmed crops |    |
| | Listing checked [date]         | | Listing checked [date]         |    |
| | [Get directions] [Call]         | | [Get directions]               |   |
| +--------------------------------+ +--------------------------------+    |
| Order from a marketplace                                                 |
| [Marketplace listing] [Confirmed coverage or postcode check]             |
| [Confirmed crops]     [Check delivery]                                   |
+--------------------------------------------------------------------------+
| Back to Our Produce                                                      |
+--------------------------------------------------------------------------+
```

**Mobile.** Single-column list, with city and crop controls above the count. Show full addresses across wrapped lines. Keep directions and phone actions large enough for separate taps. Place delivery in the same scroll after local shops. Skip any persistent map overlay, sticky filter panel or carousel on the route.

## 4. Signature moments

1. **Harvest photographs come into focus as the reader reaches each crop.** The photo sits inside a fixed frame. When approximately one-third of the panel enters the viewport, its inner image eases from scale 1.045 to 1 over about 480 ms while a thin line beneath the crop name grows from left to right over 240 ms. Trigger once and leave the crop text and seller link visible throughout. Use a desktop composition with one close view of the leaves or skin and generous space for the plain-language crop panel. With reduced motion or on a constrained device, show the static fully framed still at the same size. Use one appropriate image source for the viewport, and no additional image is required for the effect.
2. **A city choice makes the directory settle into the local results.** Commit the filter immediately. After the visitor changes the city, the newly displayed heading and top row enter together with a 6 px rise and short opacity transition of roughly 160 ms. Keep the city control fixed in place and focused. Animate each change once, without staggering multiple rows, animating long layout shifts or holding back the links. With reduced motion, limited runtime or no enhancement, the city content is immediate. On a no-script visit, the city link jumps to a rendered heading and leaves the surrounding directory visible. An empty result simply renders its explanatory copy and actions in place.

## 5. Content and assets needed from Bhoomi Tech

- [ ] `[PLACEHOLDER: launch cities, areas, state or region and country]` and approved spellings for the public directory.
- [ ] `[PLACEHOLDER: authorized storefronts and marketplace listings]`, including branch-level public addresses, approved directions links, authorized public contact numbers, listings per crop and marketplace coverage or postcode-check URL.
- [ ] `[PLACEHOLDER: dates and evidence for seller authorization and crop listing checks]`. Keep evidence and private partner arrangements in the team's own records. The public directory uses only approved publishable facts and check dates.
- [ ] `[PLACEHOLDER: produce photography and public usage rights]`. Request one recognizable image per crop with room for desktop and mobile crops, plus a potential hero crop photograph. Add alt copy after choosing each image. Use verified Bhoomi Tech visuals where available, or use a typography-led panel until the representative imagery is approved.
- [ ] `[PLACEHOLDER: approved copy and claims for produce]` including varieties and product names where relevant. Verify any growing-method, harvest cadence or certification statement before adding it.
- [ ] `[PLACEHOLDER: produce editor, sales approver and consumer support contact]` so copy and seller changes have an owner and a publishing route.

## 6. Dependencies and content model

**Shared system.** Use C1’s type, color, crop treatment, navigation, main action and motion primitives. Home links to the catalogue and directory. Coordinate with C3 on a support handoff only if consumer enquiries are within Contact’s scope. Coordinate with C4 on the exact build filenames, routes, check rules, optimization, page metadata and multilingual labels. These pages need static rendering and basic list browsing as their baseline.

| Data file | Publishable record fields |
| --- | --- |
| `produce.json` | Stable `id` used by anchors and crop routes, `name`, short approved `description`, optional approved detail, `sortOrder`, image asset and alt, publication state. |
| `sellers.json` | One stable `id` per storefront branch or marketplace listing, public display name and type, authorization state, listing-check date, a set of referenced produce IDs confirmed at that branch or on that listing, and a type-specific destination. A storefront has country, region when needed, city key and label, area, public address, approved directions URL and optional public phone. A marketplace has a seller/product URL and explicit coverage by city key, wider verified scope or a postcode-check state. Optional per-crop URL or confirmation date only where they differ from the shared listing details. |

Keep internal notes, names, private phone numbers and approval evidence outside both publishable files. If two branches have the same public display name, treat them as separate records with stable IDs and separate crop sets. Share the same city key across equivalent branch and marketplace records. Geographic display labels can be localized without changing the keys. The build validates unique IDs, intact produce references, consistent city labels, usable destinations and required fields for active sellers. Unknown coverage stays explicit. Rows awaiting authorization, suspended or retired are excluded from the rendered routes and public payloads.

**Operating model.** Assign one produce editor and one sales approver at launch, with the same person allowed to fill both roles. Give the editor two small data files and a preview before publishing. Active sellers enter the general directory once authorization and destination are confirmed. They enter a crop route only when the specific listing is confirmed. An authorized seller with crop details pending can appear on the general directory with “Check produce with the seller.” If a crop stops being carried, remove the crop association. If a seller stops being authorized, suspend the listing and publish an update promptly. Agree who rechecks active listings and on what cadence. The static site reflects the latest published check, which makes a named owner and a date more useful than an availability indicator.

**Acceptance cases.** Test a crop deep link, a city fragment and the seller’s directions or marketplace destination on a slow phone with and without JavaScript. Test a store in a different city, an authorized store with no confirmed crop, an exact city-and-crop match, a marketplace requiring postcode verification and an empty crop result. Verify that a suspended listing vanishes everywhere after publishing. Check that the location control retains focus and the updated count is announced once.

## 7. Open questions for the owner

1. Which cities, branches and marketplace listings can Bhoomi Tech name on launch day, and which of the three crops is confirmed at each? Can each marketplace provide a specific listing URL and coverage information?
2. Who approves a seller as authorized, how often will they recheck its details, and who can take it down quickly if the relationship changes?
3. What real produce imagery and approved descriptions exist for the three crops, and can a new shoot be arranged if needed?
4. If a visitor finds no seller, is anyone available to answer consumer buying questions, and through which public channel?

## 8. Rough effort

| Deliverable | Effort | Main variable |
| --- | --- | --- |
| Our Produce, catalogue template and photo interaction | **M** | Approved photos and meaningful copy per crop. A new shoot is separate. |
| Where to Buy, static crop routes, locality interaction and empty states | **M** | Number and quality of branch and marketplace records. |
| Data validation, editorial preview and first listing sign-off | **M** | Consistent crop, location and coverage information. |
| Optional map after launch | **M** | Coordinate quality, provider selection and list/map accessibility checks. |
