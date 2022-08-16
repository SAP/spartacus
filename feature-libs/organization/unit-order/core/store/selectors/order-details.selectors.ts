import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { StateWithUnitOrder, UnitOrderState } from '../unit-order-state';
import { getOrderState } from './feature.selector';

export const getOrderDetailState: MemoizedSelector<
  StateWithUnitOrder,
  StateUtils.LoaderState<Order>
> = createSelector(getOrderState, (state: UnitOrderState) => state.orderDetail);

export const getOrderDetails: MemoizedSelector<StateWithUnitOrder, Order> =
  createSelector(getOrderDetailState, (state: StateUtils.LoaderState<Order>) =>
    StateUtils.loaderValueSelector(state)
  );
