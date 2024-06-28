/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionErrorProperty, StateUtils } from '@spartacus/core';
import { ReplenishmentOrderList } from '@spartacus/order/root';
import { REPLENISHMENT_ORDERS } from '../order-state';

export const LOAD_USER_REPLENISHMENT_ORDERS =
  '[Order] Load User Replenishment Orders';
export const LOAD_USER_REPLENISHMENT_ORDERS_FAIL =
  '[Order] Load User Replenishment Orders Fail';
export const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS =
  '[Order] Load User Replenishment Orders Success';
export const CLEAR_USER_REPLENISHMENT_ORDERS =
  '[Order] Clear User Replenishment Orders';

export class LoadUserReplenishmentOrders extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS;

  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(REPLENISHMENT_ORDERS);
  }
}

export class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_FAIL;

  constructor(error: ActionErrorProperty);
  /**
   * @deprecated Please !! use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing non-deprecated constructor
    error: any
  );
  constructor(public error: any) {
    super(REPLENISHMENT_ORDERS, error);
  }
}

export class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS;

  constructor(public payload: ReplenishmentOrderList) {
    super(REPLENISHMENT_ORDERS);
  }
}

export class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_USER_REPLENISHMENT_ORDERS;

  constructor() {
    super(REPLENISHMENT_ORDERS);
  }
}

export type UserReplenishmentOrdersAction =
  | LoadUserReplenishmentOrders
  | LoadUserReplenishmentOrdersFail
  | LoadUserReplenishmentOrdersSuccess
  | ClearUserReplenishmentOrders;
