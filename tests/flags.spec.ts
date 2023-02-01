import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('can create flag', async ({ page }) => {
  await page.getByRole('button', { name: 'New Flag' }).click();
  await page.getByLabel('Name').fill('Hello Test');
  await page.getByLabel('Description').click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('switch', { name: 'Enabled' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('link', { name: 'Flags', exact: true }).click();
});

test('can update flag with variants', async ({ page }) => {
  await page.getByRole('link', { name: 'hello-test' }).click();
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill("i'm a test");
  await page.getByRole('button', { name: 'Update' }).click();
  await page.getByRole('button', { name: 'Add Variant' }).click();
  await page
    .getByRole('dialog', { name: 'New Variant' })
    .locator('#key')
    .click();
  await page
    .getByRole('dialog', { name: 'New Variant' })
    .locator('#key')
    .fill('chrome');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'New Variant' }).click();
  await page
    .getByRole('dialog', { name: 'New Variant' })
    .locator('#key')
    .click();
  await page
    .getByRole('dialog', { name: 'New Variant' })
    .locator('#key')
    .fill('firefox');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('link', { name: 'Edit ,chrome' }).click();
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .locator('#description')
    .click();
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .locator('#description')
    .fill('chrome browser');
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .getByRole('button', { name: 'Update' })
    .click();
  await page.getByRole('link', { name: 'Edit ,firefox' }).click();
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .locator('#description')
    .click();
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .locator('#description')
    .fill('firefox browser');
  await page
    .getByRole('dialog', { name: 'Edit Variant' })
    .getByRole('button', { name: 'Update' })
    .click();
});
