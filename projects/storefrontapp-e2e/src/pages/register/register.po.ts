import { browser, by, element, ElementFinder } from 'protractor';
import { AppPage } from '../../app.po';
import { RegisterForm } from './register-form.po';
import { E2EUtil } from '../../util.po';

export class RegisterPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('y-register-page'));
  readonly registerForm: RegisterForm = new RegisterForm(this.page);

  navigateTo() {
    return browser.get('/register');
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.registerForm.form);
  }
}
