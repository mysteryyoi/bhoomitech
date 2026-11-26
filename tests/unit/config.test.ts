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
