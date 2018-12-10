import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserOrdersState } from './../reducers/user-orders.reducer';
import * as fromFeature from '../reducers';
import * as fromUserOrdersReducer from '../reducers/user-orders.reducer';
import { OrderHistoryList } from '@spartacus/core';

export const getOrdersState: MemoizedSelector<
  any,
  UserOrdersState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.orders
);

export const getOrders: MemoizedSelector<
  any,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  fromUserOrdersReducer.getOrders
);

export const getOrdersLoaded: MemoizedSelector<any, boolean> = createSelector(
  getOrdersState,
  fromUserOrdersReducer.getOrdersLoaded
);
