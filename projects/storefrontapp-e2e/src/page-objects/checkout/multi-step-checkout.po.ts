import { by, element, ElementFinder } from 'protractor';

import { AppPage } from '../app.po';
import { TermsAndConditionsPage } from '../terms-and-conditions.po';

import { DeliveryModeForm } from './delivery-mode-form.po';
import { OrderConfirmationPage } from './order-confirmation.po';
import { PaymentMethod } from './payment-method.po';
import { ReviewForm } from './review-form.po';
import { ShippingAddress } from './shipping-address.po';

export class MultiStepCheckoutPage extends AppPage {
  readonly page: ElementFinder = element(
    by.tagName('cx-multi-step-checkout-page')
  );

  readonly orderSummary: ElementFinder = this.page.element(
    by.css('.cx-summary-amount')
  );

  readonly agreeToTermsCheckbox: ElementFinder = this.page.element(
    by.css('.cx-place-order-form .form-check-input')
  );

  readonly placeOrderButton: ElementFinder = this.page.element(
    by.cssContainingText('button', 'Place Order')
  );

  readonly termsAndConditions: ElementFinder = this.page.element(
    by.css('.cx-tc-link')
  );

  readonly shippingAddress: ShippingAddress = new ShippingAddress(this.page);
  readonly deliveryForm: DeliveryModeForm = new DeliveryModeForm(this.page);
  readonly paymentMethod: PaymentMethod = new PaymentMethod(this.page);
  readonly reviewForm: ReviewForm = new ReviewForm(this.page);

  async placeOrder() {
    await this.agreeToTermsCheckbox.click();
    await this.placeOrderButton.click();
    return new OrderConfirmationPage();
  }

  async openTermsAndConditions() {
    await this.termsAndConditions.click();
    return new TermsAndConditionsPage();
  }
}
