import {
  Order,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  ReturnRequest,
  ReturnRequestList,
  StateUtils,
} from '@spartacus/core';
import { ConsignmentTracking } from '@spartacus/order/root';

export const ORDER_FEATURE = 'order';

export const CANCEL_ORDER_PROCESS_ID = 'cancelOrder';
export const CANCEL_RETURN_PROCESS_ID = 'cancelReturn';
export const CANCEL_REPLENISHMENT_ORDER_PROCESS_ID = 'cancelReplenishmentOrder';
export const ORDERS = '[Order] User Orders';
export const RETURN_REQUESTS = '[Order] Order Return Requests';
export const RETURN_REQUEST_DETAILS = '[Order] Return Request Details';
export const ORDER_DETAILS = '[Order] User Order Details';
export const REPLENISHMENT_ORDERS = '[Order] User Replenishment Orders';
export const REPLENISHMENT_ORDER_DETAILS =
  '[Order] User Replenishment Order Details';

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
  tracking: ConsignmentTracking;
}
