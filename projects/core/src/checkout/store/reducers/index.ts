import { InjectionToken, Provider } from '@angular/core';

import { ActionReducerMap } from '@ngrx/store';

import {
  CheckoutState,
  CHECKOUT_DETAILS,
  CheckoutStepsState,
} from '../checkout-state';

import * as fromAddressVerification from './address-verification.reducer';
import * as fromCardTypes from './card-types.reducer';
import * as fromCheckout from './checkout.reducer';
import * as fromPaymentTypes from './payment-types.reducer';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';

export function getReducers(): ActionReducerMap<CheckoutState> {
  return {
    steps: loaderReducer<CheckoutStepsState>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    ),
    cardTypes: fromCardTypes.reducer,
    addressVerification: fromAddressVerification.reducer,
    paymentTypes: fromPaymentTypes.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  CheckoutState
>> = new InjectionToken<ActionReducerMap<CheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
