import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';
import { PaymentForm } from './payment-form.po';

export class PaymentMethod {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('cx-root'))
  ) {}

  readonly container: ElementFinder = this.parentElement.element(
    by.tagName('cx-payment-method')
  );

  readonly header: ElementFinder = this.container.element(
    by.css('h3.cx-payment-method__title')
  );

  readonly paymentForm: PaymentForm = new PaymentForm(this.container);

  readonly addNewPaymentMethodButton: ElementFinder = this.container.element(
    by.css('.btn-action')
  );

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.container);
  }
}
