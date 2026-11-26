# Bhoomi Tech technical architecture

Independent planning proposal · 26 November 2026 · C4, `gpt-6.2-sol`

## 1. Purpose

Deliver the seed-to-fork story, a browseable authorized-seller directory and two enquiry paths from a static site. A household should find a seller, a software buyer should request a demo, and a farmer should be able to enquire or call on a budget Android phone. Keep content and actions in the HTML and invest the interaction budget in the homepage and the software demonstration.

### Stack and hosting

- **Astro static output, TypeScript and component-scoped CSS.** Compile seven main routes, crop-specific seller pages and two catalogue files into `dist/`. Use CSS custom properties for shared tokens and build-time responsive image generation. Use small route-local scripts for menus, filtering and forms. Astro renders the page shell and content ahead of time and supports selectively loading interactive components. [Astro islands](https://docs.astro.build/en/concepts/islands/) · [Astro images](https://docs.astro.build/en/guides/images/)
- **Native scrolling, GSAP + ScrollTrigger for one authored sequence, CSS for short transitions.** Start with native scrolling and skip Lenis at launch. This preserves direct anchor jumps and keeps the performance and keyboard test surface small. Add one dynamically imported Three.js scene if the prototype meets its budget. Use HTML and CSS for the software demo. [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) · [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html)
- **GitHub Pages is the requested host.** The brief identifies `mysteryyoi/bhoomitech`, `bhoomitech.in` and a `main` → `dist/` deployment. GitHub restricts use of Pages to run an online business and use primarily directed at facilitating commercial transactions or providing SaaS. Confirm the intended use with GitHub before production, describing the seller referrals and demo lead generation as well as the absence of checkout. If the intended use is ineligible or remains unresolved, ask Rohit to approve an alternative static host. Cloudflare Pages is one candidate that documents serving the Astro build output. [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) · [Cloudflare Pages for Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

```text
 [Produce + seller files]   [Page copy + media]   [Contact config]
             \                      |                    /
              +----------> Astro build + CI <-----------+
                                 |
                      versioned dist/ artifact
                                 |
                     approved HTTPS static host
                                 |
          HTML + CSS + images ----+---- route-local enhancements
                                 |
       Seller destinations   Phone/WhatsApp   Two form POST endpoints
                                                |
                                         Dashboard + inboxes
```

## 2. Page-by-page delivery contracts

Paths are proposed public URLs. The shell owns canonical URLs, navigation, skip link, footer and locale links. Each page ships its primary copy and links in semantic HTML. Content owners supply final claims and assets.

| Route | Scroll order and copy direction | Delivery contract |
|---|---|---|
| `/` | Seed-to-fork proposition → seed, farm, harvest, sellers, plate → household, farm software and farmer entry points | Render all five stages and all three links at build time. Repeat or surface audience links near the first viewport so visitors can skip the story. Load the scroll scene only on this page. |
| `/our-produce/` | What we grow → lettuce, kale and cucumbers → seller handoff | Data-driven cards with crop anchors, consistent photos and approved descriptions. Each “Find a seller” link opens the matching static crop directory. |
| `/where-to-buy/` | Explain authorized sellers → city/area and produce controls → grouped listings → missing area state | Pre-render grouped listings and city jump links. Show store, area, verified produce associations and an approved destination per listing. Enhance with URL-backed filters and a results count. Keep general browsing and crop links available without JavaScript. |
| `/where-to-buy/produce/<crop>/` | Selected crop → verified seller listings grouped by city → all sellers | Reuse the directory template with the crop as a build-time input and keep city fragments stable. For a published crop without a verified association, show an honest empty state and link to the general directory. Authorization and association do not establish current stock. |
| `/farm-software/` | Explain the operational problem → verified capabilities → simulation → demo enquiry | Render the approved benefits and sample scenario as text. Load the simulation on interaction. Link directly to `/contact/#software-demo`. |
| `/for-farmers/` | State the help offered → verified services and coverage → enquiry options | Prioritize a clear WhatsApp or call link and `/contact/#farmer-enquiry`. Keep content and CTAs available without images, forms JavaScript or a chat widget. |
| `/about/` | Company story → what seed-to-fork means in practice → verified people/operations → next action | Use approved captions and photos. Publish only supported statements about growing methods, partners and the team. |
| `/contact/` | Choose an enquiry → software and farmer forms → phone/WhatsApp and privacy information | One reusable form layout with two provider endpoint IDs and distinct anchors. Keep contact alternatives visible alongside the forms, including when requests fail. |

Also generate `/privacy/`, a host-compatible `404.html`, and confirmation routes if supported by the vendor plan. Confirmation pages are `noindex` and outside the sitemap. Render page-specific title, description, canonical URL and social preview. Generate a sitemap and `robots.txt` for the canonical domain. Put verified Organization JSON-LD on Home, exclude unconfirmed addresses, and validate against visible copy. Seller locations are the sellers’ locations, with Bhoomi Tech identified separately. [Google technical SEO](https://developers.google.com/search/docs/fundamentals/get-started) · [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization)

## 3. Desktop wireframes and mobile behavior

Bracketed component names represent shared blocks. Rows follow reading order.

```text
HOME /                            PRODUCE /our-produce/
[logo] [nav] [enquire]            [logo] [nav] [enquire]
[seed-to-fork H1] | [poster]      [what we grow + seller note]
[produce] [software] [farmers]   [lettuce] [kale] [cucumber]
[5 story stages] | [scene]       [find sellers] per card
[three audience links]           [all sellers] [footer]
[footer]

WHERE /where-to-buy/              SOFTWARE /farm-software/
[logo] [nav] [enquire]            [logo] [nav] [enquire]
[where to buy + explanation]     [software promise] | [demo CTA]
[filters / cities] | [results]   [verified capabilities]
                   | [city list] [sample controls] | [sample output]
[empty state / footer]           [book a demo] [footer]

FARMERS /for-farmers/             ABOUT /about/
[logo] [nav] [enquire]            [logo] [nav] [enquire]
[service summary] | [image]      [company H1] | [approved photo]
[WhatsApp] [Call] [Enquire]      [story] [seed-to-fork explainer]
[services] [coverage]            [verified people / operations]
[how to enquire] [footer]        [next action] [footer]

CONTACT /contact/
[logo] [nav] [enquire]
[choose software demo or farmer enquiry] | [WhatsApp / phone]
[software form] [farmer form]             | [privacy summary]
[inline status for the submitted form]    | [privacy link]
[footer]

CROP DIRECTORY /where-to-buy/produce/<crop>/
[shared header] [crop title] [all sellers link]
[city jumps] | [verified crop listings, or empty state]
[footer]

PRIVACY                  CONFIRMATION               404
[shared header]          [shared header]            [shared header]
[what is collected]      [submission received]     [page unavailable]
[how it is handled]      [approved next step]      [back to main routes]
[privacy contact]        [back to site]             [footer]
[footer]                 [footer]
```

On mobile, Home puts copy and audience links before the poster and stacks the chapters. Produce stacks cards. The directory places filters above results with city jumps. Software puts the demonstration below the verified explanation and keeps its CTA before the demo. Farmers puts contact before the image. About stacks photo and captions in reading order. Contact presents both anchor choices and the short contact alternatives up top, then stacks complete forms. Privacy, confirmation and 404 use the shell with a single text column and a clear way back.

## 4. Signature moments and engineering limits

1. **A lettuce seed becomes a crop.** Keep the seed-to-fork story in the HTML chapters and stills. When a visitor activates the optional desktop macro view, load the scene after the hero paints. As seed and growing chapters cross viewport markers, scrub the seed, roots and leaves through authored poses. Later chapters pair static harvest, seller and plate imagery with the corresponding text. Keep the same reserved aspect ratio while the poster becomes the canvas. Render on scroll or resize, stop work offscreen or in hidden tabs, and release GPU resources when leaving the page. Reduced motion displays the chapter stills immediately. Small-screen, data-saving and slow-network visits use the stills and any lightweight CSS treatments allowed by the motion preference. WebGL 2 failure, context loss and load errors leave the poster visible. [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html) · [MDN reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)
2. **A farm decision with a visible outcome.** A native button selects an approved sample scenario. Replace the dashboard’s annotated state and describe the sample input, response and operator action in HTML. A brief highlight directs attention to the changed row. Keep “Illustrative simulation” visible and mark sample data as illustrative. Reduced motion switches states instantly. Budget Android and no-JavaScript visitors see adjacent static states or a short before/after storyboard. The first sample and demo enquiry link render before any script.

**Performance tiers.** Tier 0 is working HTML/CSS with responsive poster images, native links and forms. Tier 1 uses local scripts for filters, form feedback and sample controls, with no GPU dependency. Tier 2 adds the homepage scene on larger fine-pointer viewports after an explicit activation, subject to motion preference, Save-Data/slow-connection signals when available and WebGL 2 support. Treat connection hints as optional and drop to stills if the scene misses its frame budget. [MDN Save-Data](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/saveData)

**Proposed launch budgets.** Use transfer sizes of a cold load at a 390px viewport, measured through the initial viewport settled state before deferred features run. Cap Home at **320 KiB** and other main routes at **240 KiB** for HTML, CSS, JS, fonts, analytics and initial images combined. Cap initial JS at **35 KiB** per route, including analytics. Cap the separate desktop scene payload at **900 KiB** including renderer, scene code and assets. Encode hero imagery as responsive AVIF/WebP with a fallback, reserve dimensions for media, preload only critical assets, and lazy-load lower-page media. Keep the scene to one canvas and check that desktop frame times stay within **33 ms at p95** through the sequence on a representative integrated-GPU laptop. If it misses the budget, simplify meshes and textures or ship the chapter stills. Target field p75 mobile **LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1**. Use a consistent mid/low-end Android profile with a documented 4G throttle for prelaunch LCP/CLS and scripted interaction timing for regressions. Assess field INP once enough real-user data exists. [Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds)

## 5. Content and assets needed from Bhoomi Tech

- [ ] `[PLACEHOLDER: launch cities/areas, service regions and confirmed language priorities]`.
- [ ] `[PLACEHOLDER: approved produce names, descriptions and photos, and verified authorized seller names, addresses, areas, links and produce associations]`.
- [ ] `[PLACEHOLDER: software capabilities, screenshots and one approved simulation scenario]`, plus `[PLACEHOLDER: farmer services and coverage]`.
- [ ] `[PLACEHOLDER: company story, team details, growing method and usable farm, produce and team imagery]`. Receive captions, usage rights and approved attributions. Agree on a visually honest illustration fallback for unavailable photos.
- [ ] `[PLACEHOLDER: published phone and WhatsApp, two monitored inboxes, owners, retention policy, privacy wording and provider approval]`.

## 6. Dependencies and release operations

**Shared data and editing.** Use versioned `produce.json` and `sellers.json`, validated as build-time Astro content collections. Produce records need stable IDs, slugs, display names, approved copy, imagery and publication state. Seller records need stable IDs, authorization/publication state, seller type, city/area keys, displayed address, approved destination, produce IDs when verified and a last-checked date. Build checks fail on duplicate IDs, dangling references and invalid links. Validate crop directory links against generated slugs, and exclude unverified or unpublished associations. The directory describes approved sellers and crop listings and leaves current stock to the seller. Keep translations in locale dictionaries or message-specific fields and share stable keys for joins. Git-backed edits with a preview and review are the initial CMS. Revisit an editor UI if the data owner needs one. [Astro content collections](https://docs.astro.build/en/guides/content-collections/)

**Enquiry service.** Shortlist Formspree with separate public form IDs, notification destinations and test/production settings. Use standard HTML POST as the baseline. Enhance with provider-supported AJAX, field-level feedback, an announced error summary and a pending state that prevents double-clicks. Confirm submission and clear fields only after provider acceptance. A timeout means delivery is unknown. Preserve fields in-page, state the uncertainty, avoid automatic resubmission and keep call/WhatsApp available. Test native POST and the vendor error page or browser back path. The vendor hosts the standard no-JavaScript success page. A branded native confirmation depends on an approved plan with custom redirects. Verify provider dashboard records and the destination inboxes. Assign an owner to review spam and quota alerts. Formspree can retain over-limit enquiries without emailing them, so successful submission and notification need separate checks. Review permitted origin controls and their referrer dependency in privacy browsers. Collect the minimum contact and enquiry fields, set dashboard permissions and retention with the owner, and keep personal values out of URLs, analytics and local storage. [Formspree AJAX](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/) · [Native redirect](https://help.formspree.io/articles/form-and-project-settings/thank-you-redirect) · [Domain restrictions](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain/) · [Quota handling](https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions)

**Languages.** Use English at the root as a planning default. Confirm Hindi and regional priorities with the team, including who can answer enquiries in each language. Add translated routes under locale prefixes, for example `/hi/for-farmers/` if Hindi is selected. Localize navigation, accessible labels, form errors, confirmation, privacy copy and metadata together. Verify the vendor's native confirmation languages. If an approved locale needs its own no-JavaScript confirmation, validate a shared multilingual return page or localized endpoint configuration with the approved plan. Add an explicit language switch for approved translations, accurate `lang`, self-canonicals and reciprocal `hreflang` for published equivalents. Check script shaping, text expansion and real-phone legibility. [Astro i18n](https://docs.astro.build/en/guides/internationalization/) · [Google localized pages](https://developers.google.com/search/docs/specialty/international/localized-versions)

**Accessibility and QA.** Set WCAG 2.2 AA as the release target. Gate on visible focus clear of sticky UI, keyboard navigation, contrast, usable form errors, 320 CSS px reflow and adequately sized targets. Aim for 44 CSS px touch controls on mobile. Test axe and Playwright, then manually run the three journeys in TalkBack with Android Chrome, iOS Safari with VoiceOver and desktop keyboard navigation. Exercise no JS, reduced motion, slow 4G, blocked analytics, GPU loss, failed provider requests and missing seller results. Verify phone, WhatsApp and seller destinations on a physical phone. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

**Analytics.** Propose Plausible after owner approval. Count seller CTA clicks, call clicks, WhatsApp clicks and provider-accepted enquiries with distinct event names. Compare enquiry counts with provider records, which also cover native POSTs and blocked analytics. Use fixed event names, omit field values and personal data, and avoid automatic capture of full external destination URLs. Confirm that blocking analytics never blocks navigation or submission. [Plausible custom events](https://plausible.io/docs/custom-event-goals) · [Plausible data guidance](https://plausible.io/docs/custom-props)

**Deploy and rollback.** Build from a pinned toolchain and lockfile in PR checks. Test a private preview, or local build for unpublished material, with test form IDs. Once hosting is approved, publish the verified `dist/` artifact from `main`, serialize production deploys and retain the last known-good artifact and source revision. On Pages, use its official artifact workflow. Set Astro `site` to `https://bhoomitech.in` at the root, manage the custom domain in Pages settings and DNS, and verify HTTPS and apex/subdomain behavior. Smoke test deep links, sitemap, assets, 404 and both form inboxes before sign-off. If production fails, redeploy the retained good build or rebuild its known-good revision, then rerun smoke tests. Record and restore form-provider settings independently when they caused the change. [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) · [GitHub domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) · [Astro Pages deployment](https://docs.astro.build/en/guides/deploy/github/)

## 7. Open owner questions

1. Who can confirm the intended commercial use with GitHub, and would you approve another static host if Pages cannot be cleared?
2. Which first market and seller listings can you verify, which languages must work on day one, and who will review those translations and reply to those leads?
3. Which inboxes and phone/WhatsApp contacts will be staffed, what may each form collect, and which provider and retention period can the company approve?
4. Which imagery, software claims and farm scenarios can we publish? Those determine the rendering assets and what the interactive software sample can represent.

## 8. Rough effort and phases

| Phase | Features and effort | Exit condition |
|---|---|---|
| Foundations | Shared shell/data model/CI **M**. Hosting and form proof **M**. | Confirm launch host, build a reproducible artifact, record no-JS and AJAX results against both test inboxes. |
| Core site | Home baseline **M**, Produce **M**, Where to Buy **M**, Software baseline **M**, For Farmers **S**, About **S**, Contact **M**. SEO, privacy and operational routes **S**. | Verify all three no-JS journeys, approve public content, confirm contact ownership and meet mobile budgets. |
| Interaction and language | Home scene **L**, software sample **M**, each fully reviewed locale **M**. | Pass motion/low-end fallback, accessibility, language and field-readiness checks. |
| Acceptance and release | Cross-device QA, production smoke tests and rollback rehearsal **M**. | Recover the previous artifact in rehearsal and receive a real test submission in each production inbox. |
