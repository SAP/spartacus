import { NgModule } from '@angular/core';
import { CheckoutCostCenterEventListener } from './checkout-cost-center-event.listener';
import { CheckoutPaymentTypeEventListener } from './checkout-payment-type-event.listener';

@NgModule({})
export class CheckoutB2BEventModule {
  constructor(
    _checkoutCostCenterEventListener: CheckoutCostCenterEventListener,
    _checkoutPaymentTypeEventListener: CheckoutPaymentTypeEventListener
  ) {}
}
