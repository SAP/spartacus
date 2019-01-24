import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';

import {
  UserState,
  UserOrdersState,
  USER_ORDERS,
  UserPaymentMethodsState,
  USER_PAYMENT_METHODS
} from '../user-state';
import * as fromAction from '../actions/index';
import { LOGOUT } from '../../../auth/index';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

import * as fromBillingCountriesReducer from './billing-countries.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromPaymentMethods from './payment-methods.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromTitlesReducer from './titles.reducer';
import * as fromUserAddresses from './user-addresses.reducer';
import * as fromUserDetailsReducer from './user-details.reducer';
import * as fromUserOrders from './user-orders.reducer';

export function getReducers(): ActionReducerMap<UserState> {
  return {
    account: fromUserDetailsReducer.reducer,
    addresses: fromUserAddresses.reducer,
    billingCountries: fromBillingCountriesReducer.reducer,
    payments: loaderReducer<UserPaymentMethodsState>(
      USER_PAYMENT_METHODS,
      fromPaymentMethods.reducer
    ),
    orders: loaderReducer<UserOrdersState>(USER_ORDERS, fromUserOrders.reducer),
    order: fromOrderDetailsReducer.reducer,
    countries: fromDeliveryCountries.reducer,
    titles: fromTitlesReducer.reducer,
    regions: fromRegionsReducer.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<UserState>
> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === LOGOUT) {
      state = undefined;
    } else if (
      action.type === '[Site-context] Language Change' ||
      action.type === '[Site-context] Currency Change'
    ) {
      action = new fromAction.ClearMiscsData();
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
