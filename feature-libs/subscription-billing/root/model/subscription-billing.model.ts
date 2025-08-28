import { LAUNCH_CALLER } from '@spartacus/storefront';
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
