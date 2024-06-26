/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ActionErrorProperty, ErrorAction } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';

export const LOAD_CONSIGNMENT_TRACKING = '[Order] Load Consignment Tracking';
export const LOAD_CONSIGNMENT_TRACKING_FAIL =
  '[Order] Load Consignment Tracking Fail';
export const LOAD_CONSIGNMENT_TRACKING_SUCCESS =
  '[Order] Load Consignment Tracking Success';
export const CLEAR_CONSIGNMENT_TRACKING = '[Order] Clear Consignment Tracking';

export class LoadConsignmentTracking implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING;

  constructor(
    public payload: {
      userId?: string;
      orderCode: string;
      consignmentCode: string;
    }
  ) {}
}

export class LoadConsignmentTrackingFail implements ErrorAction {
  readonly type = LOAD_CONSIGNMENT_TRACKING_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {}
}

export class LoadConsignmentTrackingSuccess implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_SUCCESS;

  constructor(public payload: ConsignmentTracking) {}
}

export class ClearConsignmentTracking {
  readonly type = CLEAR_CONSIGNMENT_TRACKING;

  constructor() {
    // Intentional empty constructor
  }
}

export type ConsignmentTrackingAction =
  | LoadConsignmentTracking
  | LoadConsignmentTrackingFail
  | LoadConsignmentTrackingSuccess
  | ClearConsignmentTracking;
