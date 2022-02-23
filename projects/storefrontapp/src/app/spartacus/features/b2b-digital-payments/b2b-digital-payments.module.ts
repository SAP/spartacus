import { NgModule } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import { DigitalPaymentsModule } from '@spartacus/digital-payments';

@NgModule({
  imports: [DigitalPaymentsModule, CheckoutB2BModule],
})
export class B2BDigitalPaymentsModule {}
