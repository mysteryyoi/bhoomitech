# Phase 0 handover

**Branch:** `phase-0-foundation`, from `main` at `173f06b`. **Merged into `main` (fast-forward to `cb79ff6`) and live on bhoomitech.in since 27 Nov 2026.**
**Plan:** `docs/superpowers/plans/2026-11-26-phase-0-foundation.md` · **Spec:** `docs/plan/00-master-plan.md`

## What's done (Tasks 1–6)

| Task | Result |
|---|---|
| 1 | The placeholder was moved verbatim into an Astro 7.4.13 static build. Toolchain pinned: Node 24.22.3 (`.node-version`), TypeScript 6.0.3, exact versions. Renders byte-identical to the live site at 1440 and 390px. |
| 2 | Design tokens (`src/design/tokens.ts`, `src/styles/tokens.css`) with a WCAG contrast guard. |
| 3 | Form provider config from env (Web3Forms and Formspree) and an Indian mobile number pattern. |
| 4 | Enquiry delivery states (invalid / sending / accepted / rejected / unconfirmed). Honeypot. Fast submits are delayed, never dropped. No silent retry. |
| 5 | Noindex proof pages `/proof/forms/{web3forms,formspree}/` and no-JS thanks pages. |
| 6 | Cloudflare `_headers`, CI (`check`, Vitest, Playwright, production build, Lighthouse budgets), and `deploy.yml` now builds before uploading to GitHub Pages. |

**Reviews:**
- Each task was built by a Sonnet implementer and reviewed by a fresh Sonnet reviewer.
- The whole branch was reviewed by Claude Opus and cross-reviewed by Codex (gpt-6.2-sol helper) over Agent Hub thread #21.
- One combined fix wave (F1–F10) closed both reviews' findings.

**Final local check:** `check` 0 errors · unit 104/104 · e2e 7/7 · production build has no test keys · Lighthouse passes (performance 0.94–0.99, home weight 68 KB against a 320 KB budget, 0 KB JS).

## Merge result (27 Nov 2026)

- **CI on GitHub, first run.** It passed on both the branch (run 45942993079) and `main` (run 45943192383), every step green, including Lighthouse on the runner's own Chrome.
- **Pages deploy.** Run 45943192459 was green. `deploy.yml` now builds the site on GitHub before publishing it.
- **The live site matches the old one:**
  - The homepage HTML is byte-identical to a local production build.
  - Its markup matches the old hand-written `dist/index.html`, all 164 elements. Astro only removes whitespace between tags.
  - `styles.css`, `favicon.svg` and `CNAME` match the old files once line endings are evened out.
  - It renders correctly at desktop and 375px phone width, with no console errors.
- **Domain and HTTPS.**
  - HTTPS is valid.
  - `www` redirects to the bare domain.
  - DNS has all four GitHub Pages addresses.
  - From the build PC, plain `http://` on port 80 connected only via 185.199.108.153; the other three timed out. That points to the local network. Cloudflare replaces this in Task 8.
- **Proof pages.** `/proof/forms/{web3forms,formspree}/` and `/thanks/*` are live. They're noindex, unlinked, and show "Not configured", as expected. Phase 2 removes them. GitHub Pages ignores `_headers`; that file only matters once Cloudflare serves the site.
- **Still open: `.openai/hosting.json`.** It points an OpenAI Sites preview at `dist/`, which is no longer committed, so that preview has nothing to serve. bhoomitech.in is unaffected. Keep or delete the file: your call.
- **Follow-up.** GitHub warns that `actions/checkout@v4`, `setup-node@v4`, `configure-pages@v5`, `deploy-pages@v4` and `upload-artifact@v4` (pulled in by `upload-pages-artifact@v3`) run on deprecated Node 20. Bump them to their next majors.

## Task 7: accounts and form proof (owner + lead)

Follow the plan's Task 7. In addition, the proof matrix must settle these, which the reviews raised:
- **Formspree fields:** confirm `subject` vs `_subject` (its docs now show `subject`). Confirm whether `_next` works on your plan or needs the dashboard redirect setting. Record the redirect and the inbox receipt as **separate** results.
- **Web3Forms honeypot:** `botcheck` is documented as a checkbox, and as deprecated. Confirm what the provider does with our text-input honeypot.
- **Turnstile enforcement (ruling R10):** with a key set and provider enforcement on, the no-JS demo POST has no token and will fail. Decide the policy from that matrix row.
- **JS-on Web3Forms submits must come back as "accepted".** The fix wave strips the native-only `redirect` field from fetch submissions; confirm this against the real provider.
- **Over-quota behaviour:** Formspree can store over-quota enquiries without emailing them. Confirm the alert recipient and how to recover them.
- **Where to test:**
  - Use synthetic test data on a preview that is **access-restricted** (Cloudflare Access), not public.
  - Open the proof pages at the exact deployment URL (`CF_PAGES_URL`), because `redirect`/`_next` point there and Web3Forms' free plan can't redirect cross-domain.

## Task 8: DNS cutover (owner)

As in the plan. Before switching DNS, verify the placeholder on both hosts.

## Deferred to Phase 1/2

- Lighthouse on secondary routes, with the 240 KB per-route budget.
- Visible per-field error styling, plus field hints linked with `aria-describedby`.
- Remove `/proof/` pages from production builds.
- An e2e guard that Turnstile is never on the farmer form.
- A `frame-ancestors`/CSP plan. Astro inlines scripts and styles, so a CSP will need hashes.
- The README's "collects no visitor data" note.
- Test hygiene:
  - the e2e `not.toContain('redirect=')` should be `not.toContain('name="redirect"')`
  - the no-JS URL assertion should check `new URL(page.url()).search === ''`
  - add guards for the "Not configured" branch

## Decisions made on your behalf (each can be reversed)

| # | Decision | Cost if wrong |
|---|---|---|
| R1 | Node 24.22.3 is portable at `A:\claude\deps\node-v24.22.3-win-x64`. The system Node 22.20.0 is untouched. | Commands must use that PATH prefix locally. Upgrading the system Node later removes the need. |
| R2 | Only Tasks 1–6 ran. Tasks 7–8 wait for you (accounts, push, DNS, merge). | None: they're deferred. |
| R3 | Fallback for Playwright not following a 303 in the no-JS test. Not needed in the end. | None. |
| R4 / R5 | Added `@types/node` 24.19.4 as a dev dependency so type checks accept `process.env`. | One dev dependency. |
| R6 | `deploy.yml` had no build step until Task 6. It has one now. | None now. A merge before Task 6 would have deployed an empty site. |
| R7 | A submit faster than 3s is **delayed until 3s**, not silently dropped (the plan said drop). The honeypot still fake-accepts. | Slightly more spam from bots that run JavaScript. |
| R8 | One combined fix wave for the Opus and Codex findings. | None. |
| R9 | Server errors (5xx) and timeouts (408) show **"couldn't confirm"** (with a duplicate warning), not "couldn't send". | A truly failed submit reads as uncertain instead of failed; details are kept either way. |
| R10 | Turnstile: the JS path waits for a token and resets it after use. The no-JS demo form shows a notice. Enforcement is decided in Task 7. | Task 7 may need a different no-JS route for the demo form. |
| R11 | The mobile pattern accepts any single spaces or dashes, the `0`/`+91` prefixes, and surrounding spaces. | Slightly looser input, sent verbatim to the provider. |
| Parked | The weak e2e `redirect=` assertion stays until the file is next touched. A unit test already covers the behaviour. | A regression would be caught only by the unit test. |
