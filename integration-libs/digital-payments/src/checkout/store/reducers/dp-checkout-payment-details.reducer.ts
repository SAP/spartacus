import { PaymentDetails } from '@spartacus/core';
import { DigitalPaymentActions } from '../actions';
import { Action } from '@ngrx/store';

export const initialState: PaymentDetails = {};//| undefined = undefined;

export function reducer(
  state = initialState,
  action: Action //DigitalPaymentActions.CheckoutPaymentDetailsAction
): PaymentDetails {
  const act = action as DigitalPaymentActions.CheckoutPaymentDetailsAction;
  switch (act.type) {
    case DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_DETAILS: {
      return initialState;
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_DETAILS_SUCCESS: {
      return act.payload;
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_DETAILS_FAIL: {
      return {};
    }

    case DigitalPaymentActions.RESET_CHECKOUT_PAYMENT_DETAILS: {
      return initialState;
    }
  }

  return state;
}
