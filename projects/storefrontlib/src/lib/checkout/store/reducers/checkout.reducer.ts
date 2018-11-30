import * as fromAction from './../actions';
import { Address } from '@spartacus/core';

export interface CheckoutState {
  address: Address;
  deliveryMode: {
    supported: { [code: string]: any };
    selected: string;
  };
  paymentDetails: any;
  orderDetails: any;
}

export const initialState: CheckoutState = {
  address: {},
  deliveryMode: {
    supported: {},
    selected: ''
  },
  paymentDetails: {},
  orderDetails: {}
};

export function reducer(
  state = initialState,
  action: fromAction.CheckoutAction | fromAction.ClearMiscsData
): CheckoutState {
  switch (action.type) {
    case fromAction.ADD_DELIVERY_ADDRESS_SUCCESS:
    case fromAction.SET_DELIVERY_ADDRESS_SUCCESS: {
      const address: Address = action.payload;

      return {
        ...state,
        address
      };
    }

    case fromAction.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS: {
      const supportedModes = action.payload.deliveryModes;
      if (!supportedModes) {
        return state;
      }

      const supported = supportedModes.reduce(
        (modes: { [code: string]: any }, mode: any) => {
          return {
            ...modes,
            [mode.code]: mode
          };
        },
        {
          ...state.deliveryMode.supported
        }
      );

      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          supported
        }
      };
    }

    case fromAction.SET_DELIVERY_MODE_SUCCESS: {
      const selected: string = action.payload;

      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          selected
        }
      };
    }

    case fromAction.CREATE_PAYMENT_DETAILS_SUCCESS:
    case fromAction.SET_PAYMENT_DETAILS_SUCCESS: {
      return {
        ...state,
        paymentDetails: action.payload
      };
    }

    case fromAction.CREATE_PAYMENT_DETAILS_FAIL: {
      const paymentDetails = action.payload;
      if (paymentDetails['hasError']) {
        return {
          ...state,
          paymentDetails
        };
      }

      return state;
    }

    case fromAction.PLACE_ORDER_SUCCESS: {
      const orderDetails = action.payload;

      return {
        ...state,
        orderDetails
      };
    }

    case fromAction.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }

    case fromAction.CLEAR_CHECKOUT_STEP: {
      const stepNumber = action.payload;
      switch (stepNumber) {
        case 1: {
          return {
            ...state,
            address: {}
          };
        }

        case 2: {
          return {
            ...state,
            deliveryMode: {
              ...state.deliveryMode,
              supported: {},
              selected: ''
            }
          };
        }

        case 3: {
          return {
            ...state,
            paymentDetails: {}
          };
        }
      }

      return state;
    }

    case fromAction.CLEAR_SUPPORTED_DELIVERY_MODES:
    case fromAction.CLEAR_MISCS_DATA: {
      return {
        ...state,
        deliveryMode: {
          ...state.deliveryMode,
          supported: {}
        }
      };
    }
  }

  return state;
}

export const getDeliveryAddress = (state: CheckoutState) => state.address;
export const getDeliveryMode = (state: CheckoutState) => state.deliveryMode;
export const getPaymentDetails = (state: CheckoutState) => state.paymentDetails;
export const getOrderDetails = (state: CheckoutState) => state.orderDetails;
