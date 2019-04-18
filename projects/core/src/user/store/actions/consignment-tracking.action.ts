import { Action } from '@ngrx/store';
import { ConsignmentTracking } from '../../index';

export const LOAD_CONSIGNMENT_TRACKING = '[User] Load Consignment Tracking';
export const LOAD_CONSIGNMENT_TRACKING_FAIL = '[User] Load Consignment Tracking Fail';
export const LOAD_CONSIGNMENT_TRACKING_SUCCESS = '[User] Load Consignment Tracking Success';

export class LoadConsignmentTracking implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING;
  constructor(
    public payload: {
      orderCode: string;
      consignmentCode: string;
    }
  ) { }
}

export class LoadConsignmentTrackingFail implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_FAIL;
  constructor(public payload: any) { }
}

export class LoadConsignmentTrackingSuccess implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_SUCCESS;
  constructor(public payload: ConsignmentTracking) { }
}

export type ConsignmentTrackingAction =
  | LoadConsignmentTracking
  | LoadConsignmentTrackingFail
  | LoadConsignmentTrackingSuccess;
