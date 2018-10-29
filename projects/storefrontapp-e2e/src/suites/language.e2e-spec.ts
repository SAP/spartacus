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

  it('switch should work and language should be persistent', async () => {
    const NOTICE_EN =
      'Copyright © 2018 SAP SE or an SAP affiliate company. All rights reserved.';
    const NOTICE_DE = '© 2016 hybris GmbH';
    await productPage.navigateTo(PRODUCT_ID);
    await productPage.waitForReady();
    const location = await browser.getCurrentUrl();
    expect(await productPage.footer.notice.getText()).toContain(NOTICE_EN);
    await productPage.header.languageSwitcher.click();
    await productPage.header.languageDe.click();
    // language should change
    await browser.wait(
      EC.textToBePresentInElement(productPage.footer.notice, NOTICE_DE),
      5000
    );
    // location after changing location shouldn't change
    expect(await browser.getCurrentUrl()).toBe(location);
    // reload keeps the language settings
    await browser.refresh();
    await productPage.waitForReady();
    expect(await productPage.footer.notice.getText()).toContain(NOTICE_DE);
  });

  it('user input should not be removed on language change', async () => {
    const TEST_EMAIL = 'testEmail';
    const TEST_PASSWORD = 'testPassword';
    await loginPage.navigateTo();
    await loginPage.waitForReady();
    await loginPage.loginForm.emailField.sendKeys(TEST_EMAIL);
    await loginPage.loginForm.passwordField.sendKeys(TEST_PASSWORD);
    await loginPage.header.languageSwitcher.click();
    await loginPage.header.languageDe.click();
    // language should change
    await browser.wait(
      EC.textToBePresentInElement(
        loginPage.footer.notice,
        '© 2016 hybris GmbH'
      ),
      5000
    );
    expect(loginPage.loginForm.emailField.getAttribute('value')).toEqual(
      TEST_EMAIL
    );
    expect(loginPage.loginForm.passwordField.getAttribute('value')).toEqual(
      TEST_PASSWORD
    );
  });
});
