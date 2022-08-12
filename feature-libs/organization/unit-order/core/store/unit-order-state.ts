import { StateUtils } from '@spartacus/core';
import { OrderApproval } from '../model/unit-order.model';

export const ORDER_APPROVAL_FEATURE = 'order-approval';
export const ORDER_APPROVAL_ENTITIES = 'order-approval-entities';
export const ORDER_APPROVAL_LIST = 'order-approval-list';
export const ORDER_APPROVAL_MAKE_DECISION_PROCESS_ID =
  'orderApproval.makeDecision';

export interface OrderApprovalManagement
  extends StateUtils.EntityListState<OrderApproval> {}

export interface OrderHistoryState {
  [ORDER_APPROVAL_FEATURE]: OrderApprovalManagement;
}



export const ORDER_FEATURE = 'order';

export const ORDERS = '[Order] User Orders';
export const ORDER_DETAILS = '[Order] User Order Details';

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