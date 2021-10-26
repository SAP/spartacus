import { NgModule } from '@angular/core';
import { CheckoutEventListener } from './checkout-event.listener';

@NgModule({})
export class CheckoutEventModule {
  constructor(_checkoutEventListener: CheckoutEventListener) {}
}
