# Bhoomi Tech website — shared planning brief

Every planning agent reads this first. It holds what the owner has said, what is already decided, and the calls the lead made where the owner hasn't decided yet.

## The company (from the owner)

- **Bhoomi Tech** — agritech company, domain **bhoomitech.in**. The tagline idea is **"seed to fork"**: they cover the whole chain from seed to the plate.
- Four offerings: **seed-to-fork services**, **marketplace services**, **AI solutions** (farm software where the farm is automated by AI), **modern farming solutions**.
- They grow and supply vegetables. Launch list: **lettuce, kale, cucumbers**, with more to come.

## Audiences (from the owner)

1. **Households buying vegetables.** Vegetables are **NOT sold on the website.** They are sold through **authorized sellers**: shops and marketplaces. The site shows what Bhoomi Tech grows and **where you can buy it**.
2. **Farm businesses buying the farm software**, AI that automates farm operations. They **contact Bhoomi Tech through the site**.
3. **Farmers looking for AI-enabled services** for their own farms. They also **contact Bhoomi Tech through the site**.

## Quality bar (from the owner)

- "Insane": agency-grade work, at about the level of a **$60,000 website build**. Modern, interactive and motion-rich. **Not a normal static-feeling site.**
- The owner is fine with the work taking a long time. Craft beats speed.

## Decided

- **No cart, no payments, no customer accounts.**
- Contact happens through **enquiry forms**: one for a software demo or enquiry, one for farmer services. **WhatsApp and phone** are also offered.
- The **produce list** and **authorized-seller list** each live in a simple data file, so adding a vegetable or a shop is a small edit.
- **Hosting:** GitHub Pages from repo `mysteryyoi/bhoomitech`, with custom domain `bhoomitech.in`. Today `.github/workflows/deploy.yml` publishes the `dist/` folder on every push to `main`. **Static hosting only**, with no server code. Anything dynamic, such as forms, needs a third-party service.

## Current state of the repo

- `dist/index.html` + `dist/styles.css` hold a "coming soon" placeholder. Brand cues to evolve, not discard:
  - Palette: near-black green `#101610`, lime `#b8ed79`, pale lime `#e2ffb0`, leaf green `#629e36`, deep green `#294a20`
  - A geometric "B" logo mark (stroke-based SVG) and the wordmark `bhoomitech.` with a coloured dot
  - An isometric stacked-hexagon "sculpture" illustration
  - Tone: calm, confident, short lines ("Something good is taking shape.")

## Proposed site map (the lead's proposal, accepted by the owner in conversation)

```
Home            the seed-to-fork story, told as one scroll journey
├── Our Produce     lettuce · kale · cucumber · …  each links to "find it at" sellers
├── Where to Buy    authorized shops & marketplaces, by city/area
├── Farm Software   what the AI automates on a farm  →  "Book a demo" form
├── For Farmers     AI-enabled services for your farm  →  "Talk to us" form
├── About           the farm, the team, how seed-to-fork works
└── Contact         both forms + WhatsApp / phone
```

The homepage idea is one continuous journey: **seed → AI-run farm → harvest → marketplace/sellers → your plate**. From it, three "doors" lead to the three audiences.

## Provisional creative direction (lead's call; Agent 1 refines or replaces it)

The owner was asked for reference sites and skipped the question, so this is a starting point:

- **"Precision meets soil."** Dark, cinematic and earthy, with the existing lime as the signal colour for life and growth. Living organic forms sit against crisp technical data overlays such as sensor readings, grid lines and AI annotations.
- Big editorial typography, plenty of space, and scroll-driven chapters.
- One or two genuine **WebGL/3D moments**, for example a seed that grows as you scroll. Everywhere else: refined motion, meaning smooth scroll, reveal choreography and micro-interactions.
- It should feel premium **and** trustworthy to a farmer, not like a crypto landing page.

## Provisional stack (lead's call; Agent 4 validates or argues otherwise)

- **Astro** with static output to GitHub Pages, **GSAP + ScrollTrigger** for choreography, **Lenis** for smooth scroll, and **Three.js** for the WebGL moments. Styling and CMS choices are left to Agent 4.

## Unknowns. Do NOT invent these; mark them as `[PLACEHOLDER: …]`

- Location: which country, state or cities. The `.in` domain suggests India; plan with that assumption and flag it.
- Names and locations of the authorized sellers and marketplaces
- How the produce is grown (open field, greenhouse, polyhouse, hydroponic or vertical farm)
- Real feature list, screenshots and pricing of the farm software
- Exact services offered to farmers
- Whether real photography or video of the farm, produce and team exists
- Team, founding story, numbers and stats, certifications, clients and partners
- Languages. Farmers may need Hindi and/or a regional language.

## Ownership

| Agent | Area | Output file |
|---|---|---|
| A1 | Brand system, creative direction, motion language, **Home** + **About** | `docs/plan/01-brand-home-about.md` |
| A2 | Consumer side: **Our Produce** + **Where to Buy** | `docs/plan/02-produce-where-to-buy.md` |
| A3 | Business side: **Farm Software** + **For Farmers** + **Contact** (forms) | `docs/plan/03-software-farmers-contact.md` |
| A4 | Technical architecture: stack, performance, accessibility, SEO, languages, content model, forms service, deploy, QA | `docs/plan/04-tech-architecture.md` |
| Lead | Consolidates everything into the master plan | `docs/plan/00-master-plan.md` |

## What every plan file must contain

1. **Purpose.** What this area is for and who it serves.
2. **Page-by-page breakdown.** Sections in scroll order, with copy direction. Draft headlines are welcome.
3. **ASCII wireframe** for each page on desktop, with a note on how mobile differs.
4. **Signature moments.** One to three "wow" interactions, each described concretely enough to build: what moves, what triggers it, how it degrades with `prefers-reduced-motion` and on low-end phones.
5. **Content and assets needed from Bhoomi Tech.** A checklist.
6. **Dependencies.** Shared components and anything it needs from other areas.
7. **Open questions for the owner.** Only questions whose answer changes what gets built, most important first.
8. **Rough effort.** S, M or L per page or feature.

## Rules for planning agents

- **Plan only.** No product code, no scaffolding, no installing packages, no git commits.
- **Write only your own output file.** Don't edit this brief or other agents' files.
- **Never invent facts about Bhoomi Tech** (numbers, clients, certifications, locations, features). Use `[PLACEHOLDER: …]`.
- **Mobile is first-class.** Many farmers will be on low-end Android phones with slow mobile data. Every heavy effect needs a lightweight fallback, and the site must stay usable on a 4G phone.
- Aim for roughly **1,500–3,000 words**. Be concrete, not generic.
