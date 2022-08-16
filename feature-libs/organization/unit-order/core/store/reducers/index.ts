import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { Order, OrderHistoryList } from '@spartacus/order/root';
import {
  UnitOrderState,
  UNIT_ORDERS,
  UNIT_ORDER_DETAILS,
} from '../unit-order-state';

import * as fromUnitOrdersReducer from './unit-order.reducer';
import * as fromOrderDetailsReducer from './unit-order-details.reducer';
import * as fromConsignmentTrackingReducer from './consignment-tracking.reducer';

export function getReducers(): ActionReducerMap<UnitOrderState, any> {
  return {
    orders: StateUtils.loaderReducer<OrderHistoryList, any>(
      UNIT_ORDERS,
      fromUnitOrdersReducer.reducer
    ),
    orderDetail: StateUtils.loaderReducer<Order, any>(
      UNIT_ORDER_DETAILS,
      fromOrderDetailsReducer.reducer
    ),
    consignmentTracking: fromConsignmentTrackingReducer.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<UnitOrderState>> =
  new InjectionToken<ActionReducerMap<UnitOrderState>>('UnitOrderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
