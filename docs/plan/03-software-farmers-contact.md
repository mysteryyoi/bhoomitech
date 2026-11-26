# A3 plan: Farm Software, For Farmers, Contact

Scope: the business side of bhoomitech.in. Three pages (`/farm-software/`, `/for-farmers/`, `/contact/`), two enquiry flows, and the WhatsApp and phone channels. Nothing is sold online. The job of every page here is to start a conversation.

Convention: anything I have assumed about the product or services is tagged `[ASSUMED — confirm with owner]`. Unknown facts are `[PLACEHOLDER: …]`. Country is assumed to be India (`.in` domain, +91 phone formats, Hindi).

---

## 1. Purpose

| | Farm Software | For Farmers | Contact |
|---|---|---|---|
| Serves | Farm businesses: owners, operations heads, agronomists at commercial and greenhouse operations | Individual farmers wanting AI-enabled services for their own farm | Anyone from either audience who is ready to talk; also a safety net for wrong-door visitors |
| Visitor mindset | Evaluating a vendor, sceptical, comparing, needs proof | Wary of being sold to, wants a person they can talk to in their own language | Ready to act, wants the fastest channel |
| Page goal | Book a demo | Start a WhatsApp chat or call | Complete a form or tap a channel |
| Tone | Confident, precise, premium, data-rich | Plain, warm, practical, short lines | Calm, direct, no friction |
| Platform | Desktop and tablet first, mobile fully supported | **Mobile first, low-end Android, 4G** | Mobile and desktop equal |

The two pages deliberately feel like two different rooms in the same house. Software gets the dark "precision meets soil" cinematic treatment. For Farmers gets a lighter, daylight treatment (see section 3.1 for why).

---

## 2. Page: Farm Software (`/farm-software/`)

### 2.1 Sections in scroll order

