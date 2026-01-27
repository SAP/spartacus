/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';
import { UsageCharge } from './subscription-product.model';

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
}

export interface SubscriptionBillItem {
  subscriptionId?: string;
  subscriptionDocumentNumber?: string;
  productCode?: string;
  productName?: string;
  netAmount?: string;
  grossAmount?: string;
  usageCharges?: UsageCharge[];
}
