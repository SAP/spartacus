import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderApprovalAdapter } from '../core/connectors/order-approval.adapter';
import {
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '../core/connectors/converters';

import { OccOrderApprovalAdapter } from './adapters/occ-order-approval.adapter';

import { OccOrderApprovalDecisionNormalizer } from './converters/occ-order-approval-decision-normalizer';
import { OccOrderApprovalListNormalizer } from './converters/occ-order-approval-list-normalizer';
import { OccOrderApprovalNormalizer } from './converters/occ-order-approval-normalizer';
import { defaultOccOrderApprovalConfig } from './config/default-occ-organization-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccOrderApprovalConfig),
    {
      provide: OrderApprovalAdapter,
      useClass: OccOrderApprovalAdapter,
    },
    {
      provide: ORDER_APPROVAL_NORMALIZER,
      useExisting: OccOrderApprovalNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVALS_NORMALIZER,
      useExisting: OccOrderApprovalListNormalizer,
      multi: true,
    },
    {
      provide: ORDER_APPROVAL_DECISION_NORMALIZER,
      useExisting: OccOrderApprovalDecisionNormalizer,
      multi: true,
    },
  ],
})
export class OrderApprovalOccModule {}
