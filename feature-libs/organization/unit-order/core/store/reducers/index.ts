/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import {
  UnitOrderState,
  UNIT_ORDERS,
  UNIT_ORDER_DETAILS,
} from '../unit-order-state';

import * as fromUnitOrdersReducer from './unit-order.reducer';

export function getReducers(): ActionReducerMap<UnitOrderState, any> {
  return {
    orders: StateUtils.loaderReducer<OrderHistoryList, any>(
      UNIT_ORDERS,
      fromUnitOrdersReducer.historyReducer
    ),
    orderDetail: StateUtils.loaderReducer<Order, any>(
      UNIT_ORDER_DETAILS,
      fromUnitOrdersReducer.detailReducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<UnitOrderState>> =
  new InjectionToken<ActionReducerMap<UnitOrderState>>('UnitOrderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
