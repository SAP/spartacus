import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';

export class PaymentForm {
  static readonly CARD_HOLDER = 'Winston Rumfoord';
  static readonly CARD_NUMBER = '4111111111111111';
  static readonly CARD_TYPE = 'Visa';
  static readonly CARD_MONTH = '12';
  static readonly CARD_YEAR = '2080';
  static readonly CARD_CCV = '123';

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
    await E2EUtil.selectOptionByText(this.cardTypeSelect, value);
  }

  async fillIn() {
    await this.accountHolderName.sendKeys(PaymentForm.CARD_HOLDER);
    await this.cardNumber.sendKeys(PaymentForm.CARD_NUMBER);
    await this.selectCardType(PaymentForm.CARD_TYPE);
    await this.expiryMonth.sendKeys(PaymentForm.CARD_MONTH);
    await this.expiryYear.sendKeys(PaymentForm.CARD_YEAR);
    await this.verificationNumber.sendKeys(PaymentForm.CARD_CCV);
  }

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.form);
  }
}
