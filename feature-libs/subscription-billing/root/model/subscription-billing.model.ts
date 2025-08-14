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
  pagination?: Pagination;
  sorts?: Sort[];
}

export interface Sort {
  asc?: boolean;
  code?: string;
}

export interface Pagination {
  count?: number;
  page?: number;
  totalCount?: number;
  totalPages?: number;
}

//re-check if this will be needed after jdk21 upgrade
export enum SubscriptionStatus {
  cancelled = 'CANCELLED',
  active = 'ACTIVE',
  withdrawn = 'WITHDRAWN',
  expired = 'EXPIRED',
}
