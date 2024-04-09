/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import {
  ConsignmentTracking,
  Order,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  ReturnRequest,
  ReturnRequestList,
} from '@spartacus/order/root';
import {
  CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
  ORDERS,
  OrderState,
  ORDER_BY_ID_ENTITIES,
  ORDER_DETAILS,
  REPLENISHMENT_ORDERS,
  REPLENISHMENT_ORDER_DETAILS,
  RETURN_REQUESTS,
  RETURN_REQUEST_DETAILS,
} from '../order-state';
import * as fromConsignmentTrackingByIDReducer from './consignment-tracking-by-id.reducer';
import * as fromOrderByIDReducer from './order-by-id.reducer';
import * as fromConsignmentTrackingReducer from './consignment-tracking.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';
import * as fromUserOrdersReducer from './orders.reducer';
import * as fromReplenishmentOrderDetailsReducer from './replenishment-order-details.reducer';
import * as fromUserReplenishmentOrdersReducer from './replenishment-orders.reducer';

export function getReducers(): ActionReducerMap<OrderState, any> {
  return {
    orders: StateUtils.loaderReducer<OrderHistoryList, any>(
      ORDERS,
      fromUserOrdersReducer.reducer
    ),
    orderDetail: StateUtils.loaderReducer<Order, any>(
      ORDER_DETAILS,
      fromOrderDetailsReducer.reducer
    ),
    replenishmentOrders: StateUtils.loaderReducer<ReplenishmentOrderList, any>(
      REPLENISHMENT_ORDERS,
      fromUserReplenishmentOrdersReducer.reducer
    ),
    orderReturn: StateUtils.loaderReducer<ReturnRequest>(
      RETURN_REQUEST_DETAILS
    ),
    orderReturnList: StateUtils.loaderReducer<ReturnRequestList, any>(
      RETURN_REQUESTS,
      fromOrderReturnRequestReducer.reducer
    ),
    consignmentTracking: fromConsignmentTrackingReducer.reducer,
    replenishmentOrder: StateUtils.loaderReducer<ReplenishmentOrder, any>(
      REPLENISHMENT_ORDER_DETAILS,
      fromReplenishmentOrderDetailsReducer.reducer
    ),
    orderById: StateUtils.entityLoaderReducer<Order, any>(
      ORDER_BY_ID_ENTITIES,
      fromOrderByIDReducer.reducer
    ),
    consignmentTrackingById: StateUtils.entityLoaderReducer<
      ConsignmentTracking,
      any
    >(
      CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
      fromConsignmentTrackingByIDReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<OrderState>> =
  new InjectionToken<ActionReducerMap<OrderState>>('OrderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
