import { by, element, ElementFinder, browser } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class LoginForm {
  readonly form: ElementFinder = element(by.tagName('cx-login-form'));
  readonly emailField: ElementFinder = this.form.element(
    by.css('[formcontrolname=userId]')
  );
  readonly passwordField: ElementFinder = this.form.element(
    by.css('[formcontrolname=password]')
  );
  readonly signInButton: ElementFinder = this.form.element(
    by.css('button[type=submit]')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }

  async fillInForm(email: string, password: string) {
    await this.emailField.sendKeys(email);
    await this.passwordField.sendKeys(password);
  }

  async submitLogin() {
    await this.signInButton.click();
  }

  async submitLoginWithRedirect() {
    await this.signInButton.click();
    await browser.driver.wait;
    return browser.driver.getCurrentUrl();
  }
}
