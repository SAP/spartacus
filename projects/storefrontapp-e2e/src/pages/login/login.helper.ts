import { LoginPage } from './login.po';
import { browser, ExpectedConditions } from 'protractor';
import { RegisterPage } from '../register/register.po';
import { E2EUtil } from '../../util.po';
import { Header } from '../../cmslib/header.po';

export class LoginHelper {
  static userEmail: string;
  static userPassword: string;

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

  static async goToLoginViaHeader() {
    const header = new Header();
    await header.getLoginIconComponent().click();
  }

  static async goToRegisterViaHeader() {
    await LoginHelper.goToLoginViaHeader();
    const loginPage = new LoginPage();
    await loginPage.waitForReady();
    await loginPage.loginForm.registerButton.click();
  }

  static async registerNewUser() {
    const registerPage = new RegisterPage();
    await LoginHelper.goToRegisterViaHeader();
    await registerPage.waitForReady();

    const testUserId = `user${Date.now()}`;
    const userEmail = `${testUserId}@test.w9.pl`;
    const userPassword = `TestP@sw0rd`;

    await registerPage.registerForm.fillInForm(
      'Mr',
      'Winston',
      'Rumfoord',
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
      console.log('Created new user', userEmail, userPassword);
    } else {
      // prettier-ignore
      throw new Error('Couldn\'t register new user!');
    }
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
    await header.loginComponent.click();
    await E2EUtil.wait4PresentElement(header.logoutButton);
    await header.logoutButton.click();
  }
}
