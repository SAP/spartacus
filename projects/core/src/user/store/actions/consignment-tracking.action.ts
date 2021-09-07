import { Action } from '@ngrx/store';
import { ConsignmentTracking } from '../../../model/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_CONSIGNMENT_TRACKING = '[User] Load Consignment Tracking';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_CONSIGNMENT_TRACKING_FAIL =
  '[User] Load Consignment Tracking Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_CONSIGNMENT_TRACKING_SUCCESS =
  '[User] Load Consignment Tracking Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_CONSIGNMENT_TRACKING = '[User] Clear Consignment Tracking';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadConsignmentTrackingFail implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadConsignmentTrackingSuccess implements Action {
  readonly type = LOAD_CONSIGNMENT_TRACKING_SUCCESS;
  constructor(public payload: ConsignmentTracking) {}
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearConsignmentTracking {
  readonly type = CLEAR_CONSIGNMENT_TRACKING;
  constructor() {}
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export type ConsignmentTrackingAction =
  | LoadConsignmentTracking
  | LoadConsignmentTrackingFail
  | LoadConsignmentTrackingSuccess
  | ClearConsignmentTracking;
