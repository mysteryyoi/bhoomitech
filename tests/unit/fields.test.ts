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
