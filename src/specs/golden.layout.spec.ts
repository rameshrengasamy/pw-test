import {
  test,
  Page,
  type Locator,
  expect,
  ElementHandle,
} from '@playwright/test';
import { BasePage } from '../pages/actions/base';
import { LandingPage } from '../pages/actions/landingPage';
import * as data from '../fixtures/data/landingPage.json';
import * as landingPageSelectors from '../pages/selectors/landingPage.json';
import * as rgbColorMapper from '../fixtures/data/colorMapper.json';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.describe('golden layout landing page landing page tests', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const basePage = new BasePage(page);
    await basePage.navigate('/');
    const title = new RegExp(`${data.titleText}$`);
    await expect(page).toHaveTitle(title);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Load standard layout', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.loadLayout(data.standardLayoutDDValue);
    await expect(
      page.locator(landingPageSelectors.layoutContainerColumn),
    ).toBeVisible();
  });

  test('Change lexcorp plc color to blue', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.changeComponentColor(
      data.lextCorpComponentTitle,
      data.color,
    );
    const sel = page.locator(
      landingPageSelectors.componentText.replace(
        '{title}',
        `"${data.lextCorpComponentTitle}"`,
      ),
    );
    await expect(sel).toHaveCSS('color', rgbColorMapper[data.color]);
  });

  test('Add an Event component, send Test event 123 and validate the received text', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.addComponent(data.eventComponentDDValue);
    await expect(page.locator(landingPageSelectors.sendEventBtn)).toBeVisible();
    await landingPage.sendEvent(data.testEvent);
    const text = new RegExp(`${data.testEvent}$`);
    await expect(
      page.locator(landingPageSelectors.eventRecievedConfirmationSpan),
    ).toHaveText(text);
  });

  test('Remove comp1, comp2 and comp3 components', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.removeMultipleComponents(
      landingPageSelectors.nonActiveCompTabsClose,
    );
    const sel = landingPageSelectors.componentsSelector.replace(
      '{title}',
      `"${data.componentToRemovePartialText}"`,
    );
    expect(await page.locator(sel).count()).toEqual(1);
  });

  test('Save Layout', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.saveLayout();
    await expect(
      page.locator(landingPageSelectors.reloadSavedLayoutBtn),
    ).toHaveText(data.reloadSavedLayoutInnerText);
  });

  test('Load component layout and verify no components displayed', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.loadLayout(data.componentLayoutDDValue);
    const sel = page.locator(
      landingPageSelectors.componentText.replace(
        '{title}',
        `"${data.componentLayoutText}"`,
      ),
    );

    await expect(sel).toBeVisible();
    expect(
      (await page.$$(landingPageSelectors.layoutComponentText)).length,
    ).toEqual(1);
  });

  test('Reload saved layout, send and validate event', async () => {
    const landingPage = new LandingPage(page);
    await landingPage.reloadLayout();
    await landingPage.sendEvent(`New ${data.testEvent}`);
    const text = new RegExp(`New ${data.testEvent}$`);
    await expect(
      page.locator(landingPageSelectors.eventRecievedConfirmationSpan),
    ).toHaveText(text);
  });

  test('Drag comp1 next to Acme, Inc component', async () => {
    const landingPage = new LandingPage(page);
    const basePage = new BasePage(page);
    const targetLocator: Locator = await basePage.getElement(
      landingPageSelectors.layoutTabs.replace('{title}', `"${data.dragTab}"`),
    );
    const destinationLocator: Locator = await basePage.getElement(
      landingPageSelectors.layoutTabs.replace('{title}', `"${data.dropTab}"`),
    );
    await landingPage.DragAndDropElement(targetLocator, destinationLocator);
    const previousSibling: ElementHandle = (await targetLocator.evaluateHandle(
      (node) => node.previousSibling,
    )) as ElementHandle;
    const nextSibling: ElementHandle = (await targetLocator.evaluateHandle(
      (node) => node.nextSibling,
    )) as ElementHandle;
    expect(await previousSibling.asElement().textContent()).toMatch(/Acme/);
    expect(await nextSibling.asElement().textContent()).toMatch(/LexCorp/);
  });
});
