import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './base';
import * as landingPageSelectors from '../selectors/landingPage.json';

export class LandingPage extends BasePage {
  readonly page: Page;
  readonly layOutDropDown: Locator;
  readonly addComponentDropDown: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.layOutDropDown = page.locator(landingPageSelectors.layoutDropDown);

    this.addComponentDropDown = page.locator(
      landingPageSelectors.addComponentDropDown,
    );
  }

  async goto(path: string) {
    await super.navigate(path);
  }

  async loadLayout(layout: string) {
    await this.layOutDropDown.selectOption(layout);
    const selectedValue = await super.getDropDownSelectedValue(
      landingPageSelectors.layoutDropDown,
    );
    expect(selectedValue).toContain(layout);
    await super.clickElement(landingPageSelectors.loadLayoutButton);
  }

  async changeComponentColor(componentName: string, color: string) {
    await super.clickElement(
      landingPageSelectors.layoutTabs.replace('{title}', `"${componentName}"`),
    );
    await super.setValue(
      landingPageSelectors.componentTextInput.replace(
        '{title}',
        `"${componentName}"`,
      ),
      color,
    );
  }

  async addComponent(componentName: string) {
    await this.addComponentDropDown.selectOption(componentName);
    await super.clickElement(landingPageSelectors.addComponentButton);
  }

  async sendEvent(eventText: string) {
    await super.setValue(landingPageSelectors.eventInputField, eventText);
    await super.clickElement(landingPageSelectors.sendEventBtn);
  }

  async removeComponentsByTitle(title: string) {
    const elements = await this.page.$$(
      landingPageSelectors.closeTabs.replace('{title}', `"${title}"`),
    );
    for await (const ele of elements) {
      await ele.click();
    }
  }

  async removeMultipleComponents(sel: string) {
    const elements = await this.page.$$(sel);
    for await (const ele of elements) {
      await ele.click();
    }
  }

  async saveLayout() {
    await super.clickElement(landingPageSelectors.saveLayout);
  }

  async reloadLayout() {
    await super.clickElement(landingPageSelectors.reloadSavedLayoutBtn);
  }

  async DragAndDropElement(target: Locator, destination: Locator) {
    await target.dragTo(destination);
  }
}
