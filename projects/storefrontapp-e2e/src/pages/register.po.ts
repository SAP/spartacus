import { ElementFinder, by } from 'protractor';
import { E2EUtil } from './../util.po';
export class Register {
  readonly YPAGE = 'y-register';

  getPage(): ElementFinder {
    return E2EUtil.getComponent(this.YPAGE);
  }

  getForm(): ElementFinder {
    return E2EUtil.getComponentWithinParent(this.getPage(), 'form');
  }

  getTitles(): ElementFinder {
    return E2EUtil.getComponentWithinParentByCss(
      this.getForm(),
      `select[formcontrolname="titleCode"]`
    );
  }

  getFirstNameInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(this.getForm(), 'firstName');
  }

  getLastNameInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(this.getForm(), 'lastName');
  }

  getEmailInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(this.getForm(), 'email');
  }

  getPasswordInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(this.getForm(), 'password');
  }

  getPasswordConfirmationInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(this.getForm(), 'passwordconf');
  }

  getTermsAndConditionsInput(): ElementFinder {
    return E2EUtil.getInputByFormControlName(
      this.getForm(),
      'termsandconditions'
    );
  }

  getRegisterSubmitButton(): ElementFinder {
    return this.getForm().element(by.cssContainingText('button', 'Register'));
  }

  selectTitle(label: string) {
    const titles = this.getTitles();
    titles.element(by.cssContainingText('option', label)).click();
  }

  register(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    this.selectTitle(title);
    E2EUtil.fillInput(this.getFirstNameInput(), firstName);
    E2EUtil.fillInput(this.getLastNameInput(), lastName);
    E2EUtil.fillInput(this.getEmailInput(), email);
    E2EUtil.fillInput(this.getPasswordInput(), password);
    E2EUtil.fillInput(this.getPasswordConfirmationInput(), password);

    this.getTermsAndConditionsInput().click();

    // submits form
    this.getRegisterSubmitButton().click();
  }
}
