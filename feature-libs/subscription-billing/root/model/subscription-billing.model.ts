import { PaginationModel, SortModel } from '@spartacus/core';
import {
  PricePlan,
  RenewalTerm,
  UsageCharge,
} from './subscription-product.model';

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

//re-check if this will be needed after jdk21 upgrade
export enum SubscriptionStatus {
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
  withdrawn = 'WITHDRAWN',
  expired = 'EXPIRED',
}


//Cancel-widthdraw-resubscribe
export interface CancelData{
  subscriptionEndAt?: string;
}
export interface CancellationDetails {
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
