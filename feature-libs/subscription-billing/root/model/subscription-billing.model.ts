import { PaginationModel, SortModel } from '@spartacus/core';

export interface SubscriptionItem {
  id?: string;
  name?: string;
  productCode?: string;
  startDate?: string;
  endDate?: string;
  subscriptionStatus?: string;
}
export interface SubscriptionDetail {
  id?: string;
  name?: string;
  productCode?: string;
  subscriptionStatus?: string;
  startDate?: string;
  endDate?: string;
  orderCode?: string;


  version?: string;
  withdrawalPeriodEndDate?: string;
  effectiveDate?: string;
  ratePlanId?: string;
  withdrawnAt?: string;
}
export interface SubscriptionList {
  subscriptions?: SubscriptionItem[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export enum SubscriptionStatus {
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
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
