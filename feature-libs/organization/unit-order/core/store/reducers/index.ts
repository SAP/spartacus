import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { OrderHistoryList } from '@spartacus/order/root';
import { UnitOrderState, UNIT_ORDERS } from '../unit-order-state';

import * as fromUnitOrdersReducer from './unit-order.reducer';

export function getReducers(): ActionReducerMap<UnitOrderState, any> {
  return {
    orders: StateUtils.loaderReducer<OrderHistoryList, any>(
      UNIT_ORDERS,
      fromUnitOrdersReducer.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<UnitOrderState>> =
  new InjectionToken<ActionReducerMap<UnitOrderState>>('UnitOrderReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
