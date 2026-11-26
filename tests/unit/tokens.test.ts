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
