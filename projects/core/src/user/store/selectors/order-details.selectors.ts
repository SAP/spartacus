import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Order } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderState: MemoizedSelector<
  StateWithUser,
  LoaderState<Order>
> = createSelector(getUserState, (state: UserState) => state.order);

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const getOrderDetails: MemoizedSelector<StateWithUser, Order> =
  createSelector(getOrderState, (state: LoaderState<Order>) =>
    StateUtils.loaderValueSelector(state)
  );
