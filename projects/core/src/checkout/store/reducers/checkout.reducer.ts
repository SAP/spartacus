import { Address } from '../../../model/address.model';
import { DeliveryMode, Order } from '../../../model/order.model';
import { CheckoutStepsState } from '../checkout-state';
import { CheckoutActions } from './../actions/index';

export const initialState: CheckoutStepsState = {
  address: {},
  deliveryMode: {
    supported: {},
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
): CheckoutStepsState {
  switch (action.type) {
    case CheckoutActions.ADD_DELIVERY_ADDRESS_SUCCESS:
    case CheckoutActions.SET_DELIVERY_ADDRESS_SUCCESS: {
      const address: Address = action.payload;

      return {
        ...state,
        address,
      };
    }

    case CheckoutActions.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS: {
      const supportedModes = action.payload;
      if (!supportedModes) {
        return state;
      }

      const supported = supportedModes.reduce(
        (modes: { [code: string]: DeliveryMode }, mode: DeliveryMode) => {
          return {
            ...modes,
            [mode.code]: mode,
          };
        },
        {
          ...state.deliveryMode.supported,
        }
      );

      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          supported,
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

    case CheckoutActions.PLACE_ORDER_SUCCESS: {
      const orderDetails: Order = action.payload;

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
      const STEP_ONE = 1,
        STEP_TWO = 2,
        STEP_THREE = 3;

      switch (stepNumber) {
        case STEP_ONE: {
          return {
            ...state,
            address: {},
          };
        }

        case STEP_TWO: {
          return {
            ...state,
            deliveryMode: {
              ...state.deliveryMode,
              supported: {},
              selected: '',
            },
          };
        }

        case STEP_THREE: {
          return {
            ...state,
            paymentDetails: {},
          };
        }
      }

      return state;
    }

    case CheckoutActions.CLEAR_SUPPORTED_DELIVERY_MODES:
    case CheckoutActions.CHECKOUT_CLEAR_MISCS_DATA: {
      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          supported: {},
        },
      };
    }
    case CheckoutActions.LOAD_CHECKOUT_DETAILS_SUCCESS: {
      return {
        ...state,
        address: action.payload.deliveryAddress,
        deliveryMode: {
          ...state.deliveryMode,
          selected:
            action.payload.deliveryMode && action.payload.deliveryMode.code,
        },
        paymentDetails: action.payload.paymentInfo,
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_ADDRESS: {
      return {
        ...state,
        address: {},
      };
    }

    case CheckoutActions.CLEAR_CHECKOUT_DELIVERY_MODE: {
      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          selected: '',
        },
      };
    }
  }

  return state;
}
