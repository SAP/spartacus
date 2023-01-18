/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Converter, EntitiesModel } from '@spartacus/core';
import {
  OrderApproval,
  OrderApprovalDecision,
} from '../model/order-approval.model';

export const ORDER_APPROVAL_NORMALIZER = new InjectionToken<
  Converter<any, OrderApproval>
>('OrderApprovalNormalizer');

export const ORDER_APPROVALS_NORMALIZER = new InjectionToken<
  Converter<any, EntitiesModel<OrderApproval>>
>('OrderApprovalsListNormalizer');

export const ORDER_APPROVAL_DECISION_NORMALIZER = new InjectionToken<
  Converter<any, OrderApprovalDecision>
>('OrderApprovalDecisionNormalizer');
