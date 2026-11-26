import { test, expect } from '@playwright/test';

test('home serves the coming-soon placeholder unchanged', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  const res = await page.goto('/');
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle('Bhoomitech — Something good is taking shape.');
  await expect(page.locator('h1#headline')).toContainText('taking shape.');
  await expect(page.locator('link[rel="icon"][href="favicon.svg"]')).toHaveCount(1);
  const css = await page.request.get('/styles.css');
  expect(css.status()).toBe(200);
  expect(errors).toEqual([]);
});
