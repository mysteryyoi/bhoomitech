import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const blocks = Object.fromEntries(
  readFileSync('public/_headers', 'utf8').split(/\n(?=\S)/).map((b) => {
    const [path, ...rules] = b.trim().split('\n');
    return [path.trim(), rules.map((r) => r.trim()).filter(Boolean)];
  }),
);

it('marks preview hosts, proof and thanks pages noindex', () => {
  for (const p of ['https://:project.pages.dev/*', 'https://:version.:project.pages.dev/*', '/proof/*', '/thanks/*'])
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
it('uses the Cloudflare _headers layout: paths at column 0, headers indented by two spaces', () => {
  const lines = readFileSync('public/_headers', 'utf8').split(/\r?\n/).filter((l) => l.trim() !== '');
  for (const l of lines) expect(l).toMatch(/^(?:\S.*|  \S.*)$/);
});
