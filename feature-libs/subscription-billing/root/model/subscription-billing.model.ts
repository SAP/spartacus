/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationModel, SortModel } from '@spartacus/core';
import { PricePlan, RenewalTerm, UsageCharge } from './subscription-product.model';
import { LAUNCH_CALLER } from '@spartacus/storefront';

export interface SubscriptionDetail {
  id?: string;
  name?: string;
  productCode?: string;
  startAt?: string;
  endAt?: string;
  subscriptionStatus?: string;
  startDate?: string;
  endDate?: string;
  orderCode?: string;


  version?: string;
  withdrawalPeriodEndDate?: string;
  effectiveDate?: string;
  ratePlanId?: string;
  withdrawnAt?: string;
   contractFrequency?: string;
  customerId?: string;
  documentNumber?: string;
  pricePlan?: PricePlan;
  currentUsages?: UsageCharge[];
  renewalTerm?: RenewalTerm;
}
export interface SubscriptionList {
  subscriptions?: SubscriptionDetail[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

//re-check if this will be needed after jdk21 upgrade
export enum SubscriptionStatus {
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
  withdrawn = 'WITHDRAWN',
  expired = 'EXPIRED'
}
export interface CancelData{
  // validTillDate?: string;
  // endDate?: string;
  subscriptionEndAt?: string;
}
export interface CancellationDetails {
  // subscriptionId?: string;
  // validTillDate?: string;
  // ratePlanId?: string;
  // version?: string;
  subscriptionEndAt?: string;
}
export interface reverseCancellation {
  subscriptionId?: string;
  version?: string;
}
export interface withdrawal {
  subscriptionId?: string;
  version?: string;
  withdrawnAt?: string;
  withdrawalPeriodEndDate?: string;
}

export interface ExtendDetails {
  extendReason?: string; //name in request
}

export interface SubscriptionExtensionEffectiveDate {
  subscriptionEndAt: string;
}

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    EXTEND_SUBSCRIPTION = 'EXTEND_SUBSCRIPTION',
  }
}
(LAUNCH_CALLER as any)['EXTEND_SUBSCRIPTION'] = 'EXTEND_SUBSCRIPTION';