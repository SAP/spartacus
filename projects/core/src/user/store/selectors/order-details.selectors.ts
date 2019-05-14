import { createSelector, MemoizedSelector } from '@ngrx/store';

import { OrderDetailsState, UserState, StateWithUser } from '../user-state';
import { getUserState } from './feature.selector';
import { Order } from '../../../model/order.model';

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
