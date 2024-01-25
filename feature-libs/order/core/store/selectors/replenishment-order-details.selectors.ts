/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSelector, MemoizedSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
import { OrderState, StateWithOrder } from '../order-state';
import { getOrderState } from './feature.selector';

export const getReplenishmentOrderState: MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ReplenishmentOrder>
> = createSelector(
  getOrderState,
  (state: OrderState) => state.replenishmentOrder
);

export const getReplenishmentOrderDetailsValue: MemoizedSelector<
  StateWithOrder,
  ReplenishmentOrder
> = createSelector(
  getReplenishmentOrderState,
  (state: StateUtils.LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderValueSelector(state)
);

export const getReplenishmentOrderDetailsLoading: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: StateUtils.LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderLoadingSelector(state)
);

export const getReplenishmentOrderDetailsSuccess: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: StateUtils.LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderSuccessSelector(state)
);

export const getReplenishmentOrderDetailsError: MemoizedSelector<
  StateWithOrder,
  boolean
> = createSelector(
  getReplenishmentOrderState,
  (state: StateUtils.LoaderState<ReplenishmentOrder>) =>
    StateUtils.loaderErrorSelector(state)
);
