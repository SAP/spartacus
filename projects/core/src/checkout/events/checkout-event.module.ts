import { NgModule } from '@angular/core';
import { CheckoutEventBuilder } from './checkout-event.builder';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
@NgModule({})
export class CheckoutEventModule {
  constructor(_checkoutEventBuilder: CheckoutEventBuilder) {}
}
