import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Order } from '../../../model/order.model';
import { StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';
import { LoaderState } from '../../../state/utils/loader/loader-state';
import { StateLoaderSelectors } from '../../../state/utils/index';

export const getOrderState: MemoizedSelector<
  StateWithUser,
  LoaderState<Order>
> = createSelector(getUserState, (state: UserState) => state.order);

export const getOrderDetails: MemoizedSelector<
  StateWithUser,
  Order
> = createSelector(getOrderState, (state: LoaderState<Order>) =>
  StateLoaderSelectors.loaderValueSelector(state)
);
