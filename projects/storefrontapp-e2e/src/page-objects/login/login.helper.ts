import { LoginPage } from './login.po';
import { browser, ExpectedConditions } from 'protractor';
import { RegisterPage } from '../register/register.po';
import { Header } from '../cmslib/header.po';

export class LoginHelper {
  static userEmail: string;
  static userPassword: string;

  static readonly DEFAULT_TITLE = 'Mr.';
  static readonly DEFAULT_FIRST_NAME = 'Winston';
  static readonly DEFAULT_LAST_NAME = 'Rumfoord';
  static readonly DEFAULT_USER_DOMAIN = 'ydev.hybris.com';
  static readonly DEFAULT_PASSWORD = `TestP@sw0rd`;

  /**
   * Can ba used for any user context action
   * If user is not logged in it registers new user (unless already registered one for current session) and perform user login
   */
  static async ensureUserIsLoggedIn() {
    const loginPage = new LoginPage();
    const isLoggedIn = await loginPage.header.isLoggedIn();

    if (isLoggedIn) {
      return;
    }

    if (!LoginHelper.userEmail) {
      await LoginHelper.registerNewUser();
    } else {
      const startUrl = await browser.getCurrentUrl();
      await loginPage.performLogin(
        LoginHelper.userEmail,
        LoginHelper.userPassword
      );
      await browser.wait(ExpectedConditions.urlIs(startUrl), 5000);
    }
  }

  static async navigateToLoginViaHeader() {
    const header = new Header();
    await header.loginIconButton.click();
  }

  static async navigateToRegisterViaHeader() {
    await LoginHelper.navigateToLoginViaHeader();
    const loginPage = new LoginPage();
    await loginPage.waitForReady();
    await loginPage.registerButton.click();
  }

  static async registerNewUser() {
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

    if (await registerPage.header.isLoggedIn()) {
      LoginHelper.userEmail = userEmail;
      LoginHelper.userPassword = userPassword;
      return {
        email: userEmail,
        password: userPassword
      };
      console.log('Created new user', userEmail, userPassword);
    } else {
      // prettier-ignore
      throw new Error('Couldn\'t register new user!');
    }
  }

  static async loginUserViaHeader(email: string, password: string) {
    const loginPage = new LoginPage();
    await this.navigateToLoginViaHeader();

    const loginForm = loginPage.loginForm;
    await loginForm.fillInForm(email, password);
    await loginForm.submitLogin();
  }

  static async loginUser(email: string, password: string) {
    const loginPage = new LoginPage();
    await loginPage.navigateTo();

    const loginForm = loginPage.loginForm;
    await loginForm.fillInForm(email, password);
    await loginForm.submitLogin();
    await browser.wait(
      ExpectedConditions.urlIs('http://localhost:4200/'),
      5000
    );
  }

  static async logOutViaHeader() {
    const header = new Header();
    await header.navigationMenu.click();
    await header.logoutButton.click();
  }
}
