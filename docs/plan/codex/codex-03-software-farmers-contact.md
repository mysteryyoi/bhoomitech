# Bhoomi Tech website | Farm Software, For Farmers and Contact

Planning owner C3 · Model gpt-6.2-sol · 26 November 2026  
Return file `B:/bhoomi tech website/codex-planning-2026-11-26/agents/codex-03-software-farmers-contact.md`  
Inputs · Shared Bhoomi Tech brief and independent Codex assignment

## 1. Purpose

**Farm Software** helps a farm business understand the idea behind AI farm automation and decide whether to request a demo. The interactive farm view shows a complete decision, from a reading to the next observation. A distinct product section presents only owner-approved capabilities and evidence.

**For Farmers** helps someone on a farm explain what they need and start a conversation in as few steps as possible. The launch priority is finding the right contact route on an affordable Android phone with limited data. WhatsApp takes the first position, with call and form links close by.

**Contact** gives the software buyer and the farmer separate forms with clear fields, routing and delivery status. Each audience page links to the corresponding form. Authorized seller enquiries from households continue to Where to Buy.

## 2. Page-by-page breakdown

### Farm Software

1. **Hero.** Try “See how a farm decision takes shape.” The short supporting line introduces Bhoomi Tech’s AI farm automation software for farm businesses. Primary action “Request a software demo.” Secondary action “Try the farm simulation.” Pair the headline with a still of the schematic plot and a visible “Interactive simulation · fictional data” caption. This plot signals the practical work of a farm and gives the next section a recognisable visual.
2. **Simulated live farm dashboard.** Use one fictional plot and one scenario at launch. A top-down map shows the plot, a small field legend and a selected zone. A parallel decision log has four stages, “Reading received,” “Action proposed,” “Review recorded” and “Next reading.” Start from a stable overview with “Run simulation,” “Next step” and a visible step label. The visitor can read each card manually or play one finite sequence. Pause keeps the current event visible. Replay resets the plot and log together. The dashboard shows locally authored fixture data, with fabricated readings expressed as qualitative states rather than invented company statistics. The example below requires owner approval before publication.
   - In the fictional irrigation scenario, “Below the example target” appears for the selected zone. Its log explains the observation that led to a suggested watering step.
   - The proposal says “Watering suggested” and gives the simple reason. An example review records a decision within the scenario. The panel then says “Waiting for the next reading.”
   - The final example reading says “Within example target.” The sidebar explains that the next reading is the evidence in this specific sample. The dashboard makes no promise about yield, water savings, timing, actual thresholds or autonomous execution.
   - Keep the simulation caption by its title and present when its subject is visible. Label any review as part of the example and accompany the experience with “This exercise uses fictional readings and decisions.” Reserve company product screenshots for their own explicitly titled area.
3. **What the software does.** Give each approved capability a job, input, output and operator role. Lead with “[PLACEHOLDER: approved problem statement and farm software capability list].” Use “[PLACEHOLDER: approved screenshot with redacted farm and customer data]” and caption what an operator actually sees. If capabilities are available before screenshots, use the approved descriptions as text. Add “[PLACEHOLDER: rollout model, farm compatibility and published pricing or enquiry guidance]” only after the owner confirms what may be published.
4. **Request a demo.** Reuse the primary action with a short line describing what happens after an enquiry once the follow-up process is confirmed. A “Looking for help with your own farm?” link opens For Farmers.

### For Farmers

1. **Hero and action.** Try “What would you like help with on your farm?” Follow with “Tell us what you grow and where you need help.” Place “Message us on WhatsApp” first, then “Call Bhoomi Tech” and “Send a farmer enquiry.” Render the first screen from static text and controls. On small screens it should load before any photography. Offer approved language links near the title, use human-reviewed translations and write actions in the language active on the page. Initial planning assumes India pending “[PLACEHOLDER: launch geography, languages and support coverage].”
2. **Services in plain language.** Use “[PLACEHOLDER: confirmed farmer services and what each includes].” For each approved service, explain the situation it addresses, what the farmer provides and what Bhoomi Tech does. Only introduce AI where it directly helps explain the service. Use verified photos if available and credit actual farms only with permission.
3. **Start the conversation.** Show a short preparation prompt with optional information, such as crop or farming setup, area, and the help they’re seeking. Copy idea “Hello Bhoomi Tech, I’d like help with my farm.” WhatsApp opens via the approved public link, with that generic draft if verified on target devices. The farmer can edit it and choose whether to send there. Give a tap-to-call link and a plainly visible farmer enquiry link in this same section. Keep a full visible business phone number after it is supplied so someone can dial manually.
4. **Coverage and response.** Add “[PLACEHOLDER: supported districts or service areas, languages, support hours and response expectation]” only when confirmed. Give these compact lines their own place above the last call to action so a farmer knows whether the conversation is relevant.

### Contact

