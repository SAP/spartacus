import { NgModule } from '@angular/core';
import { CheckoutDeliveryAddressEventListener } from './checkout-delivery-address-event.listener';
import { CheckoutDeliveryModeEventListener } from './checkout-delivery-mode-event.listener';

@NgModule({})
export class CheckoutEventModule {
  constructor(
    _checkoutDeliveryAddressEventListener: CheckoutDeliveryAddressEventListener,
    _checkoutDeliveryModeEventListener: CheckoutDeliveryModeEventListener
  ) {}
}
