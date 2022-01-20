import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrdersState: MemoizedSelector<
  StateWithUser,
  LoaderState<OrderHistoryList>
> = createSelector(getUserState, (state: UserState) => state.orders);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrdersLoaded: MemoizedSelector<StateWithUser, boolean> =
  createSelector(getOrdersState, (state: LoaderState<OrderHistoryList>) =>
    StateUtils.loaderSuccessSelector(state)
  );

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrders: MemoizedSelector<StateWithUser, OrderHistoryList> =
  createSelector(getOrdersState, (state: LoaderState<OrderHistoryList>) =>
    StateUtils.loaderValueSelector(state)
  );
