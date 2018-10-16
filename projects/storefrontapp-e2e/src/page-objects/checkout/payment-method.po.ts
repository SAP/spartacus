import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../e2e-util';
import { PaymentForm } from './payment-form.po';

export class PaymentMethod {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}

  readonly container: ElementFinder = this.parentElement.element(
    by.tagName('y-payment-method')
  );

  readonly header: ElementFinder = this.container.element(
    by.css('h3.y-existing-payment-methods__title')
  );

  readonly paymentForm: PaymentForm = new PaymentForm(this.container);

  async waitForReady() {
    await E2EUtil.wait4VisibleElement(this.container);
  }
}
