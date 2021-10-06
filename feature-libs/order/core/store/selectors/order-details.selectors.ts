import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Order, StateUtils } from '@spartacus/core';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getOrderDetailState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<Order>
> = createSelector(getOrderState, (state: OrderState) => state.orderDetail);

export const getOrderDetails: MemoizedSelector<StateWithOrder, Order> =
  createSelector(getOrderDetailState, (state: StateUtils.LoaderState<Order>) =>
    StateUtils.loaderValueSelector(state)
  );
