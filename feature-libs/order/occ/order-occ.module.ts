import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OrderAdapter,
  ORDER_RETURN_REQUEST_NORMALIZER,
  ReplenishmentOrderAdapter,
} from '@spartacus/order/core';
import { ORDER_NORMALIZER, REPLENISHMENT_ORDER_NORMALIZER } from '@spartacus/order/root';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccOrderAdapter } from './adapters/occ-order.adapter';
import { OccReplenishmentOrderAdapter } from './adapters/occ-replenishment-order.adapter';
import { defaultOccOrderConfig } from './config/default-occ-order-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrderConfig),
    { provide: OrderAdapter, useClass: OccOrderAdapter },
    {
      provide: ReplenishmentOrderAdapter,
      useClass: OccReplenishmentOrderAdapter,
    },
    {
      provide: ORDER_RETURN_REQUEST_NORMALIZER,
      useExisting: OccReturnRequestNormalizer,
      multi: true,
    },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OccOrderNormalizer,
      multi: true,
    },
    {
      provide: REPLENISHMENT_ORDER_NORMALIZER,
      useExisting: OccReplenishmentOrderNormalizer,
      multi: true,
    },

  ],
})
export class OrderOccModule {}
