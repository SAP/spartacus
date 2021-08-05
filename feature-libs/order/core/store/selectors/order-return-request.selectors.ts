import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReturnRequest, ReturnRequestList, StateUtils } from '@spartacus/core';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getOrderReturnRequestState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ReturnRequest>
> = createSelector(getOrderState, (state: OrderState) => state.orderReturn);

export const getOrderReturnRequest: MemoizedSelector<
  StateWithOrder,
  ReturnRequest
> = createSelector(
  getOrderReturnRequestState,
  (state: StateUtils.LoaderState<ReturnRequest>) =>
    StateUtils.loaderValueSelector(state)
);

export const getOrderReturnRequestLoading: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: StateUtils.LoaderState<ReturnRequest>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getOrderReturnRequestSuccess: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getOrderReturnRequestState,
  (state: StateUtils.LoaderState<ReturnRequest>) =>
    StateUtils.loaderSuccessSelector(state) &&
    !StateUtils.loaderLoadingSelector(state)
);

export const getOrderReturnRequestListState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ReturnRequestList>
> = createSelector(getOrderState, (state: OrderState) => state.orderReturnList);

export const getOrderReturnRequestList: MemoizedSelector<
  StateWithOrder,
  ReturnRequestList
> = createSelector(
  getOrderReturnRequestListState,
  (state: StateUtils.LoaderState<ReturnRequestList>) =>
    StateUtils.loaderValueSelector(state)
);
