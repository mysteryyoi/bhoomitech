# Bhoomitech website

Static site for **bhoomitech.in**, built with Astro.

## Requirements

- Node 24.22.3 (see `.node-version`)

## Run

```
npm ci
npm run dev
```

## Test

```
npm run check
npm run test:unit
npm run test:e2e
```

## Environment variables

Copy `.env.example` to `.env` and fill in the values. They are public identifiers (not secrets), set per Cloudflare Pages environment.

| Variable | Purpose |
|---|---|
| `PUBLIC_WEB3FORMS_KEY_SOFTWARE` | Web3Forms access key, software demo form |
| `PUBLIC_WEB3FORMS_KEY_FARMER` | Web3Forms access key, farmer services form |
| `PUBLIC_FORMSPREE_ID_SOFTWARE` | Formspree form ID, software demo form |
| `PUBLIC_FORMSPREE_ID_FARMER` | Formspree form ID, farmer services form |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |

`.env.e2e` holds fake values used only by `--mode e2e` (the Playwright tests) and is committed.

## Build

`npm run build` writes `dist/`. It is build output and is not committed.

## Hosting

GitHub Pages until the Phase 0 DNS cutover, then Cloudflare Pages.
