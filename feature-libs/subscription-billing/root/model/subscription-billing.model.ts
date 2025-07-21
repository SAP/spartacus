import { PaginationModel, SortModel } from '@spartacus/core';
import { LAUNCH_CALLER } from '@spartacus/storefront';

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
  contractFrequency?: string;
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

export interface SubscriptionExtensionEffectiveDate {
  subscriptionEndAt: string;
}

declare module '@spartacus/storefront' {
  enum LAUNCH_CALLER {
    EXTEND_SUBSCRIPTION = 'EXTEND_SUBSCRIPTION',
  }
}
(LAUNCH_CALLER as any)['EXTEND_SUBSCRIPTION'] = 'EXTEND_SUBSCRIPTION';