import { CheckoutActions } from '../actions/index';
import { PaymentTypesState } from '../checkout-state';

export const initialState: PaymentTypesState = {
  selected: undefined,
};

export function reducer(
  state = initialState,
  action:
    | CheckoutActions.PaymentTypesAction
    | CheckoutActions.ClearCheckoutData
    | CheckoutActions.CheckoutClearMiscsData
): PaymentTypesState {
  switch (action.type) {
    case CheckoutActions.SET_PAYMENT_TYPE_SUCCESS: {
      return {
        ...state,
        selected: action.payload.paymentType?.code,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return {
        ...state,
        selected: undefined,
      };
    }

    case CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getSelectedPaymentType = (state: PaymentTypesState) =>
  state.selected;
