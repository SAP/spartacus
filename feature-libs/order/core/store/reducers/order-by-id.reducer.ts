/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '@spartacus/order/root';
import { OrderActions } from '..';

export const initialStateOfOrderByID = undefined;

export function reducer(
  state = initialStateOfOrderByID,
  action: OrderActions.OrderByIDAction
): Order | undefined {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_BY_ID_SUCCESS: {
      return action.payload ? action.payload : initialStateOfOrderByID;
    }
    case OrderActions.LOAD_ORDER_BY_ID_FAIL: {
      return initialStateOfOrderByID;
    }
  }
  return state;
}
