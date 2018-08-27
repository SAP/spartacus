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
    await E2EUtil.wait4VisibleElement(this.form);
  }
}
