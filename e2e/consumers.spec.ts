import { test, expect } from '@playwright/test';
import { LoginPage } from './login.page';
import { ConsumersPage } from './consumers.page';

test.describe('Consumers', () => {
  let loginPage: LoginPage;
  let consumersPage: ConsumersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    consumersPage = new ConsumersPage(page);
    await page.route('**/api/auth/login', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: { id: 1, name: 'Test User' },
          token: 'test-token',
        }),
      });
    });
    await loginPage.login();
  });

  test('should display a list of consumers', async ({ page }) => {
    await consumersPage.navigateTo();

    await page.route('**/api/consumers', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify([
          { id: 1, civility: 'Mr', firstname: 'John', lastname: 'Doe', email: 'john.doe@test.com', phone: '1234567890' },
          { id: 2, civility: 'Mrs', firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@test.com', phone: '0987654321' },
        ]),
      });
    });

    await consumersPage.navigateTo();

    await expect(page.locator('tbody tr')).toHaveCount(2);
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(1)')).toHaveText('Mr');
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(2)')).toHaveText('John');
    await expect(page.locator('tbody tr:nth-child(1) td:nth-child(3)')).toHaveText('Doe');
    await expect(page.locator('tbody tr:nth-child(2) td:nth-child(1)')).toHaveText('Mrs');
    await expect(page.locator('tbody tr:nth-child(2) td:nth-child(2)')).toHaveText('Jane');
    await expect(page.locator('tbody tr:nth-child(2) td:nth-child(3)')).toHaveText('Smith');
  });
});
