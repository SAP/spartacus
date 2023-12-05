import { StateUtils } from '@spartacus/core';
import { ReplenishmentOrder } from '@spartacus/order/root';
export declare const LOAD_REPLENISHMENT_ORDER_DETAILS = "[Order] Load Replenishment Order Details";
export declare const LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS = "[Order] Load Replenishment Order Details Success";
export declare const LOAD_REPLENISHMENT_ORDER_DETAILS_FAIL = "[Order] Load Replenishment Order Details Fail";
export declare const ClEAR_REPLENISHMENT_ORDER_DETAILS = "[Order] Clear Replenishment Order Details";
export declare const CANCEL_REPLENISHMENT_ORDER = "[Order] Cancel Replenishment Order";
export declare const CANCEL_REPLENISHMENT_ORDER_SUCCESS = "[Order] Cancel Replenishment Order Success";
export declare const CANCEL_REPLENISHMENT_ORDER_FAIL = "[Order] Cancel Replenishment Order Fail";
export declare const CLEAR_CANCEL_REPLENISHMENT_ORDER = "[Order] Clear Cancel Replenishment Order";
export declare class LoadReplenishmentOrderDetails extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        replenishmentOrderCode: string;
    };
    readonly type = "[Order] Load Replenishment Order Details";
    constructor(payload: {
        userId: string;
        replenishmentOrderCode: string;
    });
}
export declare class LoadReplenishmentOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    payload: ReplenishmentOrder;
    readonly type = "[Order] Load Replenishment Order Details Success";
    constructor(payload: ReplenishmentOrder);
}
export declare class LoadReplenishmentOrderDetailsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load Replenishment Order Details Fail";
    constructor(payload: any);
}
export declare class ClearReplenishmentOrderDetails extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear Replenishment Order Details";
    constructor();
}
export declare class CancelReplenishmentOrder extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        replenishmentOrderCode: string;
    };
    readonly type = "[Order] Cancel Replenishment Order";
    constructor(payload: {
        userId: string;
        replenishmentOrderCode: string;
    });
}
export declare class CancelReplenishmentOrderSuccess extends StateUtils.EntitySuccessAction {
    payload: ReplenishmentOrder;
    readonly type = "[Order] Cancel Replenishment Order Success";
    constructor(payload: ReplenishmentOrder);
}
export declare class CancelReplenishmentOrderFail extends StateUtils.EntityFailAction {
    payload: any;
    readonly type = "[Order] Cancel Replenishment Order Fail";
    constructor(payload: any);
}
export declare class ClearCancelReplenishmentOrder extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Order] Clear Cancel Replenishment Order";
    constructor();
}
export type ReplenishmentOrderDetailsAction = LoadReplenishmentOrderDetails | LoadReplenishmentOrderDetailsSuccess | LoadReplenishmentOrderDetailsFail | ClearReplenishmentOrderDetails | CancelReplenishmentOrder | CancelReplenishmentOrderSuccess | CancelReplenishmentOrderFail | ClearCancelReplenishmentOrder;
