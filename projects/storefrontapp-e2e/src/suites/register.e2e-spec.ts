import { HomePage } from '../page-objects/home.po';
import { LoginHelper } from '../page-objects/login/login.helper';
import { RegisterPage } from '../page-objects/register/register.po';
import { by, element, browser, ExpectedConditions } from 'protractor';

describe('Register ', () => {
  const home: HomePage = new HomePage();

  beforeAll(async () => {
    // Go to Home
    await home.navigateTo();
    await home.waitForReady();
  });

  it('should contain error when trying to register with same email', async () => {
    await home.navigateTo();
    // Register a new user.
    const registerPage = new RegisterPage();
    await LoginHelper.navigateToRegisterViaHeader();
    await registerPage.waitForReady();

    const testUserId = Date.now() - 1535535333333;
    const userEmail = `user${testUserId}@${LoginHelper.DEFAULT_USER_DOMAIN}`;
    const userPassword = LoginHelper.DEFAULT_PASSWORD;

    await registerPage.registerForm.fillInForm(
      LoginHelper.DEFAULT_TITLE,
      LoginHelper.DEFAULT_FIRST_NAME,
      LoginHelper.DEFAULT_LAST_NAME,
      userEmail,
      userPassword
    );
    await registerPage.registerForm.submit();
    await browser.wait(
      ExpectedConditions.urlIs('http://localhost:4200/'),
      5000
    );
    await LoginHelper.logOutViaHeader();

    // Let's fill the same
    await LoginHelper.navigateToRegisterViaHeader();
    await registerPage.waitForReady();
    await registerPage.registerForm.fillInForm(
      LoginHelper.DEFAULT_TITLE,
      LoginHelper.DEFAULT_FIRST_NAME,
      LoginHelper.DEFAULT_LAST_NAME,
      userEmail,
      userPassword
    );
    await registerPage.registerForm.submit();
    const error = await element(by.tagName('cx-global-message')).element(
      by.css('.alert-danger')
    );
    expect(error).toBeTruthy();
    expect(await error.getText()).toContain(userEmail);

    // we still should be on the current url
    expect(await browser.getCurrentUrl()).toBe(
      'http://localhost:4200/register'
    );
  });
});
