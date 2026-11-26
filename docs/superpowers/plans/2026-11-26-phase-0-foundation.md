# Phase 0: Foundation + Proofs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-written `dist/` placeholder with an Astro project that serves the *identical* coming-soon page, add design tokens, CI and Cloudflare Pages hosting, and prove that both enquiry forms reach real inboxes with and without JavaScript.

**Architecture:**
- **Astro output:** static (`output: 'static'`) with vanilla TypeScript and CSS custom properties, and no client framework.
- **Placeholder:** moved verbatim into `src/pages/index.astro`, so production looks the same until Phase 1.
- **Forms:** plain HTML POST to a third-party provider, progressively enhanced by a small `fetch` module with explicit delivery states.
- **Form proof pages:** two provider candidates are built side by side on noindex proof pages. Real submissions decide between them.

**Tech Stack:**
- Node 24.22.3 LTS
- Astro 7.4.13 and @astrojs/check 0.9.12
- TypeScript 6.0.3
- Vitest 5.1.2 and happy-dom 21.0.4
- @playwright/test 1.65.1
- @lhci/cli 0.16.1
- Cloudflare Pages, with GitHub Pages kept until the DNS cutover

**Spec:** `docs/plan/00-master-plan.md`, the approved master plan (draft v3, 26 Nov 2026). The detail plans it cites are in `docs/plan/01-…04-*.md` and `docs/plan/codex/`. This plan covers **§9 Phase 0** plus the Phase 0 items in §2.1, §3.2 and §7.6.

## Global Constraints

**Toolchain**
- Node **24.22.3**, pinned in `.node-version`. Astro 7.4.13 requires Node ≥22.23.4, and this PC currently has 22.20.0, so upgrade it first.
- Exact dependency versions, with `save-exact=true` in `.npmrc` and a committed `package-lock.json`.
- TypeScript must stay on **6.0.3**. @astrojs/check 0.9.12 supports only `^5 || ^6`; **do not install TypeScript 7.**
- No client framework (no React, Vue or Svelte). Browser code is vanilla TS modules.

**Astro and CSS**
- Astro config: `site: 'https://bhoomitech.in'`, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`.
- CSS: vanilla CSS with tokens, and layer order `@layer reset, tokens, base, layout, components, utilities;`.

**The live placeholder**
- It must keep rendering **identically** at https://bhoomitech.in throughout Phase 0.

**Forms**
- Every form works with JS off (native POST, native validation).
- Personal data never goes into a URL, an analytics event or a WhatsApp prefill. Forms only POST.
- **No silent automatic retry** of a form submission.
- Turnstile goes on the **software-demo form only**, never the farmer form.

**Performance budgets (CI hard fails)**
- LCP > 3000ms
- CLS > 0.1
- TBT > 300ms
- Lighthouse performance < 0.85
- Home cold-load weight > 320KiB (327680 bytes)
- Critical JS per route > 35KB (35840 bytes)

**Indexing**
- Proof pages (`/proof/`), thanks pages (`/thanks/`) and any `*.pages.dev` preview are **noindex**.

**Accounts and copy**
- Every account (Cloudflare, form providers, Turnstile, Umami) is created under a **Bhoomi Tech-owned email**, never a contractor's.
- Copy says "Bhoomi Tech" in sentences. The wordmark `bhoomitech.` is unchanged.

**Git**
- Work on branch `phase-0-foundation`. **Rohit merges to `main`.** Pushing the branch needs his OK.

## Review Focus

1. **Double-tap on Submit over slow 4G.** Expect exactly one request, with the button disabled while sending. *Test: Task 4, `enhance.test.ts` › "ignores a second submit while sending".*
2. **The provider answers 2xx with a non-JSON body** (an HTML page, an empty body). Expect "couldn't confirm", never a false "submitted". *Test: Task 4, `submit.test.ts` › "reports unconfirmed when a 2xx body is not JSON".*
3. **Indian mobile numbers typed the way people type them:** a leading `0`, `+91`, spaces or dashes. Expect them accepted. Expect 9-digit numbers, numbers starting 0–5, and Devanagari digits to be blocked. *Test: Task 3, `fields.test.ts` › the accept and reject tables.*
4. **Preview deploys, `/proof/` and `/thanks/` getting indexed by Google.** Expect a noindex header or meta on all of them. *Tests: Task 6, `headers.test.ts`, and Task 5, "proof pages are noindex".*
5. **The provider accepts an enquiry while over quota but never emails it** (documented Formspree behaviour). Expect the owner to be alerted and the enquiry still retrievable. *Test: Task 7, proof-matrix row "Over-quota behaviour and alert" must be filled before a provider is chosen.*

---

## File map

| Path | Responsibility | Task |
|---|---|---|
| `.node-version`, `.npmrc`, `.gitignore`, `package.json`, `package-lock.json` | Toolchain pins and scripts | 1 |
| `astro.config.mjs`, `tsconfig.json`, `playwright.config.ts` | Build and e2e config | 1 |
| `src/pages/index.astro` (git-moved from `dist/index.html`) | The placeholder, verbatim | 1 |
| `public/styles.css`, `public/favicon.svg`, `public/CNAME`, `public/.nojekyll` (git-moved from `dist/`) | Placeholder assets plus GitHub Pages domain until cutover | 1 |
| `tests/e2e/placeholder.spec.ts` | The placeholder still renders | 1 |
| `src/design/tokens.ts`, `src/design/contrast.ts` | Colour tokens (source of truth) and the WCAG contrast maths | 2 |
| `src/styles/tokens.css`, `src/styles/layers.css` | CSS custom properties and layer order | 2 |
| `vitest.config.ts`, `tests/unit/tokens.test.ts` | Unit-test runner and token guards | 2 |
| `src/scripts/forms/config.ts`, `src/scripts/forms/fields.ts`, `.env.example`, `.env.e2e` | Provider endpoints from env, field constants | 3 |
| `tests/unit/config.test.ts`, `tests/unit/fields.test.ts` | Config and pattern tests | 3 |
| `src/scripts/forms/submit.ts`, `src/scripts/forms/enhance.ts` | Delivery logic and the DOM wiring | 4 |
| `tests/unit/submit.test.ts`, `tests/unit/enhance.test.ts` | Delivery-state tests | 4 |
| `src/components/forms/EnquiryForm.astro`, `src/pages/proof/forms/[provider].astro`, `src/pages/thanks/demo.astro`, `src/pages/thanks/farmers.astro`, `src/styles/proof.css` | Proof forms and no-JS landing pages | 5 |
| `tests/e2e/forms-proof.spec.ts` | Form wiring, end to end | 5 |
| `public/_headers`, `tests/unit/headers.test.ts` | Cloudflare headers (security, cache, noindex) | 6 |
| `.github/workflows/ci.yml`, `.github/workflows/deploy.yml` (modify), `lighthouserc.json` | CI, Lighthouse budgets, and the GitHub Pages build until cutover | 6 |
| `docs/plan/proofs/phase-0-proofs.md` | Proof matrix and provider decision | 7 |
| `README.md` | How to run, test and deploy | 1, 3, 8 |

---

### Task 1: Toolchain and an Astro build that serves the identical placeholder

**Files:**
- Create: `.node-version`, `.npmrc`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `playwright.config.ts`, `tests/e2e/placeholder.spec.ts`
- Move (git mv, contents unchanged):
  - `dist/index.html` → `src/pages/index.astro`
  - `dist/styles.css` → `public/styles.css`
  - `dist/favicon.svg` → `public/favicon.svg`
  - `dist/CNAME` → `public/CNAME`
  - `dist/.nojekyll` → `public/.nojekyll`
- Modify: `.gitignore`, `README.md`

**Interfaces:**
- Produces: `npm run build` writes `dist/`. `npm run preview` serves it.
- Produces Playwright `baseURL` `http://127.0.0.1:4321`.
- Produces the scripts `check`, `test:unit`, `test:e2e`, `lhci`, which later tasks rely on.

