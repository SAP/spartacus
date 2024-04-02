/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { StateWithUnitOrder, UnitOrderState } from '../unit-order-state';
import { getOrderState } from './feature.selector';

export const getOrdersState: MemoizedSelector<
  StateWithUnitOrder,
  StateUtils.LoaderState<OrderHistoryList>
> = createSelector(getOrderState, (state: UnitOrderState) => state.orders);

export const getOrdersLoaded: MemoizedSelector<StateWithUnitOrder, boolean> =
  createSelector(
    getOrdersState,
    (state: StateUtils.LoaderState<OrderHistoryList>) =>
      StateUtils.loaderSuccessSelector(state)
  );

export const getOrders: MemoizedSelector<StateWithUnitOrder, OrderHistoryList> =
  createSelector(
    getOrdersState,
    (state: StateUtils.LoaderState<OrderHistoryList>) =>
      StateUtils.loaderValueSelector(state)
  );

export const getOrderDetailState: MemoizedSelector<
  StateWithUnitOrder,
  StateUtils.LoaderState<Order>
> = createSelector(getOrderState, (state: UnitOrderState) => state.orderDetail);

export const getOrderDetails: MemoizedSelector<StateWithUnitOrder, Order> =
  createSelector(getOrderDetailState, (state: StateUtils.LoaderState<Order>) =>
    StateUtils.loaderValueSelector(state)
  );
