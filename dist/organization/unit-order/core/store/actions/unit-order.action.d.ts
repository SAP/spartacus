import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
export declare const LOAD_UNIT_ORDERS = "[Unit Order] Load Unit Orders";
export declare const LOAD_UNIT_ORDERS_FAIL = "[Unit Order] Load Unit Orders Fail";
export declare const LOAD_UNIT_ORDERS_SUCCESS = "[Unit Order] Load Unit Orders Success";
export declare const CLEAR_UNIT_ORDERS = "[Unit Order] Clear Unit Orders";
export declare const LOAD_ORDER_DETAILS = "[Unit Order] Load Unit Order Details";
export declare const LOAD_ORDER_DETAILS_FAIL = "[Unit Order] Load Unit Order Details Fail";
export declare const LOAD_ORDER_DETAILS_SUCCESS = "[Unit Order] Load Unit Order Details Success";
export declare const CLEAR_ORDER_DETAILS = "[Unit Order] Clear Unit Order Details";
export declare class LoadUnitOrders extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        filters?: string;
        sort?: string;
    };
    readonly type = "[Unit Order] Load Unit Orders";
    constructor(payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        filters?: string;
        sort?: string;
    });
}
export declare class LoadUnitOrdersFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Unit Order] Load Unit Orders Fail";
    constructor(payload: any);
}
export declare class LoadUnitOrdersSuccess extends StateUtils.LoaderSuccessAction {
    payload?: OrderHistoryList | undefined;
    readonly type = "[Unit Order] Load Unit Orders Success";
    constructor(payload?: OrderHistoryList | undefined);
}
export declare class ClearUnitOrders extends StateUtils.LoaderResetAction {
    readonly type = "[Unit Order] Clear Unit Orders";
    constructor();
}
export declare class LoadOrderDetails extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        orderCode: string;
    };
    readonly type = "[Unit Order] Load Unit Order Details";
    constructor(payload: {
        userId: string;
        orderCode: string;
    });
}
export declare class LoadOrderDetailsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[Unit Order] Load Unit Order Details Fail";
    constructor(payload: any);
}
export declare class LoadOrderDetailsSuccess extends StateUtils.LoaderSuccessAction {
    payload: Order;
    readonly type = "[Unit Order] Load Unit Order Details Success";
    constructor(payload: Order);
}
export declare class ClearOrderDetails extends StateUtils.LoaderResetAction {
    readonly type = "[Unit Order] Clear Unit Order Details";
    constructor();
}
export type UnitOrdersAction = LoadUnitOrders | LoadUnitOrdersFail | LoadUnitOrdersSuccess | ClearUnitOrders | LoadOrderDetails | LoadOrderDetailsFail | LoadOrderDetailsSuccess | ClearOrderDetails;
