import { PaymentDetails } from '@spartacus/core';
import { DigitalPaymentActions } from '../actions';

export const initialState: PaymentDetails = undefined;

export function reducer(
  state = initialState,
  action: DigitalPaymentActions.CheckoutPaymentDetailsAction
): PaymentDetails {
  switch (action.type) {
    case DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_DETAILS: {
      return initialState;
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_DETAILS_SUCCESS: {
      return action.payload;
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