- [ ] **Step 1: Branch and commit the planning docs**

```bash
git switch -c phase-0-foundation
git add docs/
git commit -m "docs: add website master plan, area plans and Phase 0 plan"
```

- [ ] **Step 2: Install Node 24.22.3 locally and confirm**

Run `node --version`. Expected: `v24.22.3`. (On Windows, install it from nodejs.org or with `winget install OpenJS.NodeJS.LTS`, then reopen the shell.)

- [ ] **Step 3: Write the failing placeholder test**

```ts
// tests/e2e/placeholder.spec.ts
import { test, expect } from '@playwright/test';

test('home serves the coming-soon placeholder unchanged', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  const res = await page.goto('/');
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle('Bhoomitech — Something good is taking shape.');
  await expect(page.locator('h1#headline')).toContainText('taking shape.');
  await expect(page.locator('link[rel="icon"][href="favicon.svg"]')).toHaveCount(1);
  const css = await page.request.get('/styles.css');
  expect(css.status()).toBe(200);
  expect(errors).toEqual([]);
});
```

- [ ] **Step 4: Create the toolchain files**

- **`.node-version`:** `24.22.3`
- **`.npmrc`:** `save-exact=true`
- **`.gitignore`:** add `node_modules/`, `dist/`, `.astro/`, `.env`, `test-results/`, `playwright-report/`, `.lighthouseci/`
- **`package.json`:**
  - `"private": true`, `"type": "module"`, `"engines": { "node": ">=24.22.3" }`
  - Scripts:
    - `dev`: `astro dev`
    - `build`: `astro build`
    - `preview`: `astro preview`
    - `check`: `astro check`
    - `test:unit`: `vitest run`
    - `test:e2e`: `astro build --mode e2e && playwright test`
    - `lhci`: `lhci autorun`
- **Install:** `npm i astro@7.4.13` and `npm i -D @astrojs/check@0.9.12 typescript@6.0.3 @playwright/test@1.65.1`
- **`astro.config.mjs`:** `defineConfig({ site: 'https://bhoomitech.in', output: 'static', trailingSlash: 'always', build: { format: 'directory' } })`
- **`tsconfig.json`:** `{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist", "archive"] }`
- **`playwright.config.ts`:**
  - `testDir: 'tests/e2e'`
  - `use.baseURL: 'http://127.0.0.1:4321'`
  - one project, `chromium`
  - `webServer: { command: 'npm run preview -- --host 127.0.0.1 --port 4321', url: 'http://127.0.0.1:4321/', reuseExistingServer: !process.env.CI }`

- [ ] **Step 5: Run the test to verify it fails**

Run: `npx playwright install chromium && npm run test:e2e`
Expected: FAIL. The build has no `src/pages`, so there is no route at `/`.

- [ ] **Step 6: Move the placeholder in, unchanged**

```bash
mkdir -p src/pages public
git mv dist/index.html src/pages/index.astro
git mv dist/styles.css public/styles.css
git mv dist/favicon.svg public/favicon.svg
git mv dist/CNAME public/CNAME
git mv dist/.nojekyll public/.nojekyll
```

Do not edit the HTML. An `.astro` file with no frontmatter is valid, and the relative `styles.css` and `favicon.svg` links resolve from `public/`.

- [ ] **Step 7: Run the test to verify it passes, and confirm the move is pure**

Run: `npm run test:e2e`
Expected: PASS (1 test).

Run: `git diff --cached -M --stat`
Expected: the five moves show as renames with 100% similarity.

Then run `npm run preview` and compare https://bhoomitech.in against http://127.0.0.1:4321/ at 1440px and 390px wide. They must look identical.

- [ ] **Step 8: Update the README**

Replace the README with these sections:
- **Requirements:** Node 24.22.3 (from `.node-version`)
- **Run:** `npm ci`, `npm run dev`
- **Test:** `npm run check`, `npm run test:unit`, `npm run test:e2e`
- **Build:** `npm run build` → `dist/`, which is build output and not committed
- **Hosting:** GitHub Pages until the Phase 0 DNS cutover, then Cloudflare Pages

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "build: move placeholder into an Astro static build with pinned toolchain"
```

---

### Task 2: Design tokens and a contrast guard

**Files:**
- Create: `src/design/tokens.ts`, `src/design/contrast.ts`, `src/styles/tokens.css`, `src/styles/layers.css`, `vitest.config.ts`, `tests/unit/tokens.test.ts`

**Interfaces:**
- Produces: `color` (the record of token name → `#RRGGBB`), `type ColorToken = keyof typeof color`, `TEXT_PAIRS`, `FORBIDDEN_TEXT_PAIRS`, `contrastRatio(a: string, b: string): number`.
- Produces CSS custom properties `--color-<token>` in `tokens.css`. Phase 1 and later import `layers.css` and `tokens.css`.

- [ ] **Step 1: Install and configure Vitest**

