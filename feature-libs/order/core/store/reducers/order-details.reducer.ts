/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Order } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';

export const initialState: Order = {};

export function reducer(
  state = initialState,
  action: OrderActions.OrderDetailsAction
): Order {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;
      return order;
    }
  }
  return state;
}
