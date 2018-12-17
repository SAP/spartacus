import { InjectionToken, Provider } from '@angular/core';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';
import * as fromCheckout from './checkout.reducer';
import * as fromCardTypes from './card-types.reducer';
import * as fromAddressVerification from './address-verification.reducer';

import * as fromAction from '../actions';

export interface CheckoutState {
  steps: fromCheckout.CheckoutState;
  cardTypes: fromCardTypes.CardTypesState;
  addressVerification: fromAddressVerification.AddressVerificationState;
}

export function getReducers(): ActionReducerMap<CheckoutState> {
  return {
    steps: fromCheckout.reducer,
    cardTypes: fromCardTypes.reducer,
    addressVerification: fromAddressVerification.reducer
  };
}

export const reducerToken: InjectionToken<
  ActionReducerMap<CheckoutState>
> = new InjectionToken<ActionReducerMap<CheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers
};

export const getCheckoutState: MemoizedSelector<
  any,
  CheckoutState
> = createFeatureSelector<CheckoutState>('checkout');

export function clearCheckoutState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === '[Site-context] Language Change') {
      action = new fromAction.CheckoutClearMiscsData();
    } else if (action.type === '[Site-context] Currency Change') {
      action = new fromAction.ClearSupportedDeliveryModes();
    } else if (action.type === '[Auth] Logout') {
      action = new fromAction.ClearCheckoutData();
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearCheckoutState];
