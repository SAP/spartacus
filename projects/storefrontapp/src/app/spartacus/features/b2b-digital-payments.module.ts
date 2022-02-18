import { NgModule } from '@angular/core';
import { CheckoutScheduledReplenishmentModule } from '@spartacus/checkout/scheduled-replenishment';
import { DigitalPaymentsModule } from '@spartacus/digital-payments';

@NgModule({
  imports: [DigitalPaymentsModule, CheckoutScheduledReplenishmentModule],
})
export class B2BDigitalPaymentsModule {}
