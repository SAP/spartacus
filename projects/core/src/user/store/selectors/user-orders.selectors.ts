import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUserOrdersReducer from '../reducers/user-orders.reducer';
import { UserOrdersState, UserState } from '../user-state';

export const getOrdersState: MemoizedSelector<
  any,
  UserOrdersState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.orders
);

export const getOrders: MemoizedSelector<any, any> = createSelector(
  getOrdersState,
  fromUserOrdersReducer.getOrders
);

export const getOrdersLoaded: MemoizedSelector<any, any> = createSelector(
  getOrdersState,
  fromUserOrdersReducer.getOrdersLoaded
);
