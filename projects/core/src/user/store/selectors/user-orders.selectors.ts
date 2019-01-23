import { createSelector, MemoizedSelector } from '@ngrx/store';

import { LoaderState } from 'projects/core/src/state';

import { UserOrdersState, UserState, StateWithUser } from '../user-state';
import { OrderHistoryList } from '../../../occ/occ-models/index';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getOrdersLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<UserOrdersState>
> = createSelector(
  getUserState,
  (state: UserState) => state.orders
);

export const getOrdersState: MemoizedSelector<
  StateWithUser,
  UserOrdersState
> = createSelector(
  getOrdersLoaderState,
  (state: LoaderState<UserOrdersState>) => loaderValueSelector(state)
);

export const getOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrdersLoaderState,
  (state: LoaderState<UserOrdersState>) => loaderLoadingSelector(state)
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  (state: UserOrdersState) => state.orders
);
