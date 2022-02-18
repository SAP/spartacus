import { NgModule } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import { CheckoutScheduledReplenishmentComponentsModule } from '@spartacus/checkout/scheduled-replenishment/components';
import { CheckoutScheduledReplenishmentCoreModule } from '@spartacus/checkout/scheduled-replenishment/core';
import { CheckoutScheduledReplenishmentOccModule } from '@spartacus/checkout/scheduled-replenishment/occ';

@NgModule({
  imports: [
    CheckoutB2BModule,
    CheckoutScheduledReplenishmentComponentsModule,
    CheckoutScheduledReplenishmentCoreModule,
    CheckoutScheduledReplenishmentOccModule,
  ],
})
export class CheckoutScheduledReplenishmentModule {}
