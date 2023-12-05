import { Action } from '@ngrx/store';
import { ConsignmentTracking } from '@spartacus/order/root';
export declare const LOAD_CONSIGNMENT_TRACKING = "[Order] Load Consignment Tracking";
export declare const LOAD_CONSIGNMENT_TRACKING_FAIL = "[Order] Load Consignment Tracking Fail";
export declare const LOAD_CONSIGNMENT_TRACKING_SUCCESS = "[Order] Load Consignment Tracking Success";
export declare const CLEAR_CONSIGNMENT_TRACKING = "[Order] Clear Consignment Tracking";
export declare class LoadConsignmentTracking implements Action {
    payload: {
        userId?: string;
        orderCode: string;
        consignmentCode: string;
    };
    readonly type = "[Order] Load Consignment Tracking";
    constructor(payload: {
        userId?: string;
        orderCode: string;
        consignmentCode: string;
    });
}
export declare class LoadConsignmentTrackingFail implements Action {
    payload: any;
    readonly type = "[Order] Load Consignment Tracking Fail";
    constructor(payload: any);
}
export declare class LoadConsignmentTrackingSuccess implements Action {
    payload: ConsignmentTracking;
    readonly type = "[Order] Load Consignment Tracking Success";
    constructor(payload: ConsignmentTracking);
}
export declare class ClearConsignmentTracking {
    readonly type = "[Order] Clear Consignment Tracking";
    constructor();
}
export type ConsignmentTrackingAction = LoadConsignmentTracking | LoadConsignmentTrackingFail | LoadConsignmentTrackingSuccess | ClearConsignmentTracking;
