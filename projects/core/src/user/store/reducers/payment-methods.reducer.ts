import { PaymentDetails } from '../../../model/cart.model';
import { UserActions } from '../actions/index';

export const initialState: PaymentDetails[] = [];

export function reducer(
  state = initialState,
  action: UserActions.UserPaymentMethodsAction
): PaymentDetails[] {
  switch (action.type) {
    case UserActions.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }

    case UserActions.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return initialState;
    }
  }
  return state;
}
