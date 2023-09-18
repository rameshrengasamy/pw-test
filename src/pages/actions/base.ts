import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(`${path}`);
  }

  async getDropDownSelectedValue(selector: string): Promise<string> {
    return await this.page.$eval<string, HTMLSelectElement>(
      selector,
      (ele) => ele.value,
    );
  }

  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }

  async getElement(selector: string): Promise<Locator> {
    return this.page.locator(selector);
  }

  async setValue(selector: string, value: string) {
    await this.page.locator(selector).fill(value);
    await expect(this.page.locator(selector)).toHaveValue(value);
  }
}
