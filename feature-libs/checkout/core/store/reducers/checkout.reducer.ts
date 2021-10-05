import { Cart, Order, ReplenishmentOrder } from '@spartacus/core';
import { CheckoutStepsState } from '../checkout-state';
import { CheckoutActions } from './../actions/index';

export const initialState: CheckoutStepsState = {
  poNumber: { po: undefined, costCenter: undefined },
  orderDetails: {},
};

export function reducer(
  state = initialState,
  action:
    | CheckoutActions.CheckoutAction
    | CheckoutActions.SetPaymentTypeSuccess
    | CheckoutActions.ReplenishmentOrderActions
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

    case CheckoutActions.SET_COST_CENTER_SUCCESS: {
      return {
        ...state,
        poNumber: {
          ...state.poNumber,
          costCenter: action.payload,
        },
      };
    }

    case CheckoutActions.PLACE_ORDER_SUCCESS:
    case CheckoutActions.SCHEDULE_REPLENISHMENT_ORDER_SUCCESS: {
      const orderDetails: Order | ReplenishmentOrder = action.payload;

      return {
        ...state,
        orderDetails,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }
  }

  return state;
}
