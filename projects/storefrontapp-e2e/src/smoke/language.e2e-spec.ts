import { browser, ExpectedConditions as EC } from 'protractor';

import { ProductDetailsPage } from '../page-objects/product-details.po';
import { LoginPage } from '../page-objects/login/login.po';

describe('Language switcher', () => {
  let productPage: ProductDetailsPage;
  let loginPage: LoginPage;
  const PRODUCT_ID = '3595723';

  beforeEach(async () => {
    productPage = new ProductDetailsPage();
    loginPage = new LoginPage();
  });

  afterEach(async () => {
    await loginPage.navigateTo();
    await loginPage.waitForReady();
    await loginPage.header.languageSwitcher.click();
    await loginPage.header.languageOption('en').click();
  });

  it('switch should work and language should be persistent', async () => {
    const NOTICE_EN =
      'Copyright © 2018 SAP SE or an SAP affiliate company. All rights reserved.';
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    const location = await browser.getCurrentUrl();
    expect(await productPage.footer.notice.getText()).toContain(NOTICE_EN);
    await productPage.header.languageSwitcher.click();
    await productPage.header.languageOption('de').click();
    // location after changing location shouldn't change
    expect(await browser.getCurrentUrl()).toBe(location);
    // reload keeps the language settings
    await browser.refresh();
    await productPage.waitForReady();
  });

  it('user input should not be removed on language change', async () => {
    const TEST_EMAIL = 'testEmail';
    await loginPage.navigateTo();
    await loginPage.waitForReady();
    await loginPage.loginForm.emailField.sendKeys(TEST_EMAIL);
    await loginPage.header.languageSwitcher.click();
    await loginPage.header.languageOption('de').click();
    // language should change
    expect(loginPage.loginForm.emailField.getAttribute('value')).toEqual(
      TEST_EMAIL
    );
  });
});
