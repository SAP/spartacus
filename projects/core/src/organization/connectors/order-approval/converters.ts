import { InjectionToken } from '@angular/core';
import { Converter } from '../../../util/converter.service';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../../../model/order-approval.model';
import { EntitiesModel } from '../../../model/misc.model';

export const ORDER_APPROVAL_NORMALIZER = new InjectionToken<
  Converter<any, OrderApproval>
>('OrderApprovalNormalizer');

export const ORDER_APPROVALS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrderApproval>>
>('OrderApprovalsListNormalizer');

export const ORDER_APPROVAL_DECISION_NORMALIZER = new InjectionToken<
  Converter<any, OrderApprovalDecision>
>('OrderApprovalDecisionNormalizer');
