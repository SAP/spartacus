/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';

export const UNIT_ORDER_FEATURE = 'unit order';
export const UNIT_ORDERS = '[Unit Order] Unit Orders';
export const UNIT_ORDER_DETAILS = '[Unit Order] Order Details';

export interface StateWithUnitOrder {
  [UNIT_ORDER_FEATURE]: UnitOrderState;
}

export interface UnitOrderState {
  orders: StateUtils.LoaderState<OrderHistoryList>;
  orderDetail: StateUtils.LoaderState<Order>;
}