1. **Hero.** Eyebrow: `AI FARM SOFTWARE`. Headline: **"A farm that runs itself. You run the business."** Sub: "Bhoomi Tech's AI watches every zone, decides, and acts — irrigation, climate, crop health, forecasts — around the clock." Primary CTA `Book a demo`, secondary ghost CTA `See it run ↓` (scrolls to the console). Behind the copy: faint grid lines and slow-drifting data ticks; the lime hexagon from the logo as a quiet focal shape. No video, no WebGL here, to keep the signature moment's budget.
2. **The problem.** Headline: "Farms don't fail from lack of effort. They fail from late decisions." Four short cards, one idea each: labour that can't be everywhere, water and energy wasted by schedules instead of need, disease caught after it has spread, yield you can't predict. Each card has a line icon and one sentence. Any statistic is `[PLACEHOLDER: sourced industry stat]`. No unsourced numbers.
3. **Signature: the Live Farm Console** (see 2.3). Headline above it: "Don't take our word. Run a farm for a minute."
4. **How it works: Sense → Think → Act.** Three-step diagram. Desktop: a pinned section where an SVG line draws left to right as you scroll, and each node lights as its panel appears (sensors: soil, climate, light, cameras; AI: models read the data against each crop's targets; actions: valves, vents, fans, lights, alerts to your phone). Mobile: three stacked cards, line drawn vertically with a simple reveal, no pinning. Sensor and actuator types are `[ASSUMED — confirm with owner]`, and so is whether the software integrates with existing hardware or ships with its own.
5. **What the AI automates (modules).** Six cards `[ASSUMED — confirm with owner]`:
   - Monitoring (live zone health)
   - Irrigation and fertigation
   - Climate control (vents, fans, shade)
   - Crop-health detection (camera and pattern based)
   - Yield forecasting
   - Alerts and reporting (WhatsApp and app alerts, daily summary)

   Each card: icon, one-line outcome, expandable "what it does" with 3 bullets. On hover, the card's icon animates (valve opens, leaf scan line passes). Not-yet-built modules can be tagged "Coming soon" if the owner prefers honesty to completeness.
6. **Outcomes.** Big count-up numbers on scroll, e.g. "water saved", "hours of manual checks removed", "earlier disease detection". Every number is `[PLACEHOLDER: real pilot figure + source + date]`. **Rule: no number ships unless it is measured.** If there is no data at launch, replace the block with three qualitative outcome statements and no numerals.
7. **Proof.** One featured case study card plus a logo row, all `[PLACEHOLDER]`: farm name, crop, size, problem, result, quote, photo, permission to name. If no external client exists yet, the honest and strong version is "Running on our own farm" (see question 1), with real photography of the farm. Never use stock "customer" quotes.
8. **What to expect (onboarding).** Four steps: Demo → Farm assessment → Install and train → Go live and support. Durations `[PLACEHOLDER: timelines]`. This answers the buyer's real fear: "how painful is this to adopt?"
9. **FAQ.** Accordion, 8 questions: Does it work with our existing sensors and controllers? Do we need constant internet? Which crops and farm types? How long to set up? What does it cost (and how is it priced)? Who owns our data? Is training and support included? What languages? All answers `[PLACEHOLDER]`. Add FAQ structured data (A4).
10. **Demo form + final CTA.** Full demo form embedded inline (see 4.2), with a side panel: "What happens next" (we reply within `[PLACEHOLDER: response time]`, 30-minute demo, no obligation) and the WhatsApp/phone alternatives.

### 2.2 Wireframe (desktop)

```
+----------------------------------------------------------------------+
| bhoomitech.   Produce  Where to buy  [Farm Software] For Farmers About  [Book a demo] |
+----------------------------------------------------------------------+
|  AI FARM SOFTWARE                                   . . + . .  grid  |
|  A farm that runs                                      ___           |
|  itself. You run                                      /   \  hex     |
|  the business.                                        \___/          |
|  Sub copy two lines...                                               |
|  [ Book a demo ]  See it run v                                       |
+----------------------------------------------------------------------+
|  THE PROBLEM   [labour] [water] [disease] [yield]  (4 cards)         |
+----------------------------------------------------------------------+
|  "Run a farm for a minute."                                          |
|  +------------------------------------------------------------+      |
|  | LIVE FARM CONSOLE  (simulated)       Autopilot [ON]/ off   |      |
|  | +-----------------+  ZONE B  Lettuce      24.1C  71%RH     |      |
|  | |  A    B         |  soil 38%   light 640 lx               |      |
|  | |  C    D  (plan) |  ~~sparkline~~  AI: holding 24C        |      |
|  | +-----------------+  [Heatwave][Dry spell][Leaf stress]    |      |
|  | 00--06--12--18--24  <scrubber / sun arc>   > 1x            |      |
|  | 14:02 B humidity 82% -> vents 30%  | 14:05 A valve open    |      |
|  +------------------------------------------------------------+      |
+----------------------------------------------------------------------+
|  SENSE ------------> THINK ------------> ACT     (line draws)        |
+----------------------------------------------------------------------+
|  MODULES  [monitor][irrigate][climate]                               |
|           [crop health][forecast][alerts]                            |
+----------------------------------------------------------------------+
|  OUTCOMES  big numbers (placeholders)   |  PROOF case study + logos  |
+----------------------------------------------------------------------+
|  WHAT TO EXPECT  1 -> 2 -> 3 -> 4        |  FAQ accordion            |
+----------------------------------------------------------------------+
|  BOOK A DEMO  [ form ]          |  What happens next / WhatsApp/Call |
+----------------------------------------------------------------------+
```

**Mobile differences:** the console shows one zone at a time with zone tabs A–D replacing the plan view; the readouts stack under it; the scrubber stays. How-it-works becomes three stacked cards. Hero CTA becomes full width. A slim sticky bar `Book a demo` appears after the hero scrolls away and hides when the form is in view.

### 2.3 Signature moment: the Live Farm Console

**What it is.** A simulated control room for a four-zone greenhouse, playable in under a minute. The visitor does not watch a video; they cause problems and watch the AI solve them. Then they switch the AI off and watch what happens without it. That contrast is the whole sales argument.

**On screen.**
- *Farm plan (left):* four tiles A–D in a slightly isometric SVG, labelled with the launch crops (lettuce, kale, cucumber, and a fourth marked "mixed"). Each tile has a status ring: lime = in range, amber = drifting, red = stressed. Small animated parts: vent louvres that open and close, a valve icon with water droplets moving along a pipe, a fan spinning.
- *Readouts (right):* for the selected zone (click or tap a tile): air temperature, humidity, soil moisture, light level, each with a live 60-second sparkline and a target band shaded behind it. Below, an "AI status" chip: `Holding 24°C`, `Cooling`, `Irrigating`, `Investigating`.
- *Clock (bottom):* a 24-hour scrubber with a sun/moon arc. The sim runs one day in about 30 seconds on a loop. Dragging the scrubber jumps time; light and temperature follow a daily curve, so dawn, noon heat and night cooling look right.
- *Event log:* a monospaced terminal-style feed. Lines type in as the AI acts: `14:02  Zone B  humidity 82%  →  vents 30%, fogger off`. Only decisions are logged, one line each, so it reads as intelligence rather than noise.

**What the visitor can do.**
1. **Select a zone.** Readouts and sparklines swap with a short crossfade.
2. **Inject an event** with three buttons: `Heatwave`, `Dry spell`, `Leaf stress detected`.
   - Heatwave: outside temperature ramps up. With Autopilot on, the AI opens vents, spins fans, and the zone tile pulses amber for a few seconds, then settles back to lime. The log narrates it.
   - Dry spell: soil moisture falls. The AI opens that zone's valve, droplets run along the pipe, and moisture recovers.
   - Leaf stress: an illustrative leaf image pops out of the zone with a scanning line and a bounding box labelled "possible early stress, confidence 0.87" (illustrative number). The AI logs "flagged for inspection, adjusting humidity", and an alert card slides in as a WhatsApp-style notification.
3. **Toggle Autopilot off.** The same events now push the zone out of band. The ring goes amber then red, a plain label appears ("Crop stress risk: high"), and a "no one is watching" caption fades in. No invented cost numbers. Flip Autopilot back on and the system visibly recovers. This toggle is the hero interaction.

**What is simulated.** Everything. All values come from a tiny deterministic in-browser model: each variable drifts toward a target band, a seeded noise function adds realism, events add a disturbance, and a simple proportional controller (the "AI") counteracts it when Autopilot is on. No network calls, no real data, no real model. A persistent badge reads **"Simulated demo. Numbers are illustrative."** so we never mislead a buyer. The labelled actions mirror module names, but the control logic shown must be reviewed against how the real product behaves `[ASSUMED — confirm with owner]`.

**Build notes.** SVG and DOM only, no WebGL, so the page's WebGL budget stays free for the homepage. Roughly 8–12 KB of JS, hydrated only when the console scrolls into view (Astro `client:visible`). Updates at 10 fps; the loop pauses when off-screen (IntersectionObserver) or the tab is hidden. Fully keyboard operable: tiles are buttons, the scrubber is a slider, event buttons are real buttons. The log is a polite live region, throttled to decisions only.

**Degradation.**
- *Reduced motion:* no autoplay and no looping day. A `Step +1 hour` button advances the sim. Transitions are instant and sparklines are static. The three event buttons and the Autopilot toggle still work, so the story survives.
- *Low-end phone / save-data* (`navigator.deviceMemory <= 2`, `hardwareConcurrency <= 4`, or `saveData`): one zone view only, 2 fps updates, no pipe or droplet animation, no sparkline smoothing.
- *No JS or script failure:* a server-rendered inline SVG shows a three-tab static comparison: "Normal morning", "Heatwave with AI", "Heatwave without AI". Same layout and readouts, frozen frames, with a caption. The page still tells the story, and the demo CTA sits right below.

---

## 3. Page: For Farmers (`/for-farmers/`)

### 3.1 Approach

A farmer arriving here has probably been sent a link on WhatsApp, or typed the short URL from a printed flyer. They are on a cheap Android phone, often outdoors, possibly with limited reading comfort and with Hindi (or another language) as their first language. The page must therefore:

- **Lead with the two big buttons**, not a pitch: WhatsApp and Call, above the fold, 56 px or taller, full width on mobile.
- **Use a light "daylight" theme**, not the dark cinematic one. Dark screens are hard to read in sunlight and cost more data in imagery. This needs A1's sign-off on a cream/pale-lime surface variant using the same greens and lime. The page should still look unmistakably Bhoomi Tech.
- **Use native scroll.** No Lenis smooth scroll, no pinned sections, no scroll-jacking on this page. No hover-only interactions, no carousels.
- **Be icon-led and short-line.** Body text 18 px or larger, one idea per line, big numerals for steps, every service has an icon and an audio button.
- **Be fast.** Budget: under 250 KB for first load, excluding audio and video. Inline SVG illustrations, system fonts plus a subset Devanagari font (A4 specifies), no autoplay media.
- **Offer language first.** A big `हिंदी | English` toggle in the page header (and a `[PLACEHOLDER: regional language]` option if confirmed). On a first visit, if the browser language is Hindi, show a one-line banner in Hindi: "हिंदी में देखें?". The choice persists, and the WhatsApp prefilled text follows the language. Farmer-page copy must be **translated by a human who knows farming vocabulary**, not machine translated.

### 3.2 Sections in scroll order

1. **Hero.** Headline (EN draft): **"Smarter farming help, in your language."** Hindi: "आपके खेत के लिए आसान, भरोसेमंद मदद" (to be refined by a native speaker). Sub, one line: "Talk to us. No forms needed." Two huge buttons: `WhatsApp us` (WhatsApp icon) and `Call us` (phone icon, shows the number so it can be read aloud). Under them, a small line with hours `[PLACEHOLDER: call hours]` and "We reply in Hindi and English `[PLACEHOLDER: regional language]`." Illustration: a CSS-animated SVG sunrise over rows of crops, with a slow sun arc and a few leaves swaying. Pure CSS, a few KB.
2. **Signature: "What do you need help with?"** (see 3.3).
3. **What we can help with.** Six icon cards `[ASSUMED — confirm with owner]`:
   - Water and irrigation: use less, grow more
   - Spotting crop disease early
   - Soil and fertiliser guidance
   - Polyhouse / greenhouse setup help
   - Planning what to grow and when
   - Selling your produce (via the Bhoomi Tech marketplace network)

   Each card has an icon, a 6–8 word line, a 🔊 `Listen` button and a `Ask on WhatsApp` link prefilled with that service.
4. **How it works, 4 steps** with huge numerals and icons: (1) Tell us about your farm: WhatsApp, call, or this form. (2) We understand your farm: by call, video, or a visit `[ASSUMED — confirm with owner]`. (3) We suggest a simple plan, in your language. (4) We stay in touch and help as the season goes. Each step is a single short line.
5. **What it costs.** Heading: "Clear costs. No surprises." Copy direction: the first conversation is free `[ASSUMED — confirm with owner]`; price depends on your farm and the service; we tell you before you start. All specifics `[PLACEHOLDER: pricing model]`. If pricing is not public, this section says exactly that, plainly, and invites a call.
6. **Farmers like you.** Two to three story cards `[PLACEHOLDER: farmer stories]`: photo, first name, village and district, crop, one-sentence quote in their language, and a ▶ audio/video clip. Only with written consent, and no stock photos. If none exist yet at launch, omit this section rather than fake it.
7. **Watch / listen.** A 60–90 second explainer in each language `[PLACEHOLDER: video, optional]`. Poster image only until tapped (`preload="none"`), 360p mp4 under about 2 MB, with captions. Audio-only version as a fallback.
8. **Talk to us** (form, see 4.3) with the big buttons repeated above it.
9. **Short FAQ** (4 items, icon plus short text): Do I need a smartphone or internet? What does it cost? Which crops and areas do you help? Who will I talk to? `[PLACEHOLDER: answers]`.

### 3.3 Signature moment: "Tap what you need"

A light interaction that feels premium without WebGL or heavy media, designed for a phone on 4G.

**On screen.** Below the hero, a card with a Hindi/English heading: "आपको किसमें मदद चाहिए? / What do you need help with?" Two rows of big tappable icon tiles (each at least 88×88 px):
- *Row 1, your crop:* a hand-drawn SVG icon for each of the launch crops (lettuce, kale, cucumber) plus a "something else" tile. `[PLACEHOLDER: crop list that matches the farmers' regions]`.
- *Row 2, your problem:* water, disease, soil, planning, selling.

**What moves.** Tapping a tile makes it spring up (150 ms scale and lime ring) and sprouts a small SVG plant line beside it. Once at least one problem is chosen, a reply card slides up from below with a warm sentence in the active language, the matching service card, a 🔊 `Listen` button, and a **big `Send on WhatsApp` button**. The WhatsApp text is prefilled from their choices, e.g. "नमस्ते, मेरी खीरे की फसल में पानी की समस्या है। मदद चाहिए। (bhoomitech.in)". Nothing is submitted anywhere. The visitor sends it from their own WhatsApp, so there is no form, no typing and no data collection. A `Call us instead` link sits beside it.

**Why it works.** It lets a low-literacy user "say what the problem is" in two taps with pictures, and it hands the team a pre-qualified message (crop plus problem plus language).

**Weight and degradation.** CSS transitions plus about 3 KB of vanilla JS, no library. `prefers-reduced-motion`: no spring and no sprout, just an instant selected state. No JS: the tiles become plain links to `wa.me` with a preset text per problem, so each icon is still one tap to WhatsApp. Works with the keyboard and screen readers (the tiles are real buttons in a radio-style group).

### 3.4 Wireframe (mobile first, then desktop)

```
MOBILE                          DESKTOP (centred, max ~1100px, same content)
+------------------------+      +-----------------------------------------+
| bhoomitech.  [हिंदी|EN] |      | nav ...                    [हिंदी | EN]  |
+------------------------+      +-----------------------------------------+
| Smarter farming help,  |      | Smarter farming help,    ( sunrise      |
| in your language.      |      | in your language.          SVG scene )  |
| Talk to us. No forms.  |      | [ WhatsApp us ] [ Call us ]             |
| [ WhatsApp us       ]  |      +-----------------------------------------+
| [ Call us           ]  |      | What do you need help with?             |
|  (sunrise SVG)         |      | [crop][crop][crop][other]               |
+------------------------+      | [water][disease][soil][plan][sell]      |
| What do you need?      |      | -> reply card + [Send on WhatsApp]      |
| [crop][crop]           |      +-----------------------------------------+
| [crop][other]          |      | Services (6 icon cards, 3 x 2)          |
| [water][disease]       |      | How it works  1 > 2 > 3 > 4             |
| ...                    |      | Cost | Stories | Video                    |
| (reply card)           |      | Talk-to-us form + buttons               |
+------------------------+      +-----------------------------------------+
| Services (1 col)       |
| 1 2 3 4 steps          |
| Cost / Stories / FAQ   |
| Form                   |
+------------------------+
| [WhatsApp]  [ Call ]   |  <- sticky bottom bar, hides when form in view
+------------------------+
```

---

## 4. Page: Contact (`/contact/`) and the forms

### 4.1 Page layout

1. **Header.** "Let's talk." Sub: "Tell us who you are and we'll point you to the right person."
2. **Chooser.** Two large cards, equal weight, side by side (stacked on mobile): **"I run a farm business"** → "Book a software demo", and **"I'm a farmer"** → "Talk to us about help for my farm". Selecting one reveals its form below, with the URL updated (`?for=software` or `?for=farmers`, and an anchor). Visiting `/contact/?for=farmers` opens with the farmer form already selected. Without JS, both forms are simply stacked with anchors to each.
3. **Wrong-door lines** under the chooser: "Just want to buy vegetables? → Where to buy". "Press, partnerships or something else? → `[PLACEHOLDER: general email]`".
4. **Direct channels panel**: WhatsApp (button and number), phone (tap-to-call and hours), email, address `[PLACEHOLDER: address, state]`, and response promise `[PLACEHOLDER]`. Desktop also shows a WhatsApp QR code so a visitor can move to their phone. No embedded map (weight and privacy); a plain text address with an "Open in Maps" link.

```
+-----------------------------------------------------------+
|  Let's talk.                                              |
|  [ I run a farm business ]   [ I'm a farmer ]   <- chooser |
|  Book a software demo         Talk to us                  |
+-----------------------------------------------------------+
|  FORM (selected)                    | Direct channels     |
|  fields...                          | WhatsApp [button]   |
|  [ Send ]                           | Call  +91 ...       |
|                                     | Email, address      |
|                                     | [QR - desktop only] |
+-----------------------------------------------------------+
|  Buying vegetables? -> Where to buy   Other? -> email     |
+-----------------------------------------------------------+
```

### 4.2 Flow A: Software demo

**Fields (fixed minimum, 6 visible):**
1. Your name (required)
2. Farm or company name (required)
3. Work email (required, email format)
4. Phone / WhatsApp (optional, Indian mobile format, E.164 normalisation)
5. Type of farm (required select: Greenhouse / Polyhouse / Open field / Hydroponic / Vertical / Other / Not sure)
6. Anything you'd like us to know (optional textarea, 500 characters max). Optional module checkboxes, only if the owner wants lead qualification: "What do you most want to automate?" (irrigation, climate, crop health, forecasting).

**Hidden:** `form_type=software-demo`, `source_page` (e.g. `/farm-software/` vs `/contact/`), `lang`, UTM params, honeypot, Turnstile token, and a timestamp.

**Validation.** Native HTML5 attributes first (`required`, `type=email`, `pattern` for phone), so the form validates even without JS. With JS, validate on blur and on submit with a message beside each field, in plain text with an icon (not colour alone), `aria-invalid` and `aria-describedby`, and focus moved to the first error. Block free-text URL spam: if the message contains more than 2 links, reject quietly.

**Consent text** (under the button): "By sending this, you agree that Bhoomi Tech may contact you about your enquiry. We won't share your details. Read our Privacy Notice." Link to `[PLACEHOLDER: privacy notice page]`. Confirm wording with counsel for the DPDP Act, 2023, since a notice and clear affirmative action may be needed. An unchecked required checkbox is the safer option for this B2B flow.

**Success state.** The form collapses into a confirmation panel: the B-hex mark "sprouts" (a 1.2 s SVG animation, static under reduced motion), "Thanks, [first name]. We'll be in touch within `[PLACEHOLDER: response time]`." Beneath: "Want to talk now?" with WhatsApp and Call buttons, and "Check your inbox: we've sent a confirmation" if the form service supports auto-reply. Move focus to the confirmation heading. Fire an analytics event.

**Error state.** The form stays intact (never clears). A banner above the button reads: "That didn't go through. Your details are still here. Try again, or message us on WhatsApp instead." The WhatsApp button is built live from the form values (name, farm, and type pre-filled). Separate messages for validation errors, network offline ("You seem to be offline"), a spam block, and a service failure.

### 4.3 Flow B: Farmer services

**Fields (5 visible):**
1. Your name (required)
2. Mobile number (required, 10-digit Indian mobile, `inputmode="tel"`, we assume WhatsApp unless told otherwise)
3. Village / town and district (required, one field)
4. What do you need help with? (optional, tappable icon chips from the same set as the signature moment; multi-select) plus the crop(s) you grow (optional free text or chips)
5. Best time and language to call (optional: morning / afternoon / evening; Hindi / English / `[PLACEHOLDER: regional language]`)

No email field. Many farmers don't use email, and each field costs completions. Large inputs (min 56 px height, 18 px text), and numeric keypad for phone. Labels are always visible above the field, never placeholder-only. Icons next to labels. Labels and messages in the chosen language. Hidden fields as in Flow A with `form_type=farmer-services`.

**Validation.** Gentle and forgiving: accept `+91`, spaces and dashes, then normalise. Errors are short and spoken like a person: "Please check the number. It should have 10 digits." No jargon.

**Consent text** (short, translated): "By sending, you agree that Bhoomi Tech may call or WhatsApp you about this. We won't share your details." Link to the privacy notice.

**Success state.** "Thank you, [name]. We'll call or WhatsApp you `[PLACEHOLDER: timing]`." A big `Chat on WhatsApp now` button and a 🔊 audio confirmation (optional, loaded on tap). The same sprout animation is reduced to a simple tick on low-end devices.

**Error state.** Plain words with an icon: "Couldn't send. Please try again, or tap here to WhatsApp us." The WhatsApp button is prefilled from what they typed (name, village, need). Because the visitor may be on weak signal, the form retries once automatically after 3 seconds before showing the error.

### 4.4 Spam protection

- **Honeypot** on both forms: a field with a plausible name (`company_website`), moved off-screen with CSS (not `display:none`), `tabindex="-1"`, `aria-hidden`, `autocomplete="off"`. Any value means a silent fake-success and no send.
- **Time trap** (JS only): reject submits under 3 seconds from the page load, using a signed hidden timestamp if the service supports it.
- **Cloudflare Turnstile** (or equivalent) on the **software form**, in managed mode. Free, privacy-respecting, and no image puzzles. On the **farmer form**, use the honeypot, the time trap and the service's own filtering only, and Turnstile only in non-interactive mode if the service supports a graceful fallback. Reason: a challenge widget that fails on an old Android WebView would lose exactly the audience that matters most, and a lost lead is worse than a spam message.
- Service-side rate limiting and spam filtering (A4 to confirm the feature set).
- No reCAPTCHA image challenges.

### 4.5 Where enquiries go

- A third-party form-backend (Agent 4 picks: Formspree, Web3Forms, Getform, Basin, etc.). My requirements for the choice: accepts a plain HTML `POST`; also returns JSON for `fetch`; supports a redirect URL for the no-JS path; Turnstile or hCaptcha support; **two form IDs** with separate recipient inboxes (sales vs farmer outreach), or at least a tagged subject (`[DEMO]` / `[FARMER]`); auto-reply support; a Google Sheet or webhook export; a free tier that covers expected volume; and data stored in or compliant for India `[PLACEHOLDER: owner/legal preference]`.
- **Recipient inboxes:** `[PLACEHOLDER: sales inbox]` and `[PLACEHOLDER: farmer-support inbox]`.
- **Backup log:** every submission also appended to a Google Sheet via the service's integration, so a lead is never lost to a missed email. The owner should be able to read leads in a sheet.
- **Plain-text email content** for the receiver: the form type, all fields, source page, language, and time, formatted for quick reading on a phone.
- **Analytics events** (privacy-friendly, A4): `cta_demo_click`, `form_start`, `form_submit_success`, `form_error`, `whatsapp_click` (with page and context), `call_click`. This tells the owner which door and which page produce leads.

### 4.6 If JavaScript fails

Both forms are real `<form method="post" action="…">` elements. Without JS they post directly to the service and the service redirects to static pages `/thanks/demo/` and `/thanks/farmers/` (which carry WhatsApp and call buttons too). HTML5 validation still runs. The honeypot still works. Turnstile and the time trap are lost in this case, so the service's server-side filter is the backstop. Under each form, a `noscript`-safe line: "Prefer to write? Email us at `[PLACEHOLDER]`." The WhatsApp and call buttons are plain `wa.me` and `tel:` links and need no JS.

### 4.7 WhatsApp deep links and click-to-call

- Format: `https://wa.me/91XXXXXXXXXX?text=<url-encoded message>` with the number `[PLACEHOLDER: WhatsApp business number]`. The number and the message templates live in a single site-config data file so one edit updates every button.
- Click-to-call: `tel:+91XXXXXXXXXX`, with the number printed visibly beside the button so it can be read out or copied. On desktop (no calling) the `tel:` link is still shown but the number text is more prominent.
- Prefilled messages, by origin (English shown; Hindi versions needed):
  - Software hero or CTA: "Hi Bhoomi Tech, I'd like to see a demo of your farm software. (from bhoomitech.in/farm-software)"
  - Farmers hero: "Hi Bhoomi Tech, I'm a farmer and I'd like help with my farm. (from bhoomitech.in/for-farmers)"
  - Farmers icon picker: includes the chosen crop and problem.
  - Form error fallback: includes the typed name, village or farm, and need.
  - Contact page: a generic hello with the source tag.
- The `(from …)` tag lets the receiver know the origin, and the receiver sees Hindi or English as the visitor chose.
- Recommend WhatsApp Business `[PLACEHOLDER: does the owner use WhatsApp Business?]` with an away message and quick replies; a named person behind the number is strongly preferred.

### 4.8 Embedded or Contact-only?

**Both, with one source of truth.** The same two form components are used everywhere; only the surrounding page differs.
- **Software page:** the full demo form is embedded at the bottom. A B2B buyer who has just seen the console should not navigate away to act.
- **Farmers page:** the short farmer form is embedded after the main buttons, but it is the *third* option, since WhatsApp and call convert better for this audience.
- **Contact page:** both forms plus the chooser, serving as the destination for every other link.
- A hidden `source_page` field tells the owner where each lead originated.

---

## 5. Conversion path

| Entry point | Audience | Goes to | Action |
|---|---|---|---|
| Header primary button `Book a demo` (desktop sitewide; mobile menu bottom) | Business | `/farm-software/#demo` | Demo form |
| Homepage door 2: "Run a farm business?" | Business | `/farm-software/` | Console, then demo form |
| Homepage door 3: "Farmer? Get help for your farm" | Farmer | `/for-farmers/` | WhatsApp, call, icon picker |
| Software hero CTA and sticky mobile CTA | Business | Demo form on page | Submit |
| Console end-state caption: "Like what you saw? Book a demo" | Business | Demo form | Submit |
| Farmers hero and sticky bar | Farmer | WhatsApp or `tel:` | One tap |
| Farmer icon picker | Farmer | WhatsApp prefilled | Send |
| Footer (every page) | Both | Contact (two links: "Book a demo", "Talk to us") and WhatsApp | Varies |
| Short URLs and QR codes: `bhoomitech.in/farmers` and `/demo` | Offline, print, WhatsApp forwards | Farmers page, Demo form | Varies |
| Contact chooser | Either | Matching form | Submit |
| Where to Buy / Produce footer line: "Grower? Run a farm? See our software" | Misdirected | Software page | |

**Keeping the right audience on the right form:**
1. **Audience-labelled nav and CTAs.** "Farm Software" always pairs with "Book a demo". "For Farmers" always pairs with "Talk to us". The words never swap.
2. **Each form states who it is for** in its first line: "For farm businesses and greenhouse operators." / "For farmers."
3. **Wrong-door link inside each form:** "Are you a farmer? Talk to us here →" and "Running a farm business? Book a demo →".
4. **Different visual rooms:** the software page is dark and cinematic, the farmer page is light and warm. The visitor feels which one they are in.
5. **Different fields:** the demo form asks for company and email, the farmer form asks for village and mobile, so a mismatched visitor stops quickly.
6. **Consumer catch:** the Contact page's "Buying vegetables?" line routes households to Where to Buy, so they don't clog either inbox.
7. **Floating WhatsApp button** only on For Farmers, Contact and About; not sitewide, so that consumer and B2B pages stay clean.

---

## 6. How these pages link into the rest of the site

- **Nav (order):** Our Produce · Where to Buy · **Farm Software** · **For Farmers** · About · Contact, plus a lime `Book a demo` button. Mobile menu shows the same, with the WhatsApp and Call buttons at the foot of the menu.
- **Homepage doors** (A1): three doors at the end of the scroll journey. Door 2 → Farm Software, door 3 → For Farmers, door 1 → Our Produce / Where to Buy. Copy for my two doors is above; A1 owns the visual treatment. A homepage teaser of the console (a 6-second looping, static-first preview) is a good "hook" for door 2, and I can supply the SVG.
- **Cross-links:**
  - Software → For Farmers: "Own a smaller farm? You don't need a full system. See farmer services."
  - For Farmers → Software: "Run a larger or commercial farm? See the farm software."
  - Software → About: "Built by farmers and engineers" `[PLACEHOLDER: team]` and, if true, Software → Our Produce: "The system that grows the lettuce on your plate."
  - For Farmers → Where to Buy / marketplace line `[ASSUMED]`: "Sell your produce through our network".
  - Contact → Where to Buy (consumer catch).
- **Footer:** both CTAs, WhatsApp, phone, email, privacy notice link, language toggle.
- **Shared components I use or need:** Button (primary, ghost, WhatsApp, Call), FormField, EnquiryForm (two variants), Accordion, SectionHeader, ContactChannelCard, StickyActionBar, LangSwitch, SimulatedBadge, SproutSuccess (the form-success animation, built from A1's mark).

---

## 7. Content and assets needed from Bhoomi Tech

- [ ] Confirmed software facts: the actual module list, what hardware it needs, how it is deployed, and what is in or out of v1
- [ ] Screenshots or screen recordings of the real product, if they exist (they would replace or sit beside the simulated console)
- [ ] At least one real result: pilot farm, own-farm usage, or case study, with numbers and permission to name
- [ ] The software price model, and whether it is shown publicly
- [ ] Demo format (live video call, on-site, a recorded tour) and the length and who delivers it
- [ ] Confirmed farmer services list, price model, geography served, and whether visits happen
- [ ] WhatsApp number (and whether it is Business), phone number with hours, sales and support inbox addresses, a business address
- [ ] Response-time promises for both audiences
- [ ] Languages: Hindi confirmed? Which regional language(s)? A native translator or reviewer who understands farming
- [ ] Farmer stories with written consent: photo, first name, village, crop, a short recorded quote
- [ ] Voice-over or short explainer video in each language (optional but high impact)
- [ ] Real photography or video of the farm, the team and the crops
- [ ] Privacy notice text (needs legal review for the DPDP Act, 2023)
- [ ] A person named as the face behind the WhatsApp and phone
- [ ] Whether the owner wants a Google Sheet lead log

---

## 8. Dependencies

- **A1 (brand and home):** a light "daylight" surface variant for For Farmers and Contact; motion tokens and easing; the B-hex mark for the sprout animation; button styles; the homepage doors; confirmation that Lenis can be off on For Farmers.
- **A2 (consumer):** the Contact "Buying vegetables?" and the footer link to Where to Buy; whether any "Grower?" link appears on produce pages.
- **A4 (tech):** the form service and how it handles two form IDs, Turnstile and no-JS redirects; i18n structure (`/hi/…` vs a client toggle) and the Devanagari font subset; site-config data file for phone, WhatsApp and message templates; analytics; Astro island hydration for the console and the picker; image and audio delivery; accessibility test plan for forms and the console; schema markup (FAQ, Organization contact points).

---

## 9. Open questions for the owner (most important first)

1. **What does the software really do today, and is it running anywhere, including on Bhoomi Tech's own farm?** This decides the module list, whether we can show real screenshots, and what proof section we can honestly publish. If it runs on your own farm, that becomes our strongest proof.
2. **What exactly do you offer farmers, how do you charge, and where?** (For example advice by phone, site visits, setup of equipment, or marketplace access; free or paid; which districts or states.) This sets the service cards, the cost section and the form's location field.
3. **Which languages, and who answers WhatsApp and the phone?** Hindi plus which regional language, and a named person or team with working hours. A farmer messaging in Hindi who gets an English reply is a lost lead.
4. Is a demo a live video call, an on-site visit or a recorded tour, and should the software price be public, "from X", or "contact us"?
5. Can we use a lighter "daylight" look for the farmer page, even though the main brand direction is dark?
6. Do you want every lead also logged to a Google Sheet, and should sales and farmer enquiries go to different inboxes?
7. Is there any legal or data-residency requirement (DPDP Act) that limits which form service we can use?

---

## 10. Rough effort

| Item | Size | Notes |
|---|---|---|
| Farm Software page (excluding console) | M | Mostly sections and motion; content placeholders keep it light |
| Live Farm Console | L | Sim model, SVG art, interaction, fallbacks, a11y, low-end tuning |
| For Farmers page (excluding picker) | M | Light but needs i18n, audio, and careful device testing |
| "Tap what you need" picker | S–M | Small code, but the icon set and Hindi copy take time |
| Contact page and chooser | S–M | |
| Enquiry forms (both flows, validation, states, no-JS, spam) | M | One component, two variants, plus wiring and testing on real devices |
| WhatsApp and call system and site config | S | |
| Success sprout animation | S | |
| Translation, voice-over, farmer stories | M (owner-dependent) | Longest lead time, so start early |
| Device and a11y QA on a low-end Android over throttled 4G | M | Non-negotiable for the farmer page and forms |
