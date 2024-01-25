/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ReplenishmentOrderList } from '@spartacus/order/root';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getReplenishmentOrdersState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ReplenishmentOrderList>
> = createSelector(
  getOrderState,
  (state: OrderState) => state.replenishmentOrders
);

export const getReplenishmentOrders: MemoizedSelector<
  StateWithOrder,
  ReplenishmentOrderList
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderValueSelector(state)
);

export const getReplenishmentOrdersLoading: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getReplenishmentOrdersError: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderErrorSelector(state)
);

export const getReplenishmentOrdersSuccess: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrdersState,
  (state: StateUtils.LoaderState<ReplenishmentOrderList>) =>
    StateUtils.loaderSuccessSelector(state)
);
