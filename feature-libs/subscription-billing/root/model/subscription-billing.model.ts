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
  expired = 'EXPIRED'
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