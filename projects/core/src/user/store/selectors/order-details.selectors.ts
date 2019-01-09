import { createSelector, MemoizedSelector } from '@ngrx/store';

import { OrderDetailsState, UserState, StateWithUser } from '../user-state';
import { Order } from '../../../occ/occ-models/index';
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
