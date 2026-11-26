import { submitEnquiry } from './submit';

export const STATUS_COPY: Record<'invalid' | 'sending' | 'accepted' | 'rejected' | 'unconfirmed', string> = {
  invalid: 'Please check the highlighted fields.',
  sending: 'Sending…',
  accepted: 'Your enquiry was submitted. Thank you.',
  rejected: "We couldn't submit your enquiry. Your details are still here, so you can try again.",
  unconfirmed:
    "We couldn't confirm whether your enquiry was received. Your details are still here. Sending again may create a second enquiry.",
};

type FieldControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function enhanceForm(
  form: HTMLFormElement,
  deps: { submit?: typeof submitEnquiry; now?: () => number } = {},
): void {
  const submit = deps.submit ?? submitEnquiry;
  const now = deps.now ?? Date.now;
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const button = form.querySelector<HTMLButtonElement>('button[type=submit]');

  form.noValidate = true;
  form.dataset.state = 'idle';
  const loadedAt = now();
  let inFlight = false;

  const setState = (state: keyof typeof STATUS_COPY) => {
    form.dataset.state = state;
    if (status) status.textContent = STATUS_COPY[state];
  };

  form.addEventListener('input', (e) => {
    const t = e.target as Element | null;
    if (t && t.hasAttribute('aria-invalid')) t.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (inFlight) return;

    if (!form.checkValidity()) {
      const invalid = Array.from(form.elements).filter(
        (el): el is FieldControl => 'validity' in el && !(el as FieldControl).validity.valid,
      );
      invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
      setState('invalid');
      invalid[0]?.focus();
      return;
    }

    inFlight = true;
    setState('sending');
    if (button) button.disabled = true;
    try {
      let outcome;
      try {
        outcome = await submit(form, { loadedAt, honeypotField: form.dataset.honeypot! });
      } catch {
        outcome = { state: 'unconfirmed' as const };
      }
      setState(outcome.state);
      if (outcome.state === 'accepted') form.reset();
    } finally {
      if (button) button.disabled = false;
      inFlight = false;
    }
  });
}
