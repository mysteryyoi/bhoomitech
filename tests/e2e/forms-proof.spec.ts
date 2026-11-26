import { test, expect, type Locator } from '@playwright/test';

async function fillSoftware(form: Locator) {
  await form.getByLabel('Your name').fill('Test Person');
  await form.getByLabel('Farm or company name').fill('Test Farm');
  await form.getByLabel('Work email').fill('test@example.com');
  await form.getByLabel('Type of farm').selectOption({ index: 1 });
}

async function fillFarmer(form: Locator, { mobile }: { mobile: string }) {
  await form.getByLabel('Your name').fill('Test Person');
  await form.getByLabel('Mobile number').fill(mobile);
  await form.getByLabel('Village / town and district').fill('Test Village, Test District');
}

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
  expect(posts[0]).not.toContain('redirect=');
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

test('honeypot is hidden from sight and the tab order', async ({ page }) => {
  await page.goto('/proof/forms/web3forms/');
  const hp = page.locator('form[data-form-type="software-demo"] input[name="botcheck"]');
  await expect(hp).toHaveAttribute('tabindex', '-1');
  const box = await hp.boundingBox();
  expect(box === null || box.x + box.width <= 0).toBe(true); // off-screen, not in the layout
});
