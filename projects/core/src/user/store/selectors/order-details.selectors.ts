import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Order } from '../../../model/order.model';
import { OrderDetailsState, StateWithUser, UserState } from '../user-state';
import { getUserState } from './feature.selector';

export const getOrderState: MemoizedSelector<
  StateWithUser,
  OrderDetailsState
> = createSelector(
  getUserState,
  (state: UserState) => state.order
);

export const getOrderDetails: MemoizedSelector<
  StateWithUser,
  Order
> = createSelector(
  getOrderState,
  (state: OrderDetailsState) => state.order
);
