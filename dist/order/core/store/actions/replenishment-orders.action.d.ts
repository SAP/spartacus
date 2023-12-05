import { StateUtils } from '@spartacus/core';
import { ReplenishmentOrderList } from '@spartacus/order/root';
export declare const LOAD_USER_REPLENISHMENT_ORDERS = "[Order] Load User Replenishment Orders";
export declare const LOAD_USER_REPLENISHMENT_ORDERS_FAIL = "[Order] Load User Replenishment Orders Fail";
export declare const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS = "[Order] Load User Replenishment Orders Success";
export declare const CLEAR_USER_REPLENISHMENT_ORDERS = "[Order] Clear User Replenishment Orders";
export declare class LoadUserReplenishmentOrders extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
    };
    readonly type = "[Order] Load User Replenishment Orders";
    constructor(payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
    });
}
export declare class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Order] Load User Replenishment Orders Fail";
    constructor(payload: any);
}
export declare class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
    payload: ReplenishmentOrderList;
    readonly type = "[Order] Load User Replenishment Orders Success";
    constructor(payload: ReplenishmentOrderList);
}
export declare class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
    readonly type = "[Order] Clear User Replenishment Orders";
    constructor();
}
export type UserReplenishmentOrdersAction = LoadUserReplenishmentOrders | LoadUserReplenishmentOrdersFail | LoadUserReplenishmentOrdersSuccess | ClearUserReplenishmentOrders;
