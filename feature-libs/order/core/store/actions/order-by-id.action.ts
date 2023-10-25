/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
import { ORDER_BY_ID_ENTITIES } from '../order-state';

export const LOAD_ORDER_BY_ID = '[Order] Load Order By ID Data';
export const LOAD_ORDER_BY_ID_FAIL = '[Order] Load Order By ID Data Fail';
export const LOAD_ORDER_BY_ID_SUCCESS = '[Order] Load Order By ID Data Success';
export class LoadOrderById extends StateUtils.EntityLoadAction {
  readonly type = LOAD_ORDER_BY_ID;
  constructor(public payload: { userId: string; code: string }) {
    super(ORDER_BY_ID_ENTITIES, payload.code);
  }
}

export class LoadOrderByIdFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_ORDER_BY_ID_FAIL;
  constructor(public payload: { code: string; error: any }) {
    super(ORDER_BY_ID_ENTITIES, payload.code, payload.error);
  }
}

export class LoadOrderByIdSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_ORDER_BY_ID_SUCCESS;
  constructor(public payload: Order) {
    super(ORDER_BY_ID_ENTITIES, payload.code ?? '');
  }
}

export type OrderByIdAction =
  | LoadOrderById
  | LoadOrderByIdFail
  | LoadOrderByIdSuccess;
