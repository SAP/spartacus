import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderHistoryList } from '../../../model/order.model';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import {
  loaderSuccessSelector,
  loaderValueSelector,
} from '../../../state/utils/loader/loader.selectors';
import { StateWithUser, UserState } from '../user-state';
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
  (state: LoaderState<OrderHistoryList>) => loaderSuccessSelector(state)
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(
  getOrdersState,
  (state: LoaderState<OrderHistoryList>) => loaderValueSelector(state)
);
