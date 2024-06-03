/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OrderHistoryList } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: OrderActions.UserOrdersAction
): OrderHistoryList {
  switch (action.type) {
    case OrderActions.LOAD_USER_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case OrderActions.LOAD_USER_ORDERS_FAIL: {
      return initialState;
    }
  }

  return state;
}
