import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import {
  CheckoutState,
  CheckoutStepsState,
  CHECKOUT_DETAILS,
} from '../checkout-state';
import * as fromCheckout from './checkout.reducer';
import * as fromPaymentTypes from './payment-types.reducer';

export function getReducers(): ActionReducerMap<CheckoutState, any> {
  return {
    steps: StateUtils.loaderReducer<CheckoutStepsState, any>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    ),
    paymentTypes: fromPaymentTypes.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<CheckoutState>> =
  new InjectionToken<ActionReducerMap<CheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
