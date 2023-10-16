/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '@spartacus/order/root';
import { OrderActions } from '..';

export const initialStateOfOrderById = undefined;

export function reducer(
  state = initialStateOfOrderById,
  action: OrderActions.OrderByIdAction
): Order | undefined {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_BY_ID_SUCCESS: {
      return action.payload ? action.payload : initialStateOfOrderById;
    }
    case OrderActions.LOAD_ORDER_BY_ID_FAIL: {
      return initialStateOfOrderById;
    }
  }
  return state;
}
