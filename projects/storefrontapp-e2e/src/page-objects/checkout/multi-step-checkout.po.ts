import { by, element, ElementFinder } from 'protractor';
import { AddressForm } from './address-form.po';
import { DeliveryModeForm } from './delivery-mode-form.po';
import { PaymentForm } from './payment-form.po';
import { ReviewForm } from './review-form.po';
import { AppPage } from '../app.po';
import { OrderConfirmationPage } from './order-confirmation.po';
export class MultiStepCheckoutPage extends AppPage {
  readonly page: ElementFinder = element(
    by.tagName('y-multi-step-checkout-page')
  );

  readonly orderSummary: ElementFinder = this.page.element(
    by.css('.y-order-summary__amount')
  );

  readonly agreeToTermsCheckbox: ElementFinder = this.page.element(
    by.css('input#termsCheck')
  );

  readonly placeOrderButton: ElementFinder = this.page.element(
    by.cssContainingText('button', 'Place Order')
  );

  readonly addressForm: AddressForm = new AddressForm(this.page);
  readonly deliveryForm: DeliveryModeForm = new DeliveryModeForm(this.page);
  readonly paymentForm: PaymentForm = new PaymentForm(this.page);
  readonly reviewForm: ReviewForm = new ReviewForm(this.page);

  async placeOrder() {
    await this.agreeToTermsCheckbox.click();
    await this.placeOrderButton.click();
    return new OrderConfirmationPage();
  }
}
