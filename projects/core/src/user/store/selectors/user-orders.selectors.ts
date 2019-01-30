import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { OrderHistoryList } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getOrdersLoaderState: MemoizedSelector<
  StateWithUser,
  LoaderState<OrderHistoryList>
> = createSelector(
  getUserState,
  (state: UserState) => state.orders
);

export const getOrdersState: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersLoaderState,
  (state: LoaderState<OrderHistoryList>) => loaderValueSelector(state)
);

export const getOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrdersLoaderState,
  (state: LoaderState<OrderHistoryList>) => loaderLoadingSelector(state)
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  (state: OrderHistoryList) => state
);
