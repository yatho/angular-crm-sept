import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly snackBar: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = this.page.getByRole('textbox', { name: /email/i });
    this.passwordInput = this.page.getByRole('textbox', { name: /password/i });
    this.submitButton = this.page.getByRole('button', { name: /validate/i });
    this.snackBar = this.page.locator('simple-snack-bar');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username = 'test@test.fr', password_e2e = 'password_e2e') {
    await this.goto();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password_e2e);
    await this.submitButton.click();
  }

  async getErrorMessage() {
    await this.snackBar.waitFor();
    const text = await this.snackBar.textContent();
    expect(text).toContain('Authentification en erreur, merci de réessayer');
  }
}
