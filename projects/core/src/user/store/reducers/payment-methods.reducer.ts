import * as fromPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetails } from '../../../model/cart.model';

export const initialState: PaymentDetails[] = [];

export function reducer(
  state = initialState,
  action: fromPaymentMethodsAction.UserPaymentMethodsAction
): PaymentDetails[] {
  switch (action.type) {
    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return initialState;
    }
  }
  return state;
}
