export type Provider = 'web3forms' | 'formspree';
export type FormType = 'software-demo' | 'farmer-services';

export interface FormConfig {
  action: string;
  hidden: Record<string, string>;
  honeypotField: string;
}

type Env = Record<string, string | undefined>;

const PRODUCTION_ORIGIN = 'https://bhoomitech.in';

const SUBJECTS: Record<FormType, string> = {
  'software-demo': '[DEMO] Software demo enquiry',
  'farmer-services': '[FARMER] Farmer services enquiry',
};

const THANKS_PATHS: Record<FormType, string> = {
  'software-demo': '/thanks/demo/',
  'farmer-services': '/thanks/farmers/',
};

const ENV_KEYS: Record<Provider, Record<FormType, string>> = {
  web3forms: {
    'software-demo': 'PUBLIC_WEB3FORMS_KEY_SOFTWARE',
    'farmer-services': 'PUBLIC_WEB3FORMS_KEY_FARMER',
  },
  formspree: {
    'software-demo': 'PUBLIC_FORMSPREE_ID_SOFTWARE',
    'farmer-services': 'PUBLIC_FORMSPREE_ID_FARMER',
  },
};

export function getFormConfig(
  provider: Provider,
  formType: FormType,
  env: Env,
  origin: string,
): FormConfig | null {
  const key = env[ENV_KEYS[provider][formType]]?.trim();
  if (!key) return null;
  const thanks = new URL(THANKS_PATHS[formType], origin).href;
  const subject = SUBJECTS[formType];

  if (provider === 'web3forms') {
    return {
      action: 'https://api.web3forms.com/submit',
      honeypotField: 'botcheck',
      hidden: { access_key: key, subject, redirect: thanks, form_type: formType },
    };
  }
  return {
    action: `https://formspree.io/f/${key}`,
    honeypotField: '_gotcha',
    hidden: { _subject: subject, _next: thanks, form_type: formType },
  };
}

export function resolveOrigin(env: Env, site: string = PRODUCTION_ORIGIN): string {
  const branch = env.CF_PAGES_BRANCH;
  if (branch && branch !== 'main' && env.CF_PAGES_URL) return env.CF_PAGES_URL;
  return site;
}