1. **Choose the reason.** Headline “How can we help?” Follow with visible links to “Request a software demo” and “Ask about farmer services.” Use one route with stable anchors `#software-enquiry` and `#farmer-enquiry`. Deep links land directly on the relevant heading. Both forms render in document order and can be reached with a standard anchor, keyboard or screen reader. The Contact overview also links to the approved WhatsApp, phone and authorized seller page.
2. **Software form.** Proposed required fields are name, work email and the task they want to discuss. Business or farm name and phone are optional. “Request a demo” submits to the software inbox. The prompt asks the visitor to describe the operation they want to discuss and avoids promising any particular automation capability.
3. **Farmer services form.** Proposed required fields are name, callback phone and area or district. “What would you like help with?” is optional if the caller prefers to explain by phone. Crop or setup may be mentioned inside the optional field. Use a telephone keyboard without forcing formatting or a country code until geography is approved. “Send farmer enquiry” submits to the farmer inbox.
4. **Delivery and alternatives.** Both forms use the external form service selected by architecture. Create separate destinations and test routing for each. Keep a short, approved data-use note and privacy link next to Submit. Use a service that supports validated submissions, spam controls, delivery confirmation and a non-JavaScript hosted or native submission path with clear status. Publish contact channel links after the owner supplies and verifies them. Never place form details in a URL, analytics event or the prefilled WhatsApp message.

| State | What the visitor sees and can do |
| --- | --- |
| Missing or invalid information | Inline error by the field, summary with focus for multiple errors, and all previously entered values available for correction. |
| Sending | “Sending…” with repeat clicks paused while this request is in flight. Keep contact alternatives usable. |
| Accepted by the form service | “Your enquiry was submitted.” Provide a reference only when available. Add an expected reply window only after the team commits to one. |
| Service confirms rejection | “We couldn’t submit your enquiry.” Preserve the entered fields for edits or retry. Keep WhatsApp and phone visible. |
| Timeout or interrupted connection | “We couldn’t confirm whether your enquiry was received.” Keep the fields. Explain that resending may create another enquiry, offer the alternative channels and allow a deliberate retry. Use a provider-supported idempotency key on retry if available and verified. |

## 3. Desktop wireframes and mobile behaviour

### Farm Software

```text
+------------------------------------------------------------------------------+
| Bhoomi Tech                                    Main navigation | Request demo |
|------------------------------------------------------------------------------|
| See how a farm decision takes shape.        | Still of the schematic plot     |
| [Request a software demo] [Try simulation]  | Interactive simulation          |
|------------------------------------------------------------------------------|
| Interactive simulation - fictional data                                     |
| [Run simulation] [Next step]                               Step 1 of 4       |
| Plot + selected zone                        | What the example system saw     |
| Plot status + plain text legend              | Decision log / next reading      |
|------------------------------------------------------------------------------|
| Verified capability blocks                 | [Approved screenshot]           |
| [Approved fit and rollout details]                                           |
|------------------------------------------------------------------------------|
| Request a software demo [Request a demo]     Help with your farm?              |
+------------------------------------------------------------------------------+
```

On mobile, lead with copy and links. Show the controls and current decision together above the simplified plot. Keep the full log below the plot for replay and inspection. Allow wrapping and a single reading order instead of horizontal chart scrolling. The initial sample and main action are usable before any enhanced playback downloads.

### For Farmers

```text
+------------------------------------------------------------------------------+
| Bhoomi Tech                                        Main navigation | Language |
|------------------------------------------------------------------------------|
| What would you like help with on your farm?  | [Optional approved farm photo] |
| [Message on WhatsApp] [Call] [Farmer form]   |                                |
|------------------------------------------------------------------------------|
| [Approved service]     [Approved service]      [Approved service]             |
| Situation + next step  Situation + next step   Situation + next step          |
|------------------------------------------------------------------------------|
| What to tell us                             | [Coverage, language and hours] |
| Crop or setup / area / help needed          | [WhatsApp] [Call] [Form]        |
+------------------------------------------------------------------------------+
```

On mobile, stack the actions with full-width first action and readable call and form links. Keep the first screen free of heavy media. Repeat actions at the end. A small mobile action strip may appear once the first actions leave view, provided it clears the safe area and never covers copy or focused content. Keep the repeated links inline when there is little viewport height.

### Contact

```text
+------------------------------------------------------------------------------+
| Bhoomi Tech                                                   Main navigation |
|------------------------------------------------------------------------------|
| How can we help?                     [Software demo] [Farmer enquiry]        |
|------------------------------------------------------------------------------|
| Request a software demo              | Ask about farmer services              |
| Name and work email                  | Name and callback phone                |
| Business / phone (optional)          | Area or district                       |
| What you want to discuss             | What you need help with (optional)     |
| Data-use note                        | Data-use note                          |
| [Request a demo]                     | [Send farmer enquiry]                 |
| Form delivery status                 | Form delivery status                   |
|------------------------------------------------------------------------------|
| [WhatsApp]  [Phone]  [Where to Buy]                                           |
+------------------------------------------------------------------------------+
```

