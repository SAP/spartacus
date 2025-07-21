import { PaginationModel, SortModel } from '@spartacus/core';
import { PricePlan, RenewalTerm, UsageCharge } from './subscription-product.model';

export interface SubscriptionDetail {
  id?: string;
  name?: string;
  productCode?: string;
  startAt?: string;
  endAt?: string;
  subscriptionStatus?: string;
  contractFrequency?: string;
  customerId?: string;
  documentNumber?: string;
  pricePlan?: PricePlan;
  currentUsages?: UsageCharge[];
  renewalTerm?: RenewalTerm;
  withdrawalPeriodEndAt?: string;
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
