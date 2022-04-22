import { Action } from '@ngrx/store';
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

export class LoadConsignmentTrackingFail implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_FAIL;
  constructor(public payload: any) {}
}

export class LoadConsignmentTrackingSuccess implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_SUCCESS;
  constructor(public payload: ConsignmentTracking) {}
}

export class ClearConsignmentTracking {
  readonly type = CLEAR_CONSIGNMENT_TRACKING;
  constructor() {}
}

export type ConsignmentTrackingAction =
  | LoadConsignmentTracking
  | LoadConsignmentTrackingFail
  | LoadConsignmentTrackingSuccess
  | ClearConsignmentTracking;
