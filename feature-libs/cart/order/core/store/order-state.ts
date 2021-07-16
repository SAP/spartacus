import {
  ConsignmentTracking,
  Order,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  ReturnRequest,
  ReturnRequestList,
} from '@spartacus/cart/order/root';
import { StateUtils } from '@spartacus/core';

export const ORDER_FEATURE = 'order';

export const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
export const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';
export const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = 'cancelReplenishmentOrder';
export const USER_ORDERS = '[User] User Orders';
export const USER_RETURN_REQUESTS = '[User] Order Return Requests';
export const USER_RETURN_REQUEST_DETAILS = '[User] Return Request Details';
export const USER_ORDER_DETAILS = '[User] User Order Details';
export const USER_REPLENISHMENT_ORDERS = '[User] User Replenishment Orders';
export const USER_REPLENISHMENT_ORDER_DETAILS =
  '[User] User Replenishment Order Details';

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
}

export interface ConsignmentTrackingState {
  tracking?: ConsignmentTracking;
}
