import { browser, by, element, ElementFinder } from 'protractor';
import { LoginForm } from './login-form.po';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class LoginPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('y-login-page'));
  readonly loginForm: LoginForm = new LoginForm(this.page);

  navigateTo() {
    return browser.get('/login');
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.loginForm.form);
  }

  async performLogin(email: string, password: string) {
    await this.navigateTo();
    await this.loginForm.fillInForm(email, password);
    await this.loginForm.submitLogin();
  }
}