Install: `npm i -D vitest@5.1.2 happy-dom@21.0.4`

Create `vitest.config.ts`: `defineConfig({ test: { include: ['tests/unit/**/*.test.ts'], environment: 'happy-dom' } })`

- [ ] **Step 2: Write the failing tests**

```ts
// tests/unit/tokens.test.ts
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { color, TEXT_PAIRS, FORBIDDEN_TEXT_PAIRS } from '../../src/design/tokens';
import { contrastRatio } from '../../src/design/contrast';

describe('contrastRatio', () => {
  it('matches the WCAG extremes', () => {
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 1);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });
  it('is symmetric and matches a known brand pair', () => {
    expect(contrastRatio('#F3F5EB', '#101610')).toBeCloseTo(16.67, 1);
    expect(contrastRatio('#101610', '#F3F5EB')).toBeCloseTo(16.67, 1);
  });
});

describe('brand text pairs', () => {
  it.each(TEXT_PAIRS)('$fg on $bg meets $min:1 ($use)', ({ fg, bg, min }) => {
    expect(contrastRatio(color[fg], color[bg])).toBeGreaterThanOrEqual(min);
  });
  it.each(FORBIDDEN_TEXT_PAIRS)('$fg on $bg stays forbidden (fails 3:1)', ({ fg, bg }) => {
    expect(contrastRatio(color[fg], color[bg])).toBeLessThan(3);
  });
});

describe('tokens.css', () => {
  const css = readFileSync('src/styles/tokens.css', 'utf8').toLowerCase();
  it.each(Object.entries(color))('declares --color-%s as %s', (name, hex) => {
    expect(css).toContain(`--color-${name}: ${hex.toLowerCase()};`);
  });
});
```

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm run test:unit`
Expected: FAIL with "Cannot find module '../../src/design/tokens'".

- [ ] **Step 4: Implement the tokens and the contrast maths**

**`src/design/tokens.ts`:**
- **`color`** has exactly these 21 tokens (from `01-brand-home-about.md` §4.2):
  - `soil-950 #0B100B`, `soil-900 #101610`, `soil-800 #172218`, `soil-700 #202B1B`
  - `line-700 #30382E`, `line-600 #495143`
  - `moss-600 #294A20`, `leaf-500 #629E36`
  - `lime-400 #B8ED79`, `lime-200 #E2FFB0`
  - `ink-50 #F3F5EB`, `ink-400 #A1AAA0`, `ink-700 #4A5446`
  - `husk-100 #F2EEE3`, `husk-200 #E6E0D0`
  - `fern-700 #3A6B22`
  - `sun-400 #F2B544`, `water-400 #7CC8D8`, `clay-500 #D1683A`
  - `loam-800 #2B2219`, `loam-600 #4A3A2A`
- **`TEXT_PAIRS`** (`{ fg, bg, min, use }`):

  | fg | bg | min | use |
  |---|---|---|---|
  | `ink-50` | `soil-900` | 4.5 | body on dark |
  | `ink-400` | `soil-900` | 4.5 | secondary on dark |
  | `ink-400` | `soil-800` | 4.5 | secondary on cards |
  | `lime-400` | `soil-900` | 4.5 | signal text and links on dark |
  | `soil-900` | `lime-400` | 4.5 | primary button label |
  | `leaf-500` | `soil-900` | 4.5 | secondary green on dark |
  | `soil-900` | `husk-100` | 4.5 | body on daylight |
  | `ink-700` | `husk-100` | 4.5 | secondary on daylight |
  | `fern-700` | `husk-100` | 4.5 | links on daylight |
  | `clay-500` | `soil-900` | 4.5 | alerts in data UI |

- **`FORBIDDEN_TEXT_PAIRS`:** `lime-400` on `husk-100`, and `sun-400` on `husk-100` (master plan §4: lime is never text on cream).
- **`src/design/contrast.ts`:** `contrastRatio` uses WCAG 2.x relative luminance: sRGB linearisation with the 0.03928 threshold, then `(L1 + 0.05) / (L2 + 0.05)` with the lighter colour first.

**`src/styles/tokens.css`:** inside `@layer tokens { :root { … } }`, declare every colour as `--color-<name>: <hex>;` (lowercase hex). Then copy these values verbatim from `docs/plan/01-brand-home-about.md`:
- **§4.3 type scale:**
  - `--step-display-xl`, `--step-display-l`, `--step-h2`, `--step-h3`
  - `--text-body-l: 20px`, `--text-body: 17px`, `--text-small: 14px`
- **Font stacks:**
  - `--font-display: 'Fraunces', Georgia, serif`. The GT Alpina licence is still open.
  - `--font-sans: 'Geist', system-ui, sans-serif`
  - `--font-mono: 'Geist Mono', ui-monospace, monospace`
- **§4.7 spacing and radii:**
  - `--space-1` … `--space-12` = 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256px
  - `--radius-pill: 999px`, `--radius-card: 4px`, `--radius-photo: 0`
- **§5.2 motion:**
  - `--ease-machine`, `--ease-nature`, `--ease-out`, `--ease-in`
  - `--dur-instant` … `--dur-growth`
  - `--stagger-line: 70ms`, `--stagger-item: 50ms`

**`src/styles/layers.css`:** the one line `@layer reset, tokens, base, layout, components, utilities;`

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test:unit`
Expected: PASS. Every TEXT_PAIRS row passes. (Measured: the lowest is fern-700 on husk-100 at 5.48.)

- [ ] **Step 6: Commit**

```bash
git add src/design src/styles/tokens.css src/styles/layers.css vitest.config.ts tests/unit/tokens.test.ts package.json package-lock.json
git commit -m "feat: add design tokens with a WCAG contrast guard"
```

---

### Task 3: Form provider config and field constants

**Files:**
- Create: `src/scripts/forms/config.ts`, `src/scripts/forms/fields.ts`, `tests/unit/config.test.ts`, `tests/unit/fields.test.ts`, `.env.example`, `.env.e2e`
- Modify: `README.md` (environment variables section)

**Interfaces:**
- Produces:
  - `type Provider = 'web3forms' | 'formspree'`
  - `type FormType = 'software-demo' | 'farmer-services'`
  - `interface FormConfig { action: string; hidden: Record<string, string>; honeypotField: string }`
  - `getFormConfig(provider: Provider, formType: FormType, env: Record<string, string | undefined>, origin: string): FormConfig | null`
  - `resolveOrigin(env: Record<string, string | undefined>, site?: string): string`
- Produces from `fields.ts`: `INDIAN_MOBILE_PATTERN: string`, `FARM_TYPES`, `FARMER_NEEDS`, `CALL_TIMES`, `CALL_LANGUAGES` (readonly string arrays).

- [ ] **Step 1: Write the failing tests**

```ts
// tests/unit/config.test.ts
import { describe, it, expect } from 'vitest';
import { getFormConfig, resolveOrigin } from '../../src/scripts/forms/config';

