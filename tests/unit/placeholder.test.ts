import { it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// SHA-256 of the LF-normalised originals (dist/* at commit d080a6d).
const PINNED: Record<string, string> = {
  'src/pages/index.astro': 'a9855105f8d6ac58c2909d95acbe02cf65751b41307c6fac036463a2b060c328',
  'public/styles.css': '5f09e235fb9c2be39feca9c235b7296c6d324cdccf91e9d95265004a93a19385',
  'public/favicon.svg': 'c528ff6777ebec75edffc33f874aadeb03ee4e2028a5a6ceafabf8e37f36b273',
};

it.each(Object.entries(PINNED))('%s still matches the original placeholder', (file, hash) => {
  const text = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  expect(createHash('sha256').update(text).digest('hex')).toBe(hash);
});
