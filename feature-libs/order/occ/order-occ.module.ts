import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import {
  OrderAdapter,
  ReplenishmentOrderAdapter,
  ScheduledReplenishmentOrderAdapter,
  UnnamedAdapter,
} from '@spartacus/order/core';
import {
  ORDER_NORMALIZER,
  ORDER_RETURN_REQUEST_NORMALIZER,
  REPLENISHMENT_ORDER_FORM_SERIALIZER,
  REPLENISHMENT_ORDER_NORMALIZER,
} from '@spartacus/order/root';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccUnnamedReplenishmentOrderFormSerializer } from './adapters/converters/occ-unnamed-replenishment-order-form-serializer';
import { OccScheduledReplenishmentOrderAdapter } from './adapters/occ-checkout-replenishment-order.adapter';
import { OccUnnamedAdapter } from './adapters/occ-checkout.adapter';
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
      provide: UnnamedAdapter,
      useClass: OccUnnamedAdapter,
    },
    {
      provide: ScheduledReplenishmentOrderAdapter,
      useClass: OccScheduledReplenishmentOrderAdapter,
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
    {
      provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
      useExisting: OccUnnamedReplenishmentOrderFormSerializer,
      multi: true,
    },
  ],
})
export class OrderOccModule {}
