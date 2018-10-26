import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderDetailsState } from './../reducers/order-details.reducer';

import * as fromFeature from '../reducers';
import * as fromOrderDetailsReducer from '../reducers/order-details.reducer';

export const getOrderState: MemoizedSelector<
  any,
  OrderDetailsState
> = createSelector(
  fromFeature.getUserState,
  (state: fromFeature.UserState) => state.order
);

export const getOrderDetails: MemoizedSelector<any, any> = createSelector(
  getOrderState,
  fromOrderDetailsReducer.getOrderDetails
);
