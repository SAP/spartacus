import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CheckoutReplenishmentOrderAdapter,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
} from '@spartacus/checkout/scheduled-replenishment/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OccReplenishmentOrderFormSerializer } from './adapters/converters/occ-replenishment-order-form-serializer';
import { OccCheckoutReplenishmentOrderAdapter } from './adapters/occ-checkout-replenishment-order.adapter';
import { defaultOccScheduledReplenishmentConfig } from './config/default-occ-scheduled-replenishment-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccScheduledReplenishmentConfig),
    OccReplenishmentOrderFormSerializer,
    {
      provide: CheckoutReplenishmentOrderAdapter,
      useClass: OccCheckoutReplenishmentOrderAdapter,
    },
    {
      provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
      useExisting: OccReplenishmentOrderFormSerializer,
      multi: true,
    },
  ],
})
export class CheckoutScheduledReplenishmentOccModule {}
