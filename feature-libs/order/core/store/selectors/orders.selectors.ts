/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
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
