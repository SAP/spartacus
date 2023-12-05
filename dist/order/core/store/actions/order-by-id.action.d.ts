import { StateUtils } from '@spartacus/core';
import { Order } from '@spartacus/order/root';
export declare const LOAD_ORDER_BY_ID = "[Order] Load Order By ID Data";
export declare const LOAD_ORDER_BY_ID_FAIL = "[Order] Load Order By ID Data Fail";
export declare const LOAD_ORDER_BY_ID_SUCCESS = "[Order] Load Order By ID Data Success";
export declare class LoadOrderById extends StateUtils.EntityLoadAction {
    payload: {
        userId: string;
        code: string;
    };
    readonly type = "[Order] Load Order By ID Data";
    constructor(payload: {
        userId: string;
        code: string;
    });
}
export declare class LoadOrderByIdFail extends StateUtils.EntityFailAction {
    payload: {
        code: string;
        error: any;
    };
    readonly type = "[Order] Load Order By ID Data Fail";
    constructor(payload: {
        code: string;
        error: any;
    });
}
export declare class LoadOrderByIdSuccess extends StateUtils.EntitySuccessAction {
    payload: Order;
    readonly type = "[Order] Load Order By ID Data Success";
    constructor(payload: Order);
}
export type OrderByIdAction = LoadOrderById | LoadOrderByIdFail | LoadOrderByIdSuccess;
