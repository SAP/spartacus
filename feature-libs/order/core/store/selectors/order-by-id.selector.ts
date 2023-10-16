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

export const getOrderByIdEntities: MemoizedSelector<
  StateWithOrder,
  StateUtils.EntityLoaderState<Order>
> = createSelector(getOrderState, (state: OrderState) => state.orderById);

export const getOrderByIdEntity = (
  code: string
): MemoizedSelector<StateWithOrder, StateUtils.LoaderState<Order>> =>
  createSelector(
    getOrderByIdEntities,
    (state: StateUtils.EntityLoaderState<Order>) =>
      StateUtils.entityLoaderStateSelector(state, code)
  );

export const getOrderById = (
  code: string
): MemoizedSelector<StateWithOrder, Order> => {
  return createSelector(getOrderByIdEntity(code), (orderByIDState) =>
    StateUtils.loaderValueSelector(orderByIDState)
  );
};

export const getOrderByIdLoading = (
  code: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(getOrderByIdEntity(code), (loaderState) =>
    StateUtils.loaderLoadingSelector(loaderState)
  );
};

export const getOrderByIdSuccess = (
  code: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(getOrderByIdEntity(code), (loaderState) =>
    StateUtils.loaderSuccessSelector(loaderState)
  );
};
