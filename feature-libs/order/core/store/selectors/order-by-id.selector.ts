/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MemoizedSelector, createSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { StateWithOrder, OrderState } from '../order-state';
import { getOrderState } from './feature.selector';

export const getOrderByIDState: MemoizedSelector<
  StateWithOrder,
  StateUtils.EntityLoaderState<Order>
> = createSelector(getOrderState, (state: OrderState) => state.orderByID);

export const getOrderByIdState = (
  code: string
): MemoizedSelector<StateWithOrder, StateUtils.LoaderState<Order>> =>
  createSelector(
    getOrderByIDState,
    (state: StateUtils.EntityLoaderState<Order>) =>
      StateUtils.entityLoaderStateSelector(state, code)
  );
export const getOrderById = (
  code: string
): MemoizedSelector<StateWithOrder, Order> => {
  return createSelector(getOrderByIdState(code), (orderByIDState) =>
    StateUtils.loaderValueSelector(orderByIDState)
  );
};

export const getOrderByIdLoading = (
  code: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(getOrderByIdState(code), (loaderState) =>
    StateUtils.loaderLoadingSelector(loaderState)
  );
};

export const getOrderByIdSuccess = (
  code: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(getOrderByIdState(code), (loaderState) =>
    StateUtils.loaderSuccessSelector(loaderState)
  );
};
