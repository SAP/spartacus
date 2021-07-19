import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import {
  Order,
  OrderHistoryList,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  ReturnRequest,
  ReturnRequestList,
} from '@spartacus/cart/order/root';
import { StateUtils } from '@spartacus/core';
import {
  ORDERS,
  OrderState,
  ORDER_DETAILS,
  REPLENISHMENT_ORDERS,
  REPLENISHMENT_ORDER_DETAILS,
  RETURN_REQUESTS,
  RETURN_REQUEST_DETAILS,
} from '../order-state';
import * as fromConsignmentTrackingReducer from './consignment-tracking.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromOrderReturnRequestReducer from './order-return-request.reducer';
import * as fromUserOrdersReducer from './orders.reducer';
import * as fromReplenishmentOrderDetailsReducer from './replenishment-order-details.reducer';
import * as fromUserReplenishmentOrdersReducer from './replenishment-orders.reducer';

export function getReducers(): ActionReducerMap<Partial<OrderState>> {
  return {
    orders: StateUtils.loaderReducer<OrderHistoryList>(
      ORDERS,
      fromUserOrdersReducer.reducer
    ),
    orderDetail: StateUtils.loaderReducer<Order>(
      ORDER_DETAILS,
      fromOrderDetailsReducer.reducer
    ),
    replenishmentOrders: StateUtils.loaderReducer<ReplenishmentOrderList>(
      REPLENISHMENT_ORDERS,
      fromUserReplenishmentOrdersReducer.reducer
    ),
    orderReturn: StateUtils.loaderReducer<ReturnRequest>(
      RETURN_REQUEST_DETAILS
    ),
    orderReturnList: StateUtils.loaderReducer<ReturnRequestList>(
      RETURN_REQUESTS,
      fromOrderReturnRequestReducer.reducer
    ),
    consignmentTracking: fromConsignmentTrackingReducer.reducer,
    replenishmentOrder: StateUtils.loaderReducer<ReplenishmentOrder>(
      REPLENISHMENT_ORDER_DETAILS,
      fromReplenishmentOrderDetailsReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<OrderState>
> = new InjectionToken<ActionReducerMap<OrderState>>('OrderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
