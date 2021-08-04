import {
  PaginationModel,
  ReplenishmentOrder,
  SortModel,
} from '@spartacus/core';

export interface ReplenishmentOrderList {
  replenishmentOrders?: ReplenishmentOrder[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface Trigger {
  activationTime?: string;
  displayTimeTable?: string;
}
