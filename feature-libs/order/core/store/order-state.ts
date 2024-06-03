/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
export const ORDER_FEATURE = 'order';

export const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
export const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';
export const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = 'cancelReplenishmentOrder';
export const ORDERS = '[Order] User Orders';
export const RETURN_REQUESTS = '[Order] Order Return Requests';
export const RETURN_REQUEST_DETAILS = '[Order] Return Request Details';
export const ORDER_DETAILS = '[Order] User Order Details';
export const REPLENISHMENT_ORDERS = '[Order] User Replenishment Orders';
export const REPLENISHMENT_ORDER_DETAILS =
  '[Order] User Replenishment Order Details';
export const CONSIGNMENT_TRACKING_BY_ID_ENTITIES =
  'consignment-tracking-by-id-entities';
export const ORDER_BY_ID_ENTITIES = 'order-by-id-entities';

export interface StateWithOrder {
  [ORDER_FEATURE]: OrderState;
}

export interface OrderState {
  orders: StateUtils.LoaderState<OrderHistoryList>;
  orderDetail: StateUtils.LoaderState<Order>;
  replenishmentOrders: StateUtils.LoaderState<ReplenishmentOrderList>;
  orderReturn: StateUtils.LoaderState<ReturnRequest>;
  orderReturnList: StateUtils.LoaderState<ReturnRequestList>;
  consignmentTracking: ConsignmentTrackingState;
  replenishmentOrder: StateUtils.LoaderState<ReplenishmentOrder>;
  consignmentTrackingById: StateUtils.EntityLoaderState<ConsignmentTracking>;
  orderById: StateUtils.EntityLoaderState<Order>;
}

export interface ConsignmentTrackingState {
  tracking: ConsignmentTracking;
}

export function getConsignmentTrackingByIdEntityKey(
  orderCode: string,
  consignmentCode: string
): string {
  return `${orderCode},${consignmentCode}`;
}
