/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';
import { PricePlan } from './subscription-product.model';

export interface SubscriptionDetail {
  id?: string;
  name?: string;
  productCode?: string;
  startAt?: string;
  endAt?: string;
  status?: string;
  isCancellationPossible?: boolean;
  isExtensionPossible?: boolean;
  isWithdrawalPossible?: boolean;
  isCancellationReversalPossible?: boolean;
  contractFrequency?: string;
  documentNumber?: string;
  pricePlan?: PricePlan;
  withdrawalPeriodEndAt?: string;
  billingTime?: string;
  orderCode?: string;
}

export interface SubscriptionList {
  results?: SubscriptionDetail[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

//re-check if this will be needed after jdk21 upgrade
export enum SubscriptionStatus {
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
  withdrawn = 'WITHDRAWN',
  expired = 'EXPIRED',
}

export interface SubscriptionExtensionEffectiveDate {
  subscriptionEndAt: string;
}

export const UNLIMITED_EXTEND_DURATION_OPTION_VALUE = 0;
