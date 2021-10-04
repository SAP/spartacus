import { Cart, Order, ReplenishmentOrder } from '@spartacus/core';
import { CheckoutStepsState } from '../checkout-state';
import { CheckoutActions } from './../actions/index';

export const initialState: CheckoutStepsState = {
  poNumber: { po: undefined, costCenter: undefined },
  deliveryMode: {
    selected: '',
  },
  paymentDetails: {},
  orderDetails: {},
};

export function reducer(
  state = initialState,
  action:
    | CheckoutActions.CheckoutAction
    | CheckoutActions.CheckoutClearMiscsData
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

    case CheckoutActions.SET_DELIVERY_MODE_SUCCESS: {
      const selected = action.payload;

      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          selected,
        },
      };
    }

    case CheckoutActions.CREATE_PAYMENT_DETAILS_SUCCESS:
    case CheckoutActions.SET_PAYMENT_DETAILS_SUCCESS: {
      return {
        ...state,
        paymentDetails: action.payload,
      };
    }

    case CheckoutActions.CREATE_PAYMENT_DETAILS_FAIL: {
      const paymentDetails = action.payload;
      if (paymentDetails['hasError']) {
        return {
          ...state,
          paymentDetails,
        };
      }

      return state;
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

    case CheckoutActions.CLEAR_CHECKOUT_STEP: {
      const stepNumber = action.payload;
      switch (stepNumber) {
        case 2: {
          return {
            ...state,
            deliveryMode: {
              selected: '',
            },
          };
        }

        case 3: {
          return {
            ...state,
            paymentDetails: {},
          };
        }
      }

      return state;
    }

    case CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS: {
      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          selected:
            action.payload.deliveryMode &&
            (action.payload.deliveryMode.code as string),
        },
        paymentDetails: action.payload.paymentInfo,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE_SUCCESS: {
      return {
        ...state,
        deliveryMode: {
          selected: '',
        },
      };
    }
  }

  return state;
}
