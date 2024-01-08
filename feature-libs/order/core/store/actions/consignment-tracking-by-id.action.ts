/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
import {
  CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
  getConsignmentTrackingByIdEntityKey,
} from '../order-state';

export const LOAD_CONSIGNMENT_TRACKING_BY_ID =
  '[Order] Load Consignment Tracking By ID Data';
export const LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL =
  '[Order] Load  Consignment Tracking By ID Data Fail';
export const LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS =
  '[Order] Load Consignment Tracking By ID Data Success';

export class LoadConsignmentTrackingById extends StateUtils.EntityLoadAction {
  readonly type = LOAD_CONSIGNMENT_TRACKING_BY_ID;
  constructor(
    public payload: {
      orderCode: string;
      consignmentCode: string;
      userId: string;
    }
  ) {
    super(
      CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
      getConsignmentTrackingByIdEntityKey(
        payload.orderCode,
        payload.consignmentCode
      )
    );
  }
}

export class LoadConsignmentTrackingByIdFail extends StateUtils.EntityFailAction {
  readonly type = LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL;
  constructor(
    public payload: { orderCode: string; consignmentCode: string; error: any }
  ) {
    super(
      CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
      getConsignmentTrackingByIdEntityKey(
        payload.orderCode,
        payload.consignmentCode
      ),
      payload.error
    );
  }
}

export class LoadConsignmentTrackingByIdSuccess extends StateUtils.EntitySuccessAction {
  readonly type = LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS;
  constructor(
    public payload: {
      orderCode: string;
      consignmentCode: string;
      consignmentTracking: ConsignmentTracking;
    }
  ) {
    super(
      CONSIGNMENT_TRACKING_BY_ID_ENTITIES,
      getConsignmentTrackingByIdEntityKey(
        payload.orderCode,
        payload.consignmentCode
      )
    );
  }
}

export type ConsignmentTrackingByIdAction =
  | LoadConsignmentTrackingById
  | LoadConsignmentTrackingByIdFail
  | LoadConsignmentTrackingByIdSuccess;
