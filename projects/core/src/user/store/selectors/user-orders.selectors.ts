import { createSelector, MemoizedSelector } from '@ngrx/store';

import { OrderHistoryList } from '../../../occ/occ-models/index';
import { UserOrdersState, UserState, StateWithUser } from '../user-state';
import { getUserState } from './feature.selector';

export const getOrdersState: MemoizedSelector<
  StateWithUser,
  UserOrdersState
> = createSelector(
  getUserState,
  (state: UserState) => state.orders
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  (state: UserOrdersState) => state.orders
);

export const getOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrdersState,
  (state: UserOrdersState) => state.loaded
);
