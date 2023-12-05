import { StateUtils } from '@spartacus/core';
import { ReturnRequest, ReturnRequestEntryInputList, ReturnRequestList, ReturnRequestModification } from '@spartacus/order/root';
export declare const CREATE_ORDER_RETURN_REQUEST = "[Order] Create Order Return Request";
export declare const CREATE_ORDER_RETURN_REQUEST_FAIL = "[Order] Create Order Return Request Fail";
export declare const CREATE_ORDER_RETURN_REQUEST_SUCCESS = "[Order] Create Order Return Request Success";
export declare const LOAD_ORDER_RETURN_REQUEST = "[Order] Load Order Return Request details";
export declare const LOAD_ORDER_RETURN_REQUEST_FAIL = "[Order] Load Order Return Request details Fail";
export declare const LOAD_ORDER_RETURN_REQUEST_SUCCESS = "[Order] Load Order Return Request details Success";
export declare const CANCEL_ORDER_RETURN_REQUEST = "[Order] Cancel Order Return Request";
export declare const CANCEL_ORDER_RETURN_REQUEST_FAIL = "[Order] Cancel Order Return Request Fail";
export declare const CANCEL_ORDER_RETURN_REQUEST_SUCCESS = "[Order] Cancel Order Return Request Success";
export declare const LOAD_ORDER_RETURN_REQUEST_LIST = "[Order] Load User Order Return Request List";
export declare const LOAD_ORDER_RETURN_REQUEST_LIST_FAIL = "[Order] Load User Order Return Request List Fail";
export declare const LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS = "[Order] Load User Order Return Request List Success";
export declare const CLEAR_ORDER_RETURN_REQUEST = "[Order] Clear Order Return Request Details";
export declare const CLEAR_ORDER_RETURN_REQUEST_LIST = "[Order] Clear Order Return Request List";
export declare const RESET_CANCEL_RETURN_PROCESS = "[Order] Reset Cancel Return Request Process";
export declare class CreateOrderReturnRequest extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        returnRequestInput: ReturnRequestEntryInputList;
    };
    readonly type = "[Order] Create Order Return Request";
    constructor(payload: {
        userId: string;
        returnRequestInput: ReturnRequestEntryInputList;
    });
}
export declare class CreateOrderReturnRequestFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Create Order Return Request Fail";
    constructor(payload: any);
}
export declare class CreateOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
    payload: ReturnRequest;
    readonly type = "[Order] Create Order Return Request Success";
    constructor(payload: ReturnRequest);
}
export declare class LoadOrderReturnRequest extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        returnRequestCode: string;
    };
    readonly type = "[Order] Load Order Return Request details";
    constructor(payload: {
        userId: string;
        returnRequestCode: string;
    });
}
export declare class LoadOrderReturnRequestFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load Order Return Request details Fail";
    constructor(payload: any);
}
export declare class LoadOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
    payload: ReturnRequest;
    readonly type = "[Order] Load Order Return Request details Success";
    constructor(payload: ReturnRequest);
}
export declare class CancelOrderReturnRequest extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        returnRequestCode: string;
        returnRequestModification: ReturnRequestModification;
    };
    readonly type = "[Order] Cancel Order Return Request";
    constructor(payload: {
        userId: string;
        returnRequestCode: string;
        returnRequestModification: ReturnRequestModification;
    });
}
export declare class CancelOrderReturnRequestFail extends StateUtils.EntityFailAction {
    payload: any;
    readonly type = "[Order] Cancel Order Return Request Fail";
    constructor(payload: any);
}
export declare class CancelOrderReturnRequestSuccess extends StateUtils.EntitySuccessAction {
    readonly type = "[Order] Cancel Order Return Request Success";
    constructor();
}
export declare class LoadOrderReturnRequestList extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
    };
    readonly type = "[Order] Load User Order Return Request List";
    constructor(payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
    });
}
export declare class LoadOrderReturnRequestListFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load User Order Return Request List Fail";
    constructor(payload: any);
}
export declare class LoadOrderReturnRequestListSuccess extends StateUtils.LoaderSuccessAction {
    payload: ReturnRequestList;
    readonly type = "[Order] Load User Order Return Request List Success";
    constructor(payload: ReturnRequestList);
}
export declare class ClearOrderReturnRequest extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear Order Return Request Details";
    constructor();
}
export declare class ClearOrderReturnRequestList extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear Order Return Request List";
    constructor();
}
export declare class ResetCancelReturnProcess extends StateUtils.EntityLoaderResetAction {
    readonly type = "[Order] Reset Cancel Return Request Process";
    constructor();
}
export type OrderReturnRequestAction = CreateOrderReturnRequest | CreateOrderReturnRequestFail | CreateOrderReturnRequestSuccess | LoadOrderReturnRequest | LoadOrderReturnRequestFail | LoadOrderReturnRequestSuccess | CancelOrderReturnRequest | CancelOrderReturnRequestFail | CancelOrderReturnRequestSuccess | LoadOrderReturnRequestList | LoadOrderReturnRequestListFail | LoadOrderReturnRequestListSuccess | ClearOrderReturnRequest | ClearOrderReturnRequestList | ResetCancelReturnProcess;
