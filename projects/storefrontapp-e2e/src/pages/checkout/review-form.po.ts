import { by, element, ElementFinder } from 'protractor';
import { E2EUtil } from '../../util.po';
import { OrderConfirmationPage } from './order-confirmation.po';

export class ReviewForm {
  constructor(
    private parentElement: ElementFinder = element(by.tagName('y-root'))
  ) {}
  readonly form: ElementFinder = this.parentElement.element(
    by.tagName('y-review-submit')
  );
  readonly header: ElementFinder = this.form.element(by.css('h3.heading'));
  readonly shippingAddress: ElementFinder = this.form.element(
    by.css('.shipping-address')
  );
  readonly shippingMethod: ElementFinder = this.form.element(
    by.css('.shipping-method')
  );
  readonly paymentMethod: ElementFinder = this.form.element(
    by.css('.payment-method')
  );
  readonly billingAddress: ElementFinder = this.form.element(
    by.css('.billing-address')
  );

  readonly agreeToTermsCheckbox: ElementFinder = this.form.element(
    by.css('input.tandc')
  );
  readonly placeOrderButton: ElementFinder = this.form.element(
    by.cssContainingText('button', 'Place Order')
  );

  async placeOrder() {
    await this.agreeToTermsCheckbox.click();
    await this.placeOrderButton.click();
    return new OrderConfirmationPage();
  }

  async waitForReady() {
    await E2EUtil.wait4PresentElement(this.form);
  }
}
