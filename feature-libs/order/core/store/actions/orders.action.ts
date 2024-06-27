/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionErrorProperty, StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { ORDERS } from '../order-state';

export const LOAD_USER_ORDERS = '[Order] Load User Orders';
export const LOAD_USER_ORDERS_FAIL = '[Order] Load User Orders Fail';
export const LOAD_USER_ORDERS_SUCCESS = '[Order] Load User Orders Success';
export const CLEAR_USER_ORDERS = '[Order] Clear User Orders';

export class LoadUserOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_ORDERS;

  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
      replenishmentOrderCode?: string;
    }
  ) {
    super(ORDERS);
  }
}

export class LoadUserOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_ORDERS_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing non-deprecated constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {
    super(ORDERS, error);
  }
}

export class LoadUserOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_ORDERS_SUCCESS;

  constructor(public payload: OrderHistoryList) {
    super(ORDERS);
  }
}

export class ClearUserOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_ORDERS;

  constructor() {
    super(ORDERS);
  }
}

export type UserOrdersAction =
  | LoadUserOrders
  | LoadUserOrdersFail
  | LoadUserOrdersSuccess
  | ClearUserOrders;
