import { PaginationModel, SortModel } from '@spartacus/core';

export interface SubscriptionItem {
  id?: string;
  name?: string;
  productCode?: string;
  productUrl?: string;
  startDate?: string;
  endDate?: string;
  subscriptionStatus?: string;
}
export interface SubscriptionDetail {
  id?: string;
  name?: string;
  // to be filled more
}
export interface SubscriptionList {
  subscriptions?: SubscriptionItem[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}
