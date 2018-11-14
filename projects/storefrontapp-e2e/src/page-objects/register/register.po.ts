import { browser, by, element, ElementFinder } from 'protractor';
import { RegisterForm } from './register-form.po';
import { AppPage } from '../app.po';
import { E2EUtil } from '../../e2e-util';

export class RegisterPage extends AppPage {
  readonly page: ElementFinder = element(by.tagName('cx-register-page'));
  readonly registerForm: RegisterForm = new RegisterForm(this.page);

  async navigateTo() {
    await browser.get('/register');
    await this.waitForReady();
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.registerForm.form);
  }
}
