import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReturnRequest } from '../../../model/order.model';
import {
  OrderReturnRequestState,
  StateWithUser,
  UserState,
} from '../user-state';
import { getUserState } from './feature.selector';

export const getOrderReturnRequestState: MemoizedSelector<
  StateWithUser,
  OrderReturnRequestState
> = createSelector(
  getUserState,
  (state: UserState) => state.orderReturnRequest
);

export const getOrderReturnRequest: MemoizedSelector<
  StateWithUser,
  ReturnRequest
> = createSelector(
  getOrderReturnRequestState,
  (state: OrderReturnRequestState) => state.returnRequest
);
