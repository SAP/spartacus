import { Header } from './cmslib/header.po';
import { Register } from './pages/register.po';
import { LoginModal } from './cmslib/loginModal.po';
import { E2EUtil } from './util.po';
import { browser, ExpectedConditions, by } from 'protractor';
import { HomePage } from './pages/home.po';

export class E2ECommonTasks {
  static login(username: string, password: string) {
    const loginModal = this.openLoginModal();
    loginModal.login(username, password);
  }

  static register(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const loginModal = this.openLoginModal();
    // click on register button to open register page
    loginModal.goToRegisterPage();
    // wait for register page to load and login modal to disappear
    browser.wait(ExpectedConditions.urlContains('/register'), 2000);
    browser.wait(
      ExpectedConditions.invisibilityOf(loginModal.getModal()),
      2000
    );
    const register = new Register();
    register.register(title, firstName, lastName, email, password);
  }

  static logout() {
    const header = new Header();
    // click on login icon to open dropdown
    const loginIconButton = E2EUtil.getComponentWithinParent(
      header.getLoginIconComponent(),
      'button'
    );
    loginIconButton.click();
    // click on logout button
    browser.element(by.cssContainingText('button', ' Logout ')).click();
  }

  static openLoginModal(): LoginModal {
    const home = new HomePage();
    // go to homepage
    home.navigateTo();
    // click on login
    home.header.openLoginModal();

    // only returns after modal is loaded
    browser.wait(
      ExpectedConditions.presenceOf(E2EUtil.getComponent('y-login-dialog')),
      2000
    );
    return new LoginModal();
  }
}