const env = {
  PUBLIC_WEB3FORMS_KEY_SOFTWARE: 'k-soft', PUBLIC_WEB3FORMS_KEY_FARMER: 'k-farm',
  PUBLIC_FORMSPREE_ID_SOFTWARE: 'fsoft', PUBLIC_FORMSPREE_ID_FARMER: 'ffarm',
};
const origin = 'https://bhoomitech.in';

describe('getFormConfig', () => {
  it('builds the Web3Forms software-demo config', () => {
    expect(getFormConfig('web3forms', 'software-demo', env, origin)).toEqual({
      action: 'https://api.web3forms.com/submit',
      honeypotField: 'botcheck',
      hidden: { access_key: 'k-soft', subject: '[DEMO] Software demo enquiry',
        redirect: 'https://bhoomitech.in/thanks/demo/', form_type: 'software-demo' },
    });
  });
  it('builds the Formspree farmer config', () => {
    expect(getFormConfig('formspree', 'farmer-services', env, origin)).toEqual({
      action: 'https://formspree.io/f/ffarm',
      honeypotField: '_gotcha',
      hidden: { _subject: '[FARMER] Farmer services enquiry',
        _next: 'https://bhoomitech.in/thanks/farmers/', form_type: 'farmer-services' },
    });
  });
  it('returns null when the provider key is missing or blank', () => {
    expect(getFormConfig('formspree', 'software-demo', {}, origin)).toBeNull();
    expect(getFormConfig('web3forms', 'farmer-services', { PUBLIC_WEB3FORMS_KEY_FARMER: '' }, origin)).toBeNull();
  });
});

describe('resolveOrigin', () => {
  it('uses the production site on the main branch or outside Cloudflare', () => {
    expect(resolveOrigin({ CF_PAGES_BRANCH: 'main', CF_PAGES_URL: 'https://x.bhoomitech.pages.dev' })).toBe('https://bhoomitech.in');
    expect(resolveOrigin({})).toBe('https://bhoomitech.in');
  });
  it('uses the preview deployment URL on other branches', () => {
    expect(resolveOrigin({ CF_PAGES_BRANCH: 'phase-0-foundation', CF_PAGES_URL: 'https://abc.bhoomitech.pages.dev' }))
      .toBe('https://abc.bhoomitech.pages.dev');
  });
});
```

```ts
// tests/unit/fields.test.ts
import { describe, it, expect } from 'vitest';
import { INDIAN_MOBILE_PATTERN } from '../../src/scripts/forms/fields';

// Browsers compile the HTML pattern attribute as ^(?:pattern)$ with the v flag.
const re = new RegExp(`^(?:${INDIAN_MOBILE_PATTERN})$`, 'v');

