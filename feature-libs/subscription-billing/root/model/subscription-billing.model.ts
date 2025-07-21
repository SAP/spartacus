import { PaginationModel, SortModel } from '@spartacus/core';
import { PricePlan, RenewalTerm, UsageCharge } from './subscription-product.model';

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