Stack software then farmer on mobile. The farmer anchor puts its heading and first field at the top of the viewport. Labels stay above fields and errors stay next to the relevant field. The software form offers a link to the farmer form immediately above it, and the farmer form links back. No sticky action overlaps keyboard input.

## 4. Signature moments

### Follow one farm decision

The map and decision log stay in place. On “Run simulation,” the first reading appears immediately. Every 2 seconds for the next 6 seconds, update the selected zone and append one next event, ending after the fourth. In each transition, a border around the selected zone draws in over 220 ms. A short connecting line from the zone to the edge of the plot draws over the next 180 ms. The matching decision card enters from 8 px below over 160 ms. Used with “Next step,” the same transition runs once and waits for the next input. “Pause” cancels further timed updates and freezes the state. Resume restarts the timer from the current stage. Stop playback when visitors move away from the experience so they can return to the same step. The interaction uses a lightweight geometric diagram and text, with no video or WebGL dependency.

With reduced motion, step changes are immediate and manual by default. On the lightweight layout, use the same fictional data with an instant colour and label change on a small plot and a textual sequence. The first event and a complete static decision transcript are in the delivered HTML. Without JavaScript, read the transcript in a native disclosure. Use an explicit text state as well as colour. Keep focus on the pressed control and announce only manual step changes and playback completion.

### Bring the conversation within reach

On mobile, when the initial WhatsApp, call and form actions have scrolled fully past the top of the viewport, reveal the compact WhatsApp and Call strip at the bottom. Its container moves upward 8 px and fades in over 150 ms. It hides when the inline action group at the end enters the viewport so the same actions never compete with it. Keep JS optional. In reduced motion use an immediate appearance. On the lean layout and without JS, use the always-visible initial actions in their normal position and the inline action group at the end. Account for safe-area insets, short screens and focus near the lower edge. Only enable the strip if checks show that it improves access on representative phones.

## 5. Content and assets needed from Bhoomi Tech

- [ ] `[PLACEHOLDER: approved software capabilities, operator roles and included automation]`
- [ ] `[PLACEHOLDER: owner-approved example scenario and review steps]`
- [ ] `[PLACEHOLDER: approved product screenshots or UI references, with display permissions]`
- [ ] `[PLACEHOLDER: pricing disclosure decision, supported farm types, demo follow-up process]`
- [ ] `[PLACEHOLDER: farmer services, eligibility, coverage and service language list]`
- [ ] `[PLACEHOLDER: WhatsApp link, business phone, support hours and form recipients]`
- [ ] `[PLACEHOLDER: enquiry privacy wording, retention expectations and reply guidance]`
- [ ] `[PLACEHOLDER: optional farmer photography and permission]`

## 6. Dependencies

- **Brand and navigation.** Use the shared type, colour tokens, focus styling and button patterns. Have the Home software and farmer doors land on the relevant page and offer consistent CTA language. Link households to the Where to Buy route.
- **Static architecture and form provider.** C4 owns selection and verification of integration details. Insist on an explicit acceptance response, separate destination testing and a verified no-JavaScript path. If the fast submission path is unavailable, direct the user to a verified hosted form when supported. Where a form channel is temporarily unavailable, show that status and the confirmed alternate channels.
- **Regional content and performance.** C4 and the owner agree language routes and phone formatting. Keep the farmer first viewport free of dashboard code, background film and custom-font blocking. Reuse the integration’s final device and network targets. Test with a representative affordable Android phone on throttled mobile data, keyboard-only navigation and a screen reader. Confirm deep links, paused playback, reduced motion, successful delivery, validation errors, non-JavaScript and timeout behaviour before launch.

## 7. Open questions for the owner

1. Which farm operation can Bhoomi Tech demonstrate publicly, and what does the actual operator review or control? Can the site show a redacted product screenshot?
2. Which farmer services can someone enquire about at launch, in which districts and in which languages can the team reply?
3. What are the public WhatsApp and phone details, who receives each form, and what response expectation can each recipient commit to?
4. What do software buyers need to know about farm compatibility or pricing before asking for a demo, and which of those facts may be published?

## 8. Rough effort

| Page or feature | Size | Main work |
| --- | --- | --- |
| Farm Software page | L | Product copy, proof, responsive composition and accessible illustrative assets |
| Farm decision simulation | L | Fixture, map and log choreography, playback controls and independent fallback |
| For Farmers page | M | Mobile layout, verified channels, copy and translated states once languages are confirmed |
| Contact and two submission routes | M | Accessible forms, two inbox routes, confirmation and failure variants, field and device checks |
| Compact mobile contact strip | S | Progressive enhancement, viewport tests and focus checks |
