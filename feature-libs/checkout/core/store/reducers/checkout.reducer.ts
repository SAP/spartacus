import { Cart } from '@spartacus/core';
import { CheckoutStepsState } from '../checkout-state';
import { CheckoutActions } from './../actions/index';

export const initialState: CheckoutStepsState = {
  poNumber: { po: undefined },
};

export function reducer(
  state = initialState,
  action: CheckoutActions.CheckoutAction | CheckoutActions.SetPaymentTypeSuccess
): CheckoutStepsState {
  switch (action.type) {
    case CheckoutActions.SET_PAYMENT_TYPE_SUCCESS: {
      const cart: Cart = action.payload;
      return {
        ...state,
        poNumber: {
          ...state.poNumber,
          po: cart.purchaseOrderNumber,
        },
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }
  }

  return state;
}
