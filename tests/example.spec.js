// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("React Code Test");
});

test('get first record', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check table first cell is "Leanne Graham"
  await expect(page.locator('tbody tr:first-child td:first-child')).toHaveText('Leanne Graham');

});

test('Go to detail page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click on first record view link
  await page.getByRole('row', { name: 'Leanne Graham Sincere@april.biz 1-770-736-8031 x56442 View' }).getByRole('link', { name: 'View' }).click();

  // Check name is "Leanne Graham"
  await expect(page.getByText('Leanne Graham')).toHaveText('Leanne Graham');

});
