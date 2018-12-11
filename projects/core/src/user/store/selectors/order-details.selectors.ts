import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers/index';
import * as fromOrderDetailsReducer from '../reducers/order-details.reducer';
import { OrderDetailsState, UserState } from '../user-state';

export const getOrderState: MemoizedSelector<
  any,
  OrderDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: UserState) => state.order
);

export const getOrderDetails: MemoizedSelector<any, any> = createSelector(
  getOrderState,
  fromOrderDetailsReducer.getOrderDetails
);
