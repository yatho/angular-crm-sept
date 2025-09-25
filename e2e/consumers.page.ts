import { Page } from '@playwright/test';

export class ConsumersPage {
  constructor(private page: Page) {}

  async navigateTo() {
    await this.page.click('a[routerLink="/consumer"]');
  }
}
