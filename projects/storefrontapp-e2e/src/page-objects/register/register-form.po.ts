import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class RegisterForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('cx-root'))
  ) {}

  readonly form: ElementFinder = this.parentElement.element(by.tagName('form'));
  readonly titleSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="titleCode"]')
  );
  readonly firstNameField: ElementFinder = this.form.element(
    by.css('[name="firstname"]')
  );
  readonly lastNameField: ElementFinder = this.form.element(
    by.css('[name="lastname"]')
  );
  readonly emailField: ElementFinder = this.form.element(
    by.css('[name="email"]')
  );
  readonly passwordField: ElementFinder = this.form.element(
    by.css('[name="password"]')
  );
  readonly confirmPasswordField: ElementFinder = this.form.element(
    by.css('[name="confirmpassword"]')
  );
  readonly termsAndConditionsCheckbox: ElementFinder = this.form.element(
    by.css('[name="termsandconditions"]')
  );
  readonly submitButton: ElementFinder = this.form.element(
    by.tagName('button')
  );

  async setTitle(value: string) {
    await E2EUtil.selectOptionByText(this.titleSelect, value);
  }

  async setFirstName(value: string) {
    await this.firstNameField.sendKeys(value);
  }

  async setLastName(value: string) {
    await this.lastNameField.sendKeys(value);
  }

  async setEmail(value: string) {
    await this.emailField.sendKeys(value);
  }

  async setPassword(value: string) {
    await this.passwordField.sendKeys(value);
  }

  async setPasswordConfirm(value: string) {
    await this.confirmPasswordField.sendKeys(value);
  }

  async checkTermsAndConditions() {
    await this.termsAndConditionsCheckbox.click();
  }

  async fillInForm(
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    await this.setTitle(title);
    await this.setFirstName(firstName);
    await this.setLastName(lastName);
    await this.setEmail(email);
    await this.setPassword(password);
    await this.setPasswordConfirm(password);
    await this.checkTermsAndConditions();
  }

  async submit() {
    await this.submitButton.click();
  }
}
