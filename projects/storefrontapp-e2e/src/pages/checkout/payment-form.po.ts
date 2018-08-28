import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../util.po';

export class PaymentForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}
  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-payment-form')
  );
  readonly header: ElementFinder = this.form.element(by.css('h3.heading'));
  readonly accountHolderName: ElementFinder = this.form.element(
    by.css('[formcontrolname="accountHolderName"]')
  );
  readonly cardNumber: ElementFinder = this.form.element(
    by.css('[formcontrolname="cardNumber"]')
  );
  readonly cardTypeSelect: ElementFinder = this.form.element(
    by.css('[formcontrolname="code"]')
  );
  readonly expiryMonth: ElementFinder = this.form.element(
    by.css('[formcontrolname="expiryMonth"]')
  );
  readonly expiryYear: ElementFinder = this.form.element(
    by.css('[formcontrolname="expiryYear"]')
  );
  readonly verificationNumber: ElementFinder = this.form.element(
    by.css('[formcontrolname="cvn"]')
  );

  readonly nextButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Next')
  );

  async selectCardType(value: string) {
    await this.cardTypeSelect
      .element(by.cssContainingText('option', value))
      .click();
  }

  async fillIn() {
    await this.accountHolderName.sendKeys('Winston Rumfoord');
    await this.cardNumber.sendKeys('4111111111111111');
    await this.selectCardType('Visa');
    await this.expiryMonth.sendKeys('12');
    await this.expiryYear.sendKeys('2080');
    await this.verificationNumber.sendKeys('123');
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.form);
  }
}
