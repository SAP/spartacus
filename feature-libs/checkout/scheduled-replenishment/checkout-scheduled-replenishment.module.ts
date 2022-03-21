import { NgModule } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import { CheckoutScheduledReplenishmentComponentsModule } from '@spartacus/checkout/scheduled-replenishment/components';

@NgModule({
  imports: [CheckoutB2BModule, CheckoutScheduledReplenishmentComponentsModule],
})
export class CheckoutScheduledReplenishmentModule {}
