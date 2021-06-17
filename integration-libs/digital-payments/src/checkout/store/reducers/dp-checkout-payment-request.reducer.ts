import { DigitalPaymentActions } from '../actions';
import { DpPaymentRequest } from '../../models';
import { Action } from '@ngrx/store';
export const initialState: DpPaymentRequest | undefined = undefined;
export const emptyState: DpPaymentRequest = {};

export function reducer(
  state = initialState,
  action: Action //DigitalPaymentActions.CheckoutPaymentRequestAction
): DpPaymentRequest | undefined {
  const act = action as DigitalPaymentActions.CheckoutPaymentRequestAction;
  switch (act.type) {
    case DigitalPaymentActions.LOAD_CHECKOUT_PAYMENT_REQUEST: {
      return initialState;
    }

    case DigitalPaymentActions.CHECKOUT_PAYMENT_REQUEST_SUCCESS: {
      return {
        url: act.payload.postUrl,
        sessionId: act.payload.parameters.entry.find(
          (it: any) => it.key === 'session_id'
        ).value,
        signature: act.payload.parameters.entry.find(
          (it: any) => it.key === 'signature'
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
