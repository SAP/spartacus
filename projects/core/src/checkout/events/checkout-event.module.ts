import { NgModule } from '@angular/core';
import { CheckoutEventListener } from './checkout-event.listener';
import { CheckoutEventBuilder } from './checkout-event.builder';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
@NgModule({})
export class CheckoutEventModule {
  constructor(
    _checkoutEventBuilder: CheckoutEventBuilder,
    _checkoutEventListener: CheckoutEventListener
  ) {}
}
