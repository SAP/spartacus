import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
export declare const UNIT_ORDER_FEATURE = "unit order";
export declare const UNIT_ORDERS = "[Unit Order] Unit Orders";
export declare const UNIT_ORDER_DETAILS = "[Unit Order] Order Details";
export interface StateWithUnitOrder {
    [UNIT_ORDER_FEATURE]: UnitOrderState;
}
export interface UnitOrderState {
    orders: StateUtils.LoaderState<OrderHistoryList>;
    orderDetail: StateUtils.LoaderState<Order>;
}
