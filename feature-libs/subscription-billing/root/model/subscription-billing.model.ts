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
  hasNext?: boolean;
  hasPrevious?: boolean;
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
