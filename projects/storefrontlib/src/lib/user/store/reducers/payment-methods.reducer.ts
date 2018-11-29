import * as fromPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetails } from '@spartacus/core';

export interface UserPaymentMethodsState {
  list: PaymentDetails[];
  isLoading: boolean;
}

export const initialState: UserPaymentMethodsState = {
  list: [],
  isLoading: false
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
          list,
          isLoading: false
        };
      } else {
        return {
          ...state,
          isLoading: false
        };
      }
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    case fromPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS: {
      return {
        ...state,
        isLoading: true
      };
    }
  }
  return state;
}

export const getPaymentMethods = (state: UserPaymentMethodsState) => state.list;
export const getLoading = (state: UserPaymentMethodsState) => state.isLoading;
