/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReturnRequestList } from '@spartacus/order/root';
import { OrderActions } from '../actions/index';

export const initialState: ReturnRequestList = {
  returnRequests: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: OrderActions.OrderReturnRequestAction
): ReturnRequestList {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }

  return state;
}
