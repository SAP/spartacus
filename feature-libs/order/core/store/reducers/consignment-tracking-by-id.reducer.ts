/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsignmentTracking } from '@spartacus/order/root';
import { OrderActions } from '..';

export const initialStateOfConsignmentTrackingById:
  | ConsignmentTracking
  | undefined = undefined;

export function reducer(
  state = initialStateOfConsignmentTrackingById,
  action: OrderActions.ConsignmentTrackingByIdAction
): ConsignmentTracking | undefined {
  switch (action.type) {
    case OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS: {
      return action.payload.consignmentTracking
        ? action.payload.consignmentTracking
        : initialStateOfConsignmentTrackingById;
    }
    case OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL: {
      return initialStateOfConsignmentTrackingById;
    }
  }
  return state;
}
