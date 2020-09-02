import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { loaderReducer } from '../../../state/utils/loader/loader.reducer';
import {
  CheckoutState,
  CheckoutStepsState,
  CHECKOUT_DETAILS,
} from '../checkout-state';
import * as fromAddressVerification from './address-verification.reducer';
import * as fromCardTypes from './card-types.reducer';
import * as fromCheckout from './checkout.reducer';
import * as fromOrderTypes from './order-types.reducer';
import * as fromPaymentTypes from './payment-types.reducer';

export function getReducers(): ActionReducerMap<CheckoutState> {
  return {
    steps: loaderReducer<CheckoutStepsState>(
      CHECKOUT_DETAILS,
      fromCheckout.reducer
    ),
    cardTypes: fromCardTypes.reducer,
    addressVerification: fromAddressVerification.reducer,
    paymentTypes: fromPaymentTypes.reducer,
    orderType: fromOrderTypes.reducer,
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  CheckoutState
>> = new InjectionToken<ActionReducerMap<CheckoutState>>('CheckoutReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
