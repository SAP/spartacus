import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  combineReducers,
  MetaReducer,
} from '@ngrx/store';
import { LOGOUT } from '../../../auth/index';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import {
  UserState,
  USER_ADDRESSES,
  USER_ORDERS,
  USER_PAYMENT_METHODS,
} from '../user-state';
import * as fromBillingCountriesReducer from './billing-countries.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';
import * as fromOrderDetailsReducer from './order-details.reducer';
import * as fromPaymentReducer from './payment-methods.reducer';
import * as fromRegionsReducer from './regions.reducer';
import * as fromResetPasswordReducer from './reset-password.reducer';
import * as fromTitlesReducer from './titles.reducer';
import * as fromAddressesReducer from './user-addresses.reducer';
import * as fromUserDetailsReducer from './user-details.reducer';
import * as fromUserOrdersReducer from './user-orders.reducer';
import { Address } from '../../../model/address.model';
import { PaymentDetails } from '../../../model/cart.model';
import { OrderHistoryList } from '../../../model/order.model';

export function getReducers(): ActionReducerMap<UserState> {
  return {
    account: combineReducers({
      details: fromUserDetailsReducer.reducer,
    }),
    addresses: loaderReducer<Address[]>(
      USER_ADDRESSES,
      fromAddressesReducer.reducer
    ),
    billingCountries: fromBillingCountriesReducer.reducer,
    payments: loaderReducer<PaymentDetails[]>(
      USER_PAYMENT_METHODS,
      fromPaymentReducer.reducer
    ),
    orders: loaderReducer<OrderHistoryList>(
      USER_ORDERS,
      fromUserOrdersReducer.reducer
    ),
    order: fromOrderDetailsReducer.reducer,
    countries: fromDeliveryCountries.reducer,
    titles: fromTitlesReducer.reducer,
    regions: fromRegionsReducer.reducer,
    resetPassword: fromResetPasswordReducer.reducer,
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<UserState>
> = new InjectionToken<ActionReducerMap<UserState>>('UserReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