describe('INDIAN_MOBILE_PATTERN', () => {
  it.each(['9876543210', '+91 98765 43210', '+91-9876543210', '919876543210', '09876543210', '98765 43210', '98765-43210'])(
    'accepts %s', (n) => expect(re.test(n)).toBe(true));
  it.each(['12345', '987654321', '5876543210', '98765432101', '९८७६५४३२१०', ''])(
    'rejects %s', (n) => expect(re.test(n)).toBe(false));
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`
Expected: FAIL with "Cannot find module '../../src/scripts/forms/config'".

- [ ] **Step 3: Implement `config.ts` and `fields.ts`**

**`config.ts` (endpoint values per provider):**

| Setting | Web3Forms | Formspree |
|---|---|---|
| Form action | `https://api.web3forms.com/submit` | `https://formspree.io/f/<id>` |
| Key or ID field | `access_key` | none (the ID goes in the URL) |
| Subject field | `subject` | `_subject` |
| No-JS redirect field | `redirect` | `_next` |
| Honeypot field | `botcheck` | `_gotcha` |

- **Subjects:** `[DEMO] Software demo enquiry` and `[FARMER] Farmer services enquiry`.
- **Thanks paths:** `/thanks/demo/` and `/thanks/farmers/`, joined onto `origin`.
- **Environment variables:**
  - `PUBLIC_WEB3FORMS_KEY_SOFTWARE`, `PUBLIC_WEB3FORMS_KEY_FARMER`
  - `PUBLIC_FORMSPREE_ID_SOFTWARE`, `PUBLIC_FORMSPREE_ID_FARMER`
- **`resolveOrigin`:** returns `env.CF_PAGES_URL` when `CF_PAGES_BRANCH` is set and isn't `main`. Otherwise it returns `site` (default `https://bhoomitech.in`).
- Before finishing, check these field names against each provider's current docs. Record any difference in `docs/plan/proofs/phase-0-proofs.md` (Task 7) and fix the table above.

**`fields.ts`:**
- `INDIAN_MOBILE_PATTERN = '(?:\\+?91[ \\-]?|0)?[6-9][0-9]{4}[ \\-]?[0-9]{5}'`. Escape `-` inside the classes, because browsers compile the pattern with the `v` flag.
- `FARM_TYPES`: `['Greenhouse', 'Polyhouse', 'Open field', 'Hydroponic', 'Vertical', 'Other', 'Not sure']`.
- `FARMER_NEEDS`, with the comment `// [ASSUMED — confirm with owner], master plan Q8`:
  - `Water and irrigation`
  - `Crop disease`
  - `Soil and fertiliser`
  - `Polyhouse or greenhouse setup`
  - `Planning what to grow`
  - `Selling produce`
- `CALL_TIMES`: `['Morning', 'Afternoon', 'Evening']`.
- `CALL_LANGUAGES`: `['Hindi', 'English']`.

**`.env.example`:** lists the four keys above plus `PUBLIC_TURNSTILE_SITE_KEY`, with empty values and a comment saying they are public identifiers set per Cloudflare Pages environment.

**`.env.e2e`** (committed; fake values, only used by `--mode e2e`):
- `PUBLIC_WEB3FORMS_KEY_SOFTWARE=e2e-w3f-software`
- `PUBLIC_WEB3FORMS_KEY_FARMER=e2e-w3f-farmer`
- `PUBLIC_FORMSPREE_ID_SOFTWARE=e2esoftware`
- `PUBLIC_FORMSPREE_ID_FARMER=e2efarmer`
- `PUBLIC_TURNSTILE_SITE_KEY=`

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm run test:unit`
Expected: PASS.

- [ ] **Step 5: Document the variables in the README and commit**

```bash
git add src/scripts/forms/config.ts src/scripts/forms/fields.ts tests/unit/config.test.ts tests/unit/fields.test.ts .env.example .env.e2e README.md
git commit -m "feat: add form provider config from env and field constants"
```

---

### Task 4: Delivery logic with explicit states (no silent retry)

**Files:**
- Create: `src/scripts/forms/submit.ts`, `src/scripts/forms/enhance.ts`, `tests/unit/submit.test.ts`, `tests/unit/enhance.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks. The honeypot name arrives through the form's `data-honeypot` attribute.
- Produces, in `submit.ts`:
  ```ts
  export type DeliveryOutcome = { state: 'accepted'; spam?: true } | { state: 'rejected' } | { state: 'unconfirmed' };
  export interface SubmitOptions {
    loadedAt: number; honeypotField: string;
    now?: () => number;            // default Date.now
    fetchImpl?: typeof fetch;      // default globalThis.fetch
    timeoutMs?: number;            // default 15000
    minFillMs?: number;            // default 3000 (time trap)
  }
  export function submitEnquiry(form: HTMLFormElement, opts: SubmitOptions): Promise<DeliveryOutcome>;
  ```
- Produces, in `enhance.ts`:
  - `STATUS_COPY: Record<'invalid' | 'sending' | 'accepted' | 'rejected' | 'unconfirmed', string>`
  - `enhanceForm(form: HTMLFormElement, deps?: { submit?: typeof submitEnquiry; now?: () => number }): void`
- **DOM contract (used by Task 5):**
  - The form has `data-enquiry-form` and `data-honeypot="<field>"`.
  - One `[data-form-status]` element with `role="status"` and `aria-live="polite"`.
  - One `button[type=submit]`.
  - `enhanceForm` sets `form.dataset.state` to `idle | invalid | sending | accepted | rejected | unconfirmed`.

- [ ] **Step 1: Write the failing tests**

`tests/unit/submit.test.ts`:
- **Setup:** a `makeForm()` helper builds `<form action="https://example.test/submit">` with inputs `name`, `email` and a `botcheck` honeypot. Use `loadedAt: 0`, `now: () => 10_000` unless a test says otherwise. `fetchImpl` is a `vi.fn()`.
- **Tests:**
  1. `treats a filled honeypot as accepted spam without sending`: honeypot value `'x'` → `{ state: 'accepted', spam: true }`, and `fetchImpl` not called.
  2. `treats a submit faster than minFillMs as accepted spam without sending`: `now: () => 2_999` → `{ state: 'accepted', spam: true }`, and `fetchImpl` not called.
  3. `posts the form once as FormData with Accept: application/json`: one call with `(form.action, { method: 'POST', body: FormData, headers: { Accept: 'application/json' }, signal: AbortSignal })`.
  4. `accepts {success:true} (Web3Forms)` and `accepts {ok:true} (Formspree)`: 200 JSON → `{ state: 'accepted' }`.
  5. `rejects a 200 with {success:false}` → `{ state: 'rejected' }`.
  6. `rejects a 4xx` (422, JSON errors) → `{ state: 'rejected' }`.
  7. **Review Focus 2.** `reports unconfirmed when a 2xx body is not JSON`: 200 with body `<html>ok</html>` → `{ state: 'unconfirmed' }`.
  8. `reports unconfirmed when fetch throws` (a `TypeError`) → `{ state: 'unconfirmed' }`.
  9. `reports unconfirmed after timeoutMs and never retries`: `vi.useFakeTimers()`; `fetchImpl` returns a promise that rejects only when its signal aborts; `timeoutMs: 15000`; advance 15000 → `{ state: 'unconfirmed' }`, and `fetchImpl` called exactly once.

`tests/unit/enhance.test.ts`:
- **Setup:** build a form per the DOM contract, with a required `name` input. Inject `submit: vi.fn()`.
- **Tests:**
  1. `marks the form invalid and focuses the first invalid field without sending`: empty required field → `dataset.state === 'invalid'`, `document.activeElement === nameInput`, `nameInput.getAttribute('aria-invalid') === 'true'`, status text is `STATUS_COPY.invalid`, and submit not called.
  2. **Review Focus 1.** `ignores a second submit while sending`: `submit` returns a pending promise; dispatch `submit` twice → called once, and the button is `disabled` while pending.
  3. `resets the form only after an accepted outcome`: accepted → `nameInput.value === ''` and state `accepted`.
  4. `keeps field values after rejected and after unconfirmed`: values are unchanged, state matches, and the button is re-enabled.
  5. `writes the outcome copy into the status region`, for each outcome.
  6. `turns off native validation once enhanced`: `form.noValidate === true` after `enhanceForm`.

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:unit`
Expected: FAIL with "Cannot find module '../../src/scripts/forms/submit'".

- [ ] **Step 3: Implement `submitEnquiry` in `src/scripts/forms/submit.ts`**

Apply these rules in order:
1. If the honeypot has a value, or `now() - loadedAt < minFillMs`, return `{ state: 'accepted', spam: true }` with no request.
2. Otherwise POST `new FormData(form)` to `form.action` with an `AbortController` that aborts after `timeoutMs`.
3. If the request throws or aborts, return `unconfirmed`.
4. If the response is not OK (`!res.ok`), return `rejected`.
5. If it is OK, parse the JSON:
   - `success === true` or `ok === true` → `accepted`
   - `success === false` or `ok === false` → `rejected`
   - the body fails to parse → `unconfirmed`
6. Never loop or retry.

- [ ] **Step 4: Implement `enhanceForm` and `STATUS_COPY` in `src/scripts/forms/enhance.ts`**

`STATUS_COPY` (exact copy):
- `invalid`: `Please check the highlighted fields.`
- `sending`: `Sending…`
- `accepted`: `Your enquiry was submitted. Thank you.`
- `rejected`: `We couldn't submit your enquiry. Your details are still here, so you can try again.`
- `unconfirmed`: `We couldn't confirm whether your enquiry was received. Your details are still here. Sending again may create a second enquiry.`

Behaviour:
- Set `form.noValidate = true` and `loadedAt = now()` when enhancing.
- On submit:
  1. `preventDefault`.
  2. If a request is already in flight, ignore the submit.
  3. If `!form.checkValidity()`, set state `invalid`, set `aria-invalid="true"` on each invalid control, and focus the first one.
  4. Otherwise set state `sending` and disable the button. Await `submit(form, { loadedAt, honeypotField: form.dataset.honeypot! })`, write the state and copy, then re-enable the button. Call `form.reset()` only on `accepted`.
- Clear `aria-invalid` on a control's `input` event.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test:unit`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/scripts/forms/submit.ts src/scripts/forms/enhance.ts tests/unit/submit.test.ts tests/unit/enhance.test.ts
git commit -m "feat: add enquiry delivery states with time trap and no silent retry"
```

---

### Task 5: Proof pages, the enquiry form component and no-JS thanks pages

**Files:**
- Create: `src/components/forms/EnquiryForm.astro`, `src/pages/proof/forms/[provider].astro`, `src/pages/thanks/demo.astro`, `src/pages/thanks/farmers.astro`, `src/styles/proof.css`, `tests/e2e/forms-proof.spec.ts`

**Interfaces:**
- Consumes: `getFormConfig`, `resolveOrigin`, `Provider`, `FormType`, `FormConfig` (Task 3); the field constants (Task 3); `enhanceForm` (Task 4); `layers.css` and `tokens.css` (Task 2).
- Produces:
  - Routes `/proof/forms/web3forms/` and `/proof/forms/formspree/`, each holding both forms.
  - Routes `/thanks/demo/` and `/thanks/farmers/`.
  - `EnquiryForm.astro` with props `{ formType: FormType; config: FormConfig | null; turnstileSiteKey?: string }`. Phase 2 restyles this component.

- [ ] **Step 1: Write the failing e2e tests**

```ts
// tests/e2e/forms-proof.spec.ts — key assertions (helpers fill the required fields)
test('proof and thanks pages are noindex', async ({ page }) => {
  for (const p of ['/proof/forms/web3forms/', '/proof/forms/formspree/', '/thanks/demo/', '/thanks/farmers/']) {
    await page.goto(p);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  }
});

test('JS: software demo is accepted and the form resets', async ({ page }) => {
  await page.clock.install();
  const posts: string[] = [];
  await page.route('https://api.web3forms.com/submit', async (r) => {
    posts.push(r.request().postDataBuffer()?.toString() ?? '');
    await r.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
  });
  await page.goto('/proof/forms/web3forms/');
  const form = page.locator('form[data-form-type="software-demo"]');
  await fillSoftware(form);
  await page.clock.fastForward(4000);
  await form.getByRole('button', { name: 'Request a demo' }).click();
  await expect(form.locator('[data-form-status]')).toHaveText('Your enquiry was submitted. Thank you.');
  await expect(form.getByLabel('Your name')).toHaveValue('');
  expect(posts).toHaveLength(1);
  expect(posts[0]).toContain('software-demo');
  expect(posts[0]).toContain('e2e-w3f-software');
});

test('JS: a network failure is unconfirmed, keeps values and does not retry', async ({ page }) => {
  await page.clock.install();
  let calls = 0;
  await page.route('https://api.web3forms.com/submit', (r) => { calls++; return r.abort('failed'); });
  await page.goto('/proof/forms/web3forms/');
  const form = page.locator('form[data-form-type="farmer-services"]');
  await fillFarmer(form, { mobile: '+91 98765 43210' });
  await page.clock.fastForward(4000);
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(form.locator('[data-form-status]')).toContainText("We couldn't confirm");
  await expect(form.getByLabel('Mobile number')).toHaveValue('+91 98765 43210');
  expect(calls).toBe(1);
});

test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('farmer enquiry posts natively and lands on the thanks page', async ({ page, baseURL }) => {
    let body = '';
    await page.route('https://formspree.io/f/e2efarmer', async (r) => {
      body = r.request().postData() ?? '';
      await r.fulfill({ status: 303, headers: { Location: `${baseURL}/thanks/farmers/` } });
    });
    await page.goto('/proof/forms/formspree/');
    const form = page.locator('form[data-form-type="farmer-services"]');
    await fillFarmer(form, { mobile: '09876543210' });
    await form.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page).toHaveURL(/\/thanks\/farmers\/$/);
    expect(body).toContain('form_type=farmer-services');
    expect(body).toContain('_next=https%3A%2F%2Fbhoomitech.in%2Fthanks%2Ffarmers%2F');
    expect(page.url()).not.toContain('name='); // personal data travels in the POST body, never a URL
  });
  test('an invalid mobile number blocks the native submit', async ({ page }) => {
    let calls = 0;
    await page.route('https://formspree.io/f/e2efarmer', (r) => { calls++; return r.abort(); });
    await page.goto('/proof/forms/formspree/');
    const form = page.locator('form[data-form-type="farmer-services"]');
    await fillFarmer(form, { mobile: '12345' });
    await form.getByRole('button', { name: 'Send enquiry' }).click();
    await expect(page).toHaveURL(/\/proof\/forms\/formspree\/$/);
    expect(calls).toBe(0);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test:e2e`
Expected: FAIL. `/proof/forms/web3forms/` returns 404.

- [ ] **Step 3: Implement `EnquiryForm.astro`**

**The `<form>` element:**
- `method="post"`, `action={config.action}`
- `data-enquiry-form`, `data-form-type={formType}`, `data-honeypot={config.honeypotField}`
- Every entry in `config.hidden` becomes a hidden input. Also add hidden `source_page` (from `Astro.url.pathname`) and `lang` (`en`).

**Honeypot:** a text input named `config.honeypotField` inside a wrapper with `aria-hidden="true"`, positioned off-screen with CSS (not `display:none`). The input has `tabindex="-1"` and `autocomplete="off"`.

**Fields.** Labels sit above each field and are always visible. These label strings are used by the e2e tests.

*Software demo* (button **Request a demo**):

| Label | Type and attributes | Required |
|---|---|---|
| Your name | text, `autocomplete="name"` | yes |
| Farm or company name | text, `autocomplete="organization"` | yes |
| Work email | email, `autocomplete="email"` | yes |
| Phone or WhatsApp (optional) | tel, `inputmode="tel"`, `autocomplete="tel"` | no |
| Type of farm | select from `FARM_TYPES` | yes |
| Anything you'd like us to know (optional) | textarea, `maxlength="500"` | no |

*Farmer services* (button **Send enquiry**):

| Label | Type and attributes | Required |
|---|---|---|
| Your name | text | yes |
| Mobile number | tel, `inputmode="tel"`, `pattern={INDIAN_MOBILE_PATTERN}`, `title="Please check the number. It should have 10 digits."` | yes |
| Village / town and district | text | yes |
| What do you need help with? (optional) | checkbox group from `FARMER_NEEDS`, name `needs` | no |
| Best time to call (optional) | select from `CALL_TIMES` | no |
| Language (optional) | select from `CALL_LANGUAGES` | no |

**Below each form:**
- A status element: `<p data-form-status role="status" aria-live="polite"></p>`.
- Consent copy, verbatim from `03-software-farmers-contact.md` §4.2 and §4.3:
  - Software: "By sending this, you agree that Bhoomi Tech may contact you about your enquiry. We won't share your details."
  - Farmer: "By sending, you agree that Bhoomi Tech may call or WhatsApp you about this. We won't share your details."
  - No privacy link until the Phase 2 privacy page exists.

**Turnstile:** on the software-demo form only, and only when `turnstileSiteKey` is non-empty. Render `<div class="cf-turnstile" data-sitekey={turnstileSiteKey}>` and load `https://challenges.cloudflare.com/turnstile/v0/api.js` (async, defer).

**When `config` is null:** render `<p>Not configured. Set the provider's PUBLIC_* variables (see .env.example).</p>` instead of the form.

- [ ] **Step 4: Implement the proof page and the thanks pages**

**`[provider].astro`:**
- `getStaticPaths` returns `web3forms` and `formspree`.
- The `<head>` has `<meta name="robots" content="noindex, nofollow">` and the title `Form proof · <provider>`.
- It imports `layers.css`, `tokens.css` and `proof.css`. `proof.css` is minimal layout: a single column, max-width 40rem, `--space-*` gaps, body text `--color-ink-50` on `--color-soil-900`.
- `origin = resolveOrigin(process.env)`.
- Render `<EnquiryForm formType="software-demo">`, then `<EnquiryForm formType="farmer-services">`. Pass each `getFormConfig(provider, type, import.meta.env, origin)`.
- Pass `turnstileSiteKey={import.meta.env.PUBLIC_TURNSTILE_SITE_KEY}` to the software-demo form only.
- Add `<script>` that imports `enhanceForm` and runs it for each `form[data-enquiry-form]`.

**Thanks pages:** noindex, same stylesheets.
- H1 text: `Thanks. Your demo request was sent.` and `Thanks. Your enquiry was sent.`
- Each has one link: "Back to bhoomitech.in" → `/`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm run test:e2e`
Expected: PASS (all of `forms-proof.spec.ts` and `placeholder.spec.ts`).

- [ ] **Step 6: Commit**

```bash
git add src/components src/pages/proof src/pages/thanks src/styles/proof.css tests/e2e/forms-proof.spec.ts
git commit -m "feat: add form proof pages for both providers with no-JS thanks pages"
```

---

### Task 6: Cloudflare headers, CI, Lighthouse budgets and the GitHub Pages build

**Files:**
- Create: `public/_headers`, `tests/unit/headers.test.ts`, `.github/workflows/ci.yml`, `lighthouserc.json`
- Modify: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: the npm scripts from Task 1.
- Produces: a CI check that runs on every PR and every push to `main` and `phase-*`.

- [ ] **Step 1: Write the failing headers test**

```ts
// tests/unit/headers.test.ts
import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const blocks = Object.fromEntries(
  readFileSync('public/_headers', 'utf8').split(/\n(?=\S)/).map((b) => {
    const [path, ...rules] = b.trim().split('\n');
    return [path.trim(), rules.map((r) => r.trim()).filter(Boolean)];
  }),
);

it('marks preview hosts, proof and thanks pages noindex', () => {
  for (const p of ['https://:project.pages.dev/*', '/proof/*', '/thanks/*'])
    expect(blocks[p]).toContain('X-Robots-Tag: noindex');
});
it('sets baseline security headers on every path', () => {
  expect(blocks['/*']).toEqual(expect.arrayContaining([
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Permissions-Policy: camera=(), microphone=(), geolocation=()',
  ]));
});
it('caches hashed build assets immutably', () => {
  expect(blocks['/_astro/*']).toContain('Cache-Control: public, max-age=31536000, immutable');
});
```

- [ ] **Step 2: Run the test to verify it fails, then write `public/_headers` with exactly those blocks**

Run: `npm run test:unit`
Expected: FAIL (ENOENT on `public/_headers`).

After writing the file, the test passes.

- [ ] **Step 3: Write `lighthouserc.json`**

```json
{ "ci": {
  "collect": { "staticDistDir": "./dist", "url": ["http://localhost/index.html"], "numberOfRuns": 3 },
  "assert": { "assertions": {
    "categories:performance": ["error", { "minScore": 0.85 }],
    "categories:accessibility": ["warn", { "minScore": 0.95 }],
    "largest-contentful-paint": ["error", { "maxNumericValue": 3000 }],
    "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
    "total-blocking-time": ["error", { "maxNumericValue": 300 }],
    "total-byte-weight": ["error", { "maxNumericValue": 327680 }],
    "resource-summary:script:size": ["error", { "maxNumericValue": 35840 }]
  } },
  "upload": { "target": "filesystem", "outputDir": ".lighthouseci" }
} }
```

Accessibility is `warn` only while the legacy placeholder is the homepage; Phase 1 flips it to `error`. Reports stay local and are never uploaded to public storage.

Run: `npm run build && npm run lhci`
Expected: all `error` assertions pass. If the placeholder breaks a budget, stop and report it; don't loosen the budget.

- [ ] **Step 4: Write `.github/workflows/ci.yml`**

Trigger on `pull_request`, and on `push` to `main` and `phase-*`. One `verify` job on `ubuntu-latest` runs these steps:
1. `actions/checkout@v4`
2. `actions/setup-node@v4` with `node-version-file: .node-version` and `cache: npm`
3. `npm ci`
4. `npm run check`
5. `npm run test:unit`
6. `npx playwright install --with-deps chromium`
7. `npm run test:e2e`
8. `npm run build` (a production-mode rebuild, so Lighthouse never sees e2e keys)
9. `npm run lhci`
10. Upload `.lighthouseci/` and `playwright-report/` as artifacts when the job fails

- [ ] **Step 5: Update `.github/workflows/deploy.yml` so GitHub Pages keeps serving the placeholder after merge**

Keep the permissions, concurrency, environment, Configure, Upload (`path: dist`) and Deploy steps. Between Checkout and Configure Pages, insert:
1. `actions/setup-node@v4` (node-version-file `.node-version`, cache npm)
2. `npm ci`
3. `npm run build`
4. `test -f dist/CNAME && test -f dist/index.html`

That last check makes a deploy fail instead of dropping the custom domain.

- [ ] **Step 6: Run the full local check**

Run: `npm run check && npm run test:unit && npm run test:e2e && npm run build && npm run lhci`
Expected: everything passes. `dist/CNAME` and `dist/_headers` exist.

- [ ] **Step 7: Commit**

```bash
git add public/_headers tests/unit/headers.test.ts lighthouserc.json .github/workflows
git commit -m "ci: add CI with Lighthouse budgets, Cloudflare headers and an Astro build for Pages"
```

---

### Task 7: Accounts, Cloudflare Pages preview and the form proof run (owner + lead)

**Owner gate.** Rohit (or someone he names) does the account steps, because Claude must not create accounts or handle credentials. The lead runs the submissions and records the results.

**Files:**
- Create: `docs/plan/proofs/phase-0-proofs.md`
- Modify: `docs/plan/00-master-plan.md` (§7.6: the decided provider)

- [ ] **Step 1 (Rohit): Approve pushing `phase-0-foundation`.** Confirm CI runs green on GitHub.
- [ ] **Step 2 (Rohit): Create accounts under a Bhoomi Tech email:** Cloudflare, Web3Forms and Formspree.
- [ ] **Step 3 (Rohit): Name two test inboxes** you own: one for software demos, one for farmer enquiries. The branded `sales@` and `farmers@` on bhoomitech.in, with SPF and DKIM, are the target. Setting them up depends on who hosts email for the domain, which may cost money, so that's your call.
- [ ] **Step 4 (Rohit): In Cloudflare, create a Pages project** connected to `mysteryyoi/bhoomitech`:
  - production branch `main`
  - build command `npm run build`
  - output directory `dist`
  - Node comes from `.node-version`
- [ ] **Step 5 (Rohit): Create one Web3Forms access key per inbox and one Formspree form per inbox.** Create a Turnstile widget for `bhoomitech.in` and `*.bhoomitech.pages.dev`. Add the five `PUBLIC_*` values as **Preview** environment variables in the Pages project. If a provider supports Turnstile verification, enter the Turnstile secret in that provider's dashboard, not in the repo.
- [ ] **Step 6 (lead): Create `docs/plan/proofs/phase-0-proofs.md` with the proof matrix**

Columns: Provider · Form · JS on/off · Received in the right inbox? · Subject tag correct? · No-JS redirect to `/thanks/…`? · Auto-reply? · Turnstile verified server-side? · Notes.

There are eight rows: 2 providers × 2 forms × JS on/off. Below the matrix, add one row per provider for each of these:
- Sheet or webhook backup available on the free tier?
- **Over-quota behaviour and alert** (Review Focus 5)
- Free-tier limit
- Data location and retention
- Field-name differences from Task 3

Then add a line for Umami Cloud's current free-tier limits (master plan §2.1).

- [ ] **Step 7 (lead): Run all eight submissions on the preview URL and fill in every cell**

Submit from a real phone for at least the two no-JS farmer rows. Use obviously fake test names.

Expected: each cell is filled with ✅/❌ and evidence (inbox timestamp or screenshot name). No blanks.

- [ ] **Step 8 (lead): Decide the provider**

Choose the provider that passes every row of A3's requirement list (master plan §7.6). Write the decision and its reasons at the top of the proofs doc. Update §7.6 in the master plan from "decided by a proof" to the chosen provider. If neither passes, say so and propose the Pages Function path (A4 §6). Don't force a pick.

- [ ] **Step 9: Commit**

```bash
git add docs/plan/proofs/phase-0-proofs.md docs/plan/00-master-plan.md
git commit -m "docs: record Phase 0 form and hosting proof results and provider decision"
```

---

### Task 8: DNS cutover to Cloudflare and retiring GitHub Pages (owner gate)

**Precondition:** Rohit has merged `phase-0-foundation` into `main`, and both https://bhoomitech.in (GitHub Pages) and the Cloudflare production URL show the identical placeholder.

**Files:**
- Delete: `.github/workflows/deploy.yml`, `public/CNAME`, `public/.nojekyll`
- Modify: `README.md` (hosting section)

- [ ] **Step 1 (Rohit): Move DNS to Cloudflare**
  1. Add `bhoomitech.in` to Cloudflare and switch the nameservers at the registrar.
  2. Add `bhoomitech.in` and `www.bhoomitech.in` as custom domains on the Pages project.
  3. Add a redirect rule `www` → apex (301).
- [ ] **Step 2: Verify that the domain is served by Cloudflare with our headers**

Run: `curl -sI https://bhoomitech.in/ | grep -iE "^(server|x-content-type-options|referrer-policy)"`
Expected:
- `server: cloudflare`
- `x-content-type-options: nosniff`
- `referrer-policy: strict-origin-when-cross-origin`

Run: `curl -sI https://www.bhoomitech.in/`
Expected: `301` with `location: https://bhoomitech.in/`.

- [ ] **Step 3: Retire the GitHub Pages deploy (on a branch, for Rohit to merge)**

```bash
git switch -c phase-0-retire-gh-pages
git rm .github/workflows/deploy.yml public/CNAME public/.nojekyll
```

Update the README hosting section: production is Cloudflare Pages from `main`, and every branch gets a noindex preview URL.

Run: `npm run build && test ! -f dist/CNAME`
Expected: success.

- [ ] **Step 4 (Rohit): After merging, turn off GitHub Pages** in the repo's Settings → Pages.
- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: retire GitHub Pages after DNS cutover to Cloudflare Pages"
```

---

## Phase 0 exit check (master plan §9)

- [ ] The host is confirmed and serving: Task 8, Step 2 output pasted into the proofs doc.
- [ ] The build is reproducible: CI is green on `main` from a clean `npm ci` with the committed lockfile.
- [ ] A test enquiry from **each** form reached **each** test inbox **with and without JS**: every cell of the Task 7 matrix is filled, and a provider has been chosen.
- [ ] The placeholder is visually unchanged at https://bhoomitech.in.
