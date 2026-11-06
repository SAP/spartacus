/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';
import { UsageUnit } from './subscription-product.model';

export interface SubscriptionBillsList {
  results?: SubscriptionBill[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface SubscriptionBill {
  id?: string;
  documentNumber?: string;
  periodStartAt?: string;
  periodEndAt?: string;
  billAt?: string;
  dueAt?: string;
  netAmount?: string;
  grossAmount?: string;
  numberOfSubscriptions?: number;
  items?: SubscriptionBillItem[];
  status?: SubscriptionBillStatus;
}

export interface SubscriptionBillItem {
  subscriptionId?: string;
  subscriptionDocumentNumber?: string;
  productCode?: string;
  productName?: string;
  netAmount?: string;
  grossAmount?: string;
  usageCharges?: BillUsageCharge[];
}

export enum SubscriptionBillStatus {
  PAID = 'Paid',
  DUE = 'Due',
}

export interface BillUsageCharge {
  name?: string;
  typeName?: string;
  usageQuantity?: number;
  usageUnit?: UsageUnit;
  netAmount?: string;
  grossAmount?: string;
}
