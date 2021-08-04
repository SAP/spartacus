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
