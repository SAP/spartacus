/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MemoizedSelector, createSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import {
  StateWithOrder,
  OrderState,
  getConsignmentTrackingByIdEntityKey,
} from '../order-state';
import { getOrderState } from './feature.selector';

export const getConsignmentTrackingByIdEntities: MemoizedSelector<
  StateWithOrder,
  StateUtils.EntityLoaderState<ConsignmentTracking>
> = createSelector(
  getOrderState,
  (state: OrderState) => state.consignmentTrackingById
);

export const getConsignmentTrackingByIdEntity = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<
  StateWithOrder,
  StateUtils.LoaderState<ConsignmentTracking>
> =>
  createSelector(
    getConsignmentTrackingByIdEntities,
    (state: StateUtils.EntityLoaderState<ConsignmentTracking>) =>
      StateUtils.entityLoaderStateSelector(
        state,
        getConsignmentTrackingByIdEntityKey(orderCode, consignmentCode)
      )
  );
export const getConsignmentTrackingById = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, ConsignmentTracking> => {
  return createSelector(
    getConsignmentTrackingByIdEntity(orderCode, consignmentCode),
    (consignmentTrackingByIdState) =>
      StateUtils.loaderValueSelector(consignmentTrackingByIdState)
  );
};

export const getConsignmentTrackingByIdLoading = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(
    getConsignmentTrackingByIdEntity(orderCode, consignmentCode),
    (loaderState) => StateUtils.loaderLoadingSelector(loaderState)
  );
};

export const getConsignmentTrackingByIdSuccess = (
  orderCode: string,
  consignmentCode: string
): MemoizedSelector<StateWithOrder, boolean> => {
  return createSelector(
    getConsignmentTrackingByIdEntity(orderCode, consignmentCode),
    (loaderState) => StateUtils.loaderSuccessSelector(loaderState)
  );
};
