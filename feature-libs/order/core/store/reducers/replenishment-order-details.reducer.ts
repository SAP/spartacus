/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReplenishmentOrder } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';

export const initialState: ReplenishmentOrder = {};

export function reducer(
  state = initialState,
  action: OrderActions.ReplenishmentOrderDetailsAction
): ReplenishmentOrder {
  switch (action.type) {
    case OrderActions.LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS:
    case OrderActions.CANCEL_REPLENISHMENT_ORDER_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    default: {
      return state;
    }
  }
}
