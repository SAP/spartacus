import * as fromPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetails } from '../../../occ/occ-models/index';

export const initialState: PaymentDetails[] = [];

export function reducer(
  state = initialState,
  action: fromPaymentMethodsAction.UserPaymentMethodsAction
): PaymentDetails[] {
  switch (action.type) {
    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      return action.payload ? action.payload : state;
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return initialState;
    }
  }
  return state;
}
