import { describe, it, expect, vi, afterEach } from 'vitest';
import { enhanceForm, STATUS_COPY } from '../../src/scripts/forms/enhance';
import type { DeliveryOutcome } from '../../src/scripts/forms/submit';

function setup(submit: ReturnType<typeof vi.fn>) {
  document.body.innerHTML = `
    <form data-enquiry-form data-honeypot="botcheck" action="https://example.test/submit">
      <input name="name" required />
      <input name="botcheck" />
      <p data-form-status role="status" aria-live="polite"></p>
      <button type="submit">Send</button>
    </form>`;
  const form = document.querySelector('form')!;
  enhanceForm(form, { submit: submit as never, now: () => 1000 });
  return {
    form,
    name: form.querySelector<HTMLInputElement>('input[name=name]')!,
    button: form.querySelector<HTMLButtonElement>('button')!,
    status: form.querySelector<HTMLElement>('[data-form-status]')!,
  };
}

const fire = (form: HTMLFormElement) =>
  form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
const flush = () => new Promise((r) => setTimeout(r, 0));

afterEach(() => {
  document.body.innerHTML = '';
  delete (window as { turnstile?: unknown }).turnstile;
});

function setupTurnstile(submit: ReturnType<typeof vi.fn>, token: string | null) {
  const ctx = setup(submit);
  ctx.form.insertAdjacentHTML(
    'afterbegin',
    '<div class="cf-turnstile"></div>' + (token === null ? '' : `<input type="hidden" name="cf-turnstile-response" value="${token}">`),
  );
  ctx.name.value = 'Asha';
  return ctx;
}

describe('enhanceForm', () => {
  it('marks the form invalid and focuses the first invalid field without sending', () => {
    const submit = vi.fn();
    const { form, name, status } = setup(submit);
    fire(form);
    expect(form.dataset.state).toBe('invalid');
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(status.textContent).toBe(STATUS_COPY.invalid);
    expect(submit).not.toHaveBeenCalled();
  });

  it('clears aria-invalid when the user edits the field', () => {
    const { form, name } = setup(vi.fn());
    fire(form);
    name.dispatchEvent(new Event('input', { bubbles: true }));
    expect(name.hasAttribute('aria-invalid')).toBe(false);
  });

  it('ignores a second submit while sending', async () => {
    let resolve!: (o: DeliveryOutcome) => void;
    const submit = vi.fn(() => new Promise<DeliveryOutcome>((r) => (resolve = r)));
    const { form, name, button, status } = setup(submit);
    name.value = 'Asha';
    fire(form);
    fire(form);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(button.disabled).toBe(true);
    expect(form.dataset.state).toBe('sending');
    expect(status.textContent).toBe(STATUS_COPY.sending);
    resolve({ state: 'rejected' });
    await flush();
    expect(button.disabled).toBe(false);
  });

  it('passes loadedAt and the honeypot field to submit', async () => {
    const submit = vi.fn().mockResolvedValue({ state: 'rejected' });
    const { form, name } = setup(submit);
    name.value = 'Asha';
    fire(form);
    await flush();
    expect(submit).toHaveBeenCalledWith(form, { loadedAt: 1000, honeypotField: 'botcheck' });
  });

  it('resets the form only after an accepted outcome', async () => {
    const submit = vi.fn().mockResolvedValue({ state: 'accepted' });
    const { form, name } = setup(submit);
    name.value = 'Asha';
    fire(form);
    await flush();
    expect(name.value).toBe('');
    expect(form.dataset.state).toBe('accepted');
  });

  it.each(['rejected', 'unconfirmed'] as const)('keeps field values after %s', async (state) => {
    const submit = vi.fn().mockResolvedValue({ state });
    const { form, name, button } = setup(submit);
    name.value = 'Asha';
    fire(form);
    await flush();
    expect(name.value).toBe('Asha');
    expect(form.dataset.state).toBe(state);
    expect(button.disabled).toBe(false);
  });

  it.each(['accepted', 'rejected', 'unconfirmed'] as const)(
    'writes the %s copy into the status region',
    async (state) => {
      const submit = vi.fn().mockResolvedValue({ state });
      const { form, name, status } = setup(submit);
      name.value = 'Asha';
      fire(form);
      await flush();
      expect(status.textContent).toBe(STATUS_COPY[state]);
    },
  );

  it('treats a throwing submit as unconfirmed and allows a later submit', async () => {
    const submit = vi.fn().mockRejectedValue(new Error('boom'));
    const { form, name, button } = setup(submit);
    name.value = 'Asha';
    fire(form);
    await flush();
    expect(form.dataset.state).toBe('unconfirmed');
    expect(button.disabled).toBe(false);
    expect(name.value).toBe('Asha');
    fire(form);
    await flush();
    expect(submit).toHaveBeenCalledTimes(2);
  });

  it('does not submit until the Turnstile token is present', () => {
    const submit = vi.fn();
    const { form, status } = setupTurnstile(submit, '');
    fire(form);
    expect(submit).not.toHaveBeenCalled();
    expect(form.dataset.state).toBe('invalid');
    expect(status.textContent).toBe(STATUS_COPY.challenge);
  });

  it('does not submit when the Turnstile response field is missing', () => {
    const submit = vi.fn();
    const { form } = setupTurnstile(submit, null);
    fire(form);
    expect(submit).not.toHaveBeenCalled();
    expect(form.dataset.state).toBe('invalid');
  });

  it('submits when the Turnstile token is present', async () => {
    const submit = vi.fn().mockResolvedValue({ state: 'rejected' });
    const { form } = setupTurnstile(submit, 'tok');
    fire(form);
    await flush();
    expect(submit).toHaveBeenCalledTimes(1);
  });

  it.each(['accepted', 'rejected', 'unconfirmed'] as const)('resets Turnstile after a %s outcome', async (state) => {
    const reset = vi.fn();
    (window as { turnstile?: unknown }).turnstile = { reset };
    const submit = vi.fn().mockResolvedValue({ state });
    const { form } = setupTurnstile(submit, 'tok');
    fire(form);
    await flush();
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it('turns off native validation once enhanced', () => {
    const { form } = setup(vi.fn());
    expect(form.noValidate).toBe(true);
  });
});
