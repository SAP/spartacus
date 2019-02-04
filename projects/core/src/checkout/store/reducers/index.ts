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
import { LOGOUT } from '../../../auth/store/actions/index';
import {
  CURRENCY_CHANGE,
  LANGUAGE_CHANGE
} from '../../../site-context/store/actions/index';

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
    switch (action.type) {
      case LANGUAGE_CHANGE: {
        action = new fromAction.CheckoutClearMiscsData();
        break;
      }
      case CURRENCY_CHANGE: {
        action = new fromAction.ClearSupportedDeliveryModes();
        break;
      }
      case LOGOUT: {
        action = new fromAction.ClearCheckoutData();
        break;
      }
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<CheckoutState>[] = [clearCheckoutState];
