import { DigitalPaymentActions } from '../actions';
import { DpPaymentRequest } from '../../models';
export const initialState: DpPaymentRequest = undefined;
export const emptyState: DpPaymentRequest = {};

export function reducer(
  state = initialState,
  action: DigitalPaymentActions.CheckoutPaymentRequestAction
): DpPaymentRequest {
  switch (action.type) {
    case DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_REQUEST: {
      return initialState;
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_REQUEST_SUCCESS: {
      return {
        url: action.payload.postUrl,
        sessionId: action.payload.parameters.entry.find(
          (it) => it.key === 'session_id'
        ).value,
        signature: action.payload.parameters.entry.find(
          (it) => it.key === 'signature'
        ).value,
      };
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_REQUSET_FAIL: {
      return emptyState;
    }

    case DigitalPaymentActions.RESET_CHECKOUT_PAYMENT_REQUEST: {
      return initialState;
    }
  }

  return state;
}
