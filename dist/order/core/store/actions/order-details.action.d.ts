import { StateUtils } from '@spartacus/core';
import { CancellationRequestEntryInputList, Order } from '@spartacus/order/root';
export declare const LOAD_ORDER_DETAILS = "[Order] Load Order Details";
export declare const LOAD_ORDER_DETAILS_FAIL = "[Order] Load Order Details Fail";
export declare const LOAD_ORDER_DETAILS_SUCCESS = "[Order] Load Order Details Success";
export declare const CLEAR_ORDER_DETAILS = "[Order] Clear Order Details";
export declare const CANCEL_ORDER = "[Order] Cancel Order";
export declare const CANCEL_ORDER_FAIL = "[Order] Cancel Order Fail";
export declare const CANCEL_ORDER_SUCCESS = "[Order] Cancel Order Success";
export declare const RESET_CANCEL_ORDER_PROCESS = "[Order] Reset Cancel Order Process";
export declare class LoadOrderDetails extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        orderCode: string;
    };
    readonly type = "[Order] Load Order Details";
    constructor(payload: {
        userId: string;
        orderCode: string;
    });
}
export declare class LoadOrderDetailsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load Order Details Fail";
    constructor(payload: any);
}
export declare class LoadOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    payload: Order;
    readonly type = "[Order] Load Order Details Success";
    constructor(payload: Order);
}
export declare class ClearOrderDetails extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear Order Details";
    constructor();
}
export declare class CancelOrder extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        orderCode: string;
        cancelRequestInput: CancellationRequestEntryInputList;
    };
    readonly type = "[Order] Cancel Order";
    constructor(payload: {
        userId: string;
        orderCode: string;
        cancelRequestInput: CancellationRequestEntryInputList;
    });
}
export declare class CancelOrderFail extends StateUtils.EntityFailAction {
    payload: any;
    readonly type = "[Order] Cancel Order Fail";
    constructor(payload: any);
}
export declare class CancelOrderSuccess extends StateUtils.EntitySuccessAction {
    readonly type = "[Order] Cancel Order Success";
    constructor();
}
export declare class ResetCancelOrderProcess extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Order] Reset Cancel Order Process";
    constructor();
}
export type OrderDetailsAction = LoadOrderDetails | LoadOrderDetailsFail | LoadOrderDetailsSuccess | ClearOrderDetails | CancelOrder | CancelOrderFail | CancelOrderSuccess;
