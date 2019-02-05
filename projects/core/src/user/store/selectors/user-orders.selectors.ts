import { createSelector, MemoizedSelector } from '@ngrx/store';

import { UserState, StateWithUser } from '../user-state';
import { OrderHistoryList } from '../../../occ/occ-models/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderValueSelector,
  loaderLoadingSelector
} from '../../../state/utils/loader/loader.selectors';

import { getUserState } from './feature.selector';

export const getOrdersState: MemoizedSelector<
  StateWithUser,
  LoaderState<OrderHistoryList>
> = createSelector(
  getUserState,
  (state: UserState) => state.orders
);

export const getOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(
  getOrdersState,
  (state: LoaderState<OrderHistoryList>) => loaderLoadingSelector(state)
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  (state: LoaderState<OrderHistoryList>) => loaderValueSelector(state)
);
