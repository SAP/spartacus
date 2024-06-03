/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ReplenishmentOrder,
  ReplenishmentOrderList,
} from '@spartacus/order/root';
import { OrderActions } from '../actions/index';

export const initialState: ReplenishmentOrderList = {
  replenishmentOrders: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action:
    | OrderActions.UserReplenishmentOrdersAction
    | OrderActions.ReplenishmentOrderDetailsAction
): ReplenishmentOrderList {
  switch (action.type) {
    case OrderActions.LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    case OrderActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
      const cancelledReplenishmentOrder = action.payload;
      const userReplenishmentOrders = [...(state.replenishmentOrders ?? [])];

      const index = userReplenishmentOrders.findIndex(
        (replenishmentOrder: ReplenishmentOrder) =>
          replenishmentOrder.replenishmentOrderCode ===
          cancelledReplenishmentOrder.replenishmentOrderCode
      );

      if (index === -1) {
        return initialState;
      } else {
        userReplenishmentOrders[index] = {
          ...cancelledReplenishmentOrder,
        };
      }

      return { ...state, replenishmentOrders: userReplenishmentOrders };
    }
  }
  return state;
}
