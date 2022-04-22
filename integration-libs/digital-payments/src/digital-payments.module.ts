import { NgModule } from '@angular/core';
import { CheckoutModule } from '@spartacus/checkout/base';
import { DpCheckoutModule } from './checkout/dp-checkout.module';

@NgModule({
  imports: [CheckoutModule, DpCheckoutModule],
})
export class DigitalPaymentsModule {}
