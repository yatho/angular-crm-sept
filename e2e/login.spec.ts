import { test, expect } from '@playwright/test';
import { LoginPage } from './login.page';

test.describe('Login', () => {
  test('a failed login displays an error message and does not route', async ({ page }) => {
    // Mock the API call to simulate a failed login
    await page.route('**/api/auth/login', (route) => {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ message: 'Unauthorized' }),
      });
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Fill in the form
    await loginPage.login('test@example.com', 'password');

    // Verify that the error message is displayed
    await loginPage.getErrorMessage();

    // Verify that no routing has occurred
    await expect(page).toHaveURL('/login');
  });

  test('a successful login routes to the home page', async ({ page }) => {
    // Mock the API call to simulate a successful login
    await page.route('**/api/auth/login', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          user: { id: 1, name: 'Test User' },
          token: 'test-token',
        }),
      });
    });

    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Fill in the form
    await loginPage.login('test@example.com', 'password');

    // Verify that routing to the home page has occurred
    await expect(page).toHaveURL('/home');
  });
});
