import { StateUtils } from '@spartacus/core';
import { ConsignmentTracking, Order, OrderHistoryList, ReplenishmentOrder, ReplenishmentOrderList, ReturnRequest, ReturnRequestList } from '@spartacus/order/root';
export declare const ORDER_FEATURE = "order";
export declare const CANCEL_ORDER_PROCESS_ID = "cancelOrder";
export declare const CANCEL_RETURN_PROCESS_ID = "cancelReturn";
export declare const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = "cancelReplenishmentOrder";
export declare const ORDERS = "[Order] User Orders";
export declare const RETURN_REQUESTS = "[Order] Order Return Requests";
export declare const RETURN_REQUEST_DETAILS = "[Order] Return Request Details";
export declare const ORDER_DETAILS = "[Order] User Order Details";
export declare const REPLENISHMENT_ORDERS = "[Order] User Replenishment Orders";
export declare const REPLENISHMENT_ORDER_DETAILS = "[Order] User Replenishment Order Details";
export declare const CONSIGNMENT_TRACKING_BY_ID_ENTITIES = "consignment-tracking-by-id-entities";
export declare const ORDER_BY_ID_ENTITIES = "order-by-id-entities";
export interface StateWithOrder {
    [ORDER_FEATURE]: OrderState;
}
export interface OrderState {
    orders: StateUtils.LoaderState<OrderHistoryList>;
    orderDetail: StateUtils.LoaderState<Order>;
    replenishmentOrders: StateUtils.LoaderState<ReplenishmentOrderList>;
    orderReturn: StateUtils.LoaderState<ReturnRequest>;
    orderReturnList: StateUtils.LoaderState<ReturnRequestList>;
    consignmentTracking: ConsignmentTrackingState;
    replenishmentOrder: StateUtils.LoaderState<ReplenishmentOrder>;
    consignmentTrackingById: StateUtils.EntityLoaderState<ConsignmentTracking>;
    orderById: StateUtils.EntityLoaderState<Order>;
}
export interface ConsignmentTrackingState {
    tracking: ConsignmentTracking;
}
export declare function getConsignmentTrackingByIdEntityKey(orderCode: string, consignmentCode: string): string;
