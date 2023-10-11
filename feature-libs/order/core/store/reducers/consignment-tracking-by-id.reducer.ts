/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConsignmentTracking } from '@spartacus/order/root';
import { OrderActions } from '..';

export const initialStateOfConsignmentTrackingByID = undefined;

export function reducer(
  state = initialStateOfConsignmentTrackingByID,
  action: OrderActions.ConsignmentTrackingByIDAction
): ConsignmentTracking | undefined {
  switch (action.type) {
    case OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS: {
      return action.payload.consignmentTracking
        ? action.payload.consignmentTracking
        : initialStateOfConsignmentTrackingByID;
    }
    case OrderActions.LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL: {
      return initialStateOfConsignmentTrackingByID;
    }
  }
  return state;
}
