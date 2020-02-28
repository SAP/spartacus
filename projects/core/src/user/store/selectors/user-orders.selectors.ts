import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderHistoryList } from '../../../model/order.model';
import { StateLoaderSelectors } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getOrdersState: MemoizedSelector<
  StateWithUser,
  LoaderState<OrderHistoryList>
> = createSelector(getUserState, (state: UserState) => state.orders);

export const getOrdersLoaded: MemoizedSelector<
  StateWithUser,
  boolean
> = createSelector(getOrdersState, (state: LoaderState<OrderHistoryList>) =>
  StateLoaderSelectors.loaderSuccessSelector(state)
);

export const getOrders: MemoizedSelector<
  StateWithUser,
  OrderHistoryList
> = createSelector(getOrdersState, (state: LoaderState<OrderHistoryList>) =>
  StateLoaderSelectors.loaderValueSelector(state)
);
