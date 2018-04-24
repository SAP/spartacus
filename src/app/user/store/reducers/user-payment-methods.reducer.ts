import * as fromPaymentMethodsAction from '../actions/user-payment-methods.action';

export interface UserPaymentMethodsState {
  list: any;
}

export const initialState: UserPaymentMethodsState = {
  list: []
};

export function reducer(
  state = initialState,
  action: fromPaymentMethodsAction.UserPaymentMethodsAction
): UserPaymentMethodsState {
  switch (action.type) {
    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      const list = action.payload;

      return {
        ...state,
        list
      };
    }
  }
  return state;
}

export const getPaymentMethods = (state: UserPaymentMethodsState) => state.list;
