import { UserPaymentMethodsState } from '../user-state';
import * as fromPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetails } from '../../../occ/occ-models/index';

export const initialState: UserPaymentMethodsState = {
  list: []
};

export function reducer(
  state = initialState,
  action: fromPaymentMethodsAction.UserPaymentMethodsAction
): UserPaymentMethodsState {
  switch (action.type) {
    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      const list: PaymentDetails[] = action.payload;

      if (list !== undefined) {
        return {
          ...state,
          list
        };
      } else {
        return {
          ...state
        };
      }
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return {
        ...state
      };
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS: {
      return {
        ...state
      };
    }

    case fromPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD:
    case fromPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD: {
      return {
        ...state
      };
    }

    case fromPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD_FAIL:
    case fromPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS:
    case fromPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD_FAIL:
    case fromPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD_SUCCESS: {
      return {
        ...state
      };
    }
  }
  return state;
}
