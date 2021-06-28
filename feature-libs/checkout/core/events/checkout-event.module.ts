import { NgModule } from '@angular/core';
import { CheckoutEventBuilder } from './checkout-event.builder';
import { CheckoutEventListener } from './checkout-event.listener';

@NgModule({})
export class CheckoutEventModule {
  constructor(
    _checkoutEventBuilder: CheckoutEventBuilder,
    _checkoutEventListener: CheckoutEventListener
  ) {}
}
