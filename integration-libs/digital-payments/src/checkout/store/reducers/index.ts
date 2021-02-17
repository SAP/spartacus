import { DpPaymentRequest } from '../../models';
import {
  DP_CHECKOUT_PAYMENT_REQUEST,
  DP_CHECKOUT_PAYMENT_DETAILS,
} from '../digital-payments-state';
import { StateUtils, PaymentDetails } from '@spartacus/core';
import { DigitalPaymentsState } from '../digital-payments-state';
import { InjectionToken, Provider } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';

import * as fromPaymentRequest from './dp-checkout-payment-request.reducer';
import * as fromCheckoutPaymentDetails from './dp-checkout-payment-details.reducer';

export function getReducers(): ActionReducerMap<DigitalPaymentsState> {
  return {
    paymentRequest: StateUtils.loaderReducer<DpPaymentRequest>(
      DP_CHECKOUT_PAYMENT_REQUEST,
      fromPaymentRequest.reducer
    ),
    paymentDetails: StateUtils.loaderReducer<PaymentDetails>(
      DP_CHECKOUT_PAYMENT_DETAILS,
      fromCheckoutPaymentDetails.reducer
    ),
  };
}

export const reducerToken: InjectionToken<ActionReducerMap<
  DigitalPaymentsState
>> = new InjectionToken<ActionReducerMap<DigitalPaymentsState>>(
  'DigitalPaymentReducers'
);

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
