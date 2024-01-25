/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import { UNIT_ORDERS, UNIT_ORDER_DETAILS } from '../unit-order-state';

export const LOAD_UNIT_ORDERS = '[Unit Order] Load Unit Orders';
export const LOAD_UNIT_ORDERS_FAIL = '[Unit Order] Load Unit Orders Fail';
export const LOAD_UNIT_ORDERS_SUCCESS = '[Unit Order] Load Unit Orders Success';
export const CLEAR_UNIT_ORDERS = '[Unit Order] Clear Unit Orders';

export const LOAD_ORDER_DETAILS = '[Unit Order] Load Unit Order Details';
export const LOAD_ORDER_DETAILS_FAIL =
  '[Unit Order] Load Unit Order Details Fail';
export const LOAD_ORDER_DETAILS_SUCCESS =
  '[Unit Order] Load Unit Order Details Success';
export const CLEAR_ORDER_DETAILS = '[Unit Order] Clear Unit Order Details';

export class LoadUnitOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_UNIT_ORDERS;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      filters?: string;
      sort?: string;
    }
  ) {
    super(UNIT_ORDERS);
  }
}

export class LoadUnitOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_UNIT_ORDERS_FAIL;
  constructor(public payload: any) {
    super(UNIT_ORDERS, payload);
  }
}

export class LoadUnitOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_UNIT_ORDERS_SUCCESS;
  constructor(public payload?: OrderHistoryList) {
    super(UNIT_ORDERS);
  }
}

export class ClearUnitOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_UNIT_ORDERS;
  constructor() {
    super(UNIT_ORDERS);
  }
}

export class LoadOrderDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_ORDER_DETAILS;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
    }
  ) {
    super(UNIT_ORDER_DETAILS);
  }
}

export class LoadOrderDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(UNIT_ORDER_DETAILS, payload);
  }
}

export class LoadOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_ORDER_DETAILS_SUCCESS;
  constructor(public payload: Order) {
    super(UNIT_ORDER_DETAILS);
  }
}

export class ClearOrderDetails extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_ORDER_DETAILS;
  constructor() {
    super(UNIT_ORDER_DETAILS);
  }
}

export type UnitOrdersAction =
  | LoadUnitOrders
  | LoadUnitOrdersFail
  | LoadUnitOrdersSuccess
  | ClearUnitOrders
  | LoadOrderDetails
  | LoadOrderDetailsFail
  | LoadOrderDetailsSuccess
  | ClearOrderDetails;
