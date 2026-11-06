/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';
import { PricePlan } from './subscription-product.model';
import { LAUNCH_CALLER } from '@spartacus/storefront';

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

/** Actions related models */
export interface SubscriptionCancelData {
  subscriptionEndAt?: string;
}
export interface SubscriptionCancellationDetails {
  subscriptionEndAt?: string;
}
export interface SubscriptionReverseCancellation {
  subscriptionId?: string;
  version?: string;
}
export interface SubscriptionWithdraw {
  subscriptionId?: string;
  version?: string;
  withdrawnAt?: string;
  withdrawalPeriodEndDate?: string;
}

export type SubscriptionActionMode =
  | 'cancel'
  | 'withdraw'
  | 'resubscribe'
  | 'extend';

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    SUBSCRIPTION_ACTION_CONFIRMATION = 'SUBSCRIPTION_ACTION_CONFIRMATION',
    DATE_RANGE_MODAL = 'DATE_RANGE_MODAL',
  }
}

(LAUNCH_CALLER as any)['SUBSCRIPTION_ACTION_CONFIRMATION'] =
  'SUBSCRIPTION_ACTION_CONFIRMATION';
(LAUNCH_CALLER as any)['DATE_RANGE_MODAL'] = 'DATE_RANGE_MODAL';

export interface SubscriptionExtensionEffectiveDate {
  subscriptionEndAt: string;
}
