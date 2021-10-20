import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { REPLENISHMENT_ORDER_NORMALIZER } from '../../../checkout/connectors/replenishment-order/converters';
import { OccReplenishmentOrderNormalizer } from './converters/occ-replenishment-order-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: REPLENISHMENT_ORDER_NORMALIZER,
      useExisting: OccReplenishmentOrderNormalizer,
      multi: true,
    },
  ],
})
export class OrderOccModule {}
