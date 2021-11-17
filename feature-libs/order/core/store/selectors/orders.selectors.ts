import { createSelector, MemoizedSelector } from '@ngrx/store';
import { OrderHistoryList, StateUtils } from '@spartacus/core';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getOrdersState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<OrderHistoryList>
> = createSelector(getOrderState, (state: OrderState) => state.orders);

export const getOrdersLoaded: MemoizedSelector<StateWithOrder, boolean> =
  createSelector(
    getOrdersState,
    (state: StateUtils.LoaderState<OrderHistoryList>) =>
      StateUtils.loaderSuccessSelector(state)
  );

export const getOrders: MemoizedSelector<StateWithOrder, OrderHistoryList> =
  createSelector(
    getOrdersState,
    (state: StateUtils.LoaderState<OrderHistoryList>) =>
      StateUtils.loaderValueSelector(state)
  );
