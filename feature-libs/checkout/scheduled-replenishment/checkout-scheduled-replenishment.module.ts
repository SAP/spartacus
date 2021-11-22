import { NgModule } from '@angular/core';
import { CheckoutScheduledReplenishmentComponentsModule } from '@spartacus/checkout/scheduled-replenishment/components';
import { CheckoutScheduledReplenishmentCoreModule } from '@spartacus/checkout/scheduled-replenishment/core';
import { CheckoutScheduledReplenishmentOccModule } from '@spartacus/checkout/scheduled-replenishment/occ';

@NgModule({
  imports: [
    CheckoutScheduledReplenishmentComponentsModule,
    CheckoutScheduledReplenishmentCoreModule,
    CheckoutScheduledReplenishmentOccModule,
  ],
})
export class CheckoutScheduledReplenishmentModule {}
