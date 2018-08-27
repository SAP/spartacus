import { by, element, ElementFinder } from 'protractor';
import { AppPage } from '../../app.po';
import { AddressForm } from './address-form.po';
import { DeliveryModeForm } from './delivery-mode-form.po';
import { PaymentForm } from './payment-form.po';
import { ReviewForm } from './review-form.po';

export class MultiStepCheckoutPage extends AppPage {
  readonly page: ElementFinder = element(
    by.tagName('y-multi-step-checkout-page')
  );

  readonly addressForm: AddressForm = new AddressForm(this.page);
  readonly deliveryForm: DeliveryModeForm = new DeliveryModeForm(this.page);
  readonly paymentForm: PaymentForm = new PaymentForm(this.page);
  readonly reviewForm: ReviewForm = new ReviewForm(this.page);
}
