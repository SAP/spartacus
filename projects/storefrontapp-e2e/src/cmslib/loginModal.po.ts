import { Register } from './../pages/register.po';
import { ElementFinder, by, browser, ExpectedConditions } from 'protractor';
import { E2EUtil } from './../util.po';
export class LoginModal {
  readonly YMODAL = 'y-login-dialog';

  getModal(): ElementFinder {
    return E2EUtil.getComponent(this.YMODAL);
  }

  getUsernameInput(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getModal(),
      `input[name="username"]`
    );
  }

  getPasswordInput(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getModal(),
      `input[name="password"]`
    );
  }

  getLoginSubmitButton(): ElementFinder {
    return this.getModal().element(by.cssContainingText('button', 'Login'));
  }

  login(username: string, password: string) {
    E2EUtil.fillInput(this.getUsernameInput(), username);
    E2EUtil.fillInput(this.getPasswordInput(), password);
    this.getLoginSubmitButton().click();
  }

  goToRegisterPage() {
    const registerButtonDiv = E2EUtil.getComponentWithinParentByClass(
      this.getModal(),
      'register-group'
    );

    // click on register button
    const registerButton = E2EUtil.getComponentWithinParent(
      registerButtonDiv,
      'button'
    );
    registerButton.click();
  }
}
