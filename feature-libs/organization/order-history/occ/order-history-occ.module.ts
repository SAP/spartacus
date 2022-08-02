import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderHistoryAdapter } from '../core/connectors/order-history.adapter';
import {
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '../core/connectors/converters';

import { OccOrderHistoryAdapter } from './adapters/occ-order-history.adapter';

import { OccOrderHistoryNormalizer } from './converters/occ-order-history-normalizer';
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
    {
      provide: ORDER_APPROVALS_NORMALIZER,
      useExisting: OccOrderHistoryListNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVAL_DECISION_NORMALIZER,
      useExisting: OccOrderHistoryDecisionNormalizer,
      multi: true,
    },
  ],
})
export class OrderHistoryOccModule {}
