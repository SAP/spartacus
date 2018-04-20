import * as fromPaymentMethodsAction from '../actions/user-payment-methods.action';

export interface UserPaymentMethodsState {
  entities: any;
}

export const initialState: UserPaymentMethodsState = {
  entities: <any>{}
};

export function reducer(
  state = initialState,
  action: fromPaymentMethodsAction.UserPaymentMethodsAction
): UserPaymentMethodsState {
  switch (action.type) {
    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS: {
      const entities = action.payload;

      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const getPaymentMethods = (state: UserPaymentMethodsState) =>
  state.entities;
