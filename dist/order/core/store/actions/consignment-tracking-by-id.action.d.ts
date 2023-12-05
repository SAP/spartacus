import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';
export declare const LOAD_CONSIGNMENT_TRACKING_BY_ID = "[Order] Load Consignment Tracking By ID Data";
export declare const LOAD_CONSIGNMENT_TRACKING_BY_ID_FAIL = "[Order] Load  Consignment Tracking By ID Data Fail";
export declare const LOAD_CONSIGNMENT_TRACKING_BY_ID_SUCCESS = "[Order] Load Consignment Tracking By ID Data Success";
export declare class LoadConsignmentTrackingById extends StateUtils.EntityLoadAction {
    payload: {
        orderCode: string;
        consignmentCode: string;
        userId: string;
    };
    readonly type = "[Order] Load Consignment Tracking By ID Data";
    constructor(payload: {
        orderCode: string;
        consignmentCode: string;
        userId: string;
    });
}
export declare class LoadConsignmentTrackingByIdFail extends StateUtils.EntityFailAction {
    payload: {
        orderCode: string;
        consignmentCode: string;
        error: any;
    };
    readonly type = "[Order] Load  Consignment Tracking By ID Data Fail";
    constructor(payload: {
        orderCode: string;
        consignmentCode: string;
        error: any;
    });
}
export declare class LoadConsignmentTrackingByIdSuccess extends StateUtils.EntitySuccessAction {
    payload: {
        orderCode: string;
        consignmentCode: string;
        consignmentTracking: ConsignmentTracking;
    };
    readonly type = "[Order] Load Consignment Tracking By ID Data Success";
    constructor(payload: {
        orderCode: string;
        consignmentCode: string;
        consignmentTracking: ConsignmentTracking;
    });
}
export type ConsignmentTrackingByIdAction = LoadConsignmentTrackingById | LoadConsignmentTrackingByIdFail | LoadConsignmentTrackingByIdSuccess;
