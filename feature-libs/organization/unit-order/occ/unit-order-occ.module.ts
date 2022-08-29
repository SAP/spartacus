import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';

import { defaultOccUnitOrderConfig } from './config/default-occ-organization-config';
import { OccUnitOrderAdapter } from './adapters/occ-unit-order.adapter';
import { UnitOrderAdapter } from '../core/connectors/unit-order.adapter';
import { ORDER_NORMALIZER } from '@spartacus/order/root';
import { OccOrderNormalizer } from '@spartacus/order/occ';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccUnitOrderConfig),
    { provide: UnitOrderAdapter, useClass: OccUnitOrderAdapter },
    {
      provide: ORDER_NORMALIZER,
      useExisting: OccOrderNormalizer,
      multi: true,
    },
  ],
})
export class UnitOrderOccModule {}
