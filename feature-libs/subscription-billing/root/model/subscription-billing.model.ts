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
