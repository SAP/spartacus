import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
export declare const LOAD_USER_ORDERS = "[Order] Load User Orders";
export declare const LOAD_USER_ORDERS_FAIL = "[Order] Load User Orders Fail";
export declare const LOAD_USER_ORDERS_SUCCESS = "[Order] Load User Orders Success";
export declare const CLEAR_USER_ORDERS = "[Order] Clear User Orders";
export declare class LoadUserOrders extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        replenishmentOrderCode?: string;
    };
    readonly type = "[Order] Load User Orders";
    constructor(payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        replenishmentOrderCode?: string;
    });
}
export declare class LoadUserOrdersFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load User Orders Fail";
    constructor(payload: any);
}
export declare class LoadUserOrdersSuccess extends StateUtils.LoaderSuccessAction {
    payload: OrderHistoryList;
    readonly type = "[Order] Load User Orders Success";
    constructor(payload: OrderHistoryList);
}
export declare class ClearUserOrders extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear User Orders";
    constructor();
}
export type UserOrdersAction = LoadUserOrders | LoadUserOrdersFail | LoadUserOrdersSuccess | ClearUserOrders;
