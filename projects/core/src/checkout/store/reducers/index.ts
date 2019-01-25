import { InjectionToken, Provider } from '@angular/core';

import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
  ActionReducer,
  MemoizedSelector
} from '@ngrx/store';

import { CheckoutState, CHECKOUT_FEATURE } from '../checkout-state';
import * as fromAction from '../actions/index';

import * as fromAddressVerification from './address-verification.reducer';
import * as fromCardTypes from './card-types.reducer';
import * as fromCheckout from './checkout.reducer';

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
> = createFeatureSelector<CheckoutState>(CHECKOUT_FEATURE);

export function clearCheckoutState(
  reducer: ActionReducer<CheckoutState>
): ActionReducer<CheckoutState> {
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

export const metaReducers: MetaReducer<CheckoutState>[] = [clearCheckoutState];
