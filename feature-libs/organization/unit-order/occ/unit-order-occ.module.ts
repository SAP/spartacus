import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderHistoryAdapter } from '../core/connectors/unit-order.adapter';
import {
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '../core/connectors/converters';

import { OccOrderHistoryAdapter } from './adapters/occ-unit-order.adapter';

import { OccOrderHistoryNormalizer } from './converters/occ-unit-order-normalizer';
import { defaultOccOrderApprovalConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrderApprovalConfig),
    {
      provide: OrderHistoryAdapter,
      useClass: OccOrderHistoryAdapter,
    },
    {
      provide: ORDER_APPROVAL_NORMALIZER,
      useExisting: OccOrderHistoryNormalizer,
      multi: true,
    },
  ],
})
export class UnitOrderOccModule {}
