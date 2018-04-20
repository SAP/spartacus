import * as fromAction from './../actions';

export interface CheckoutState {
  address: any;
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
    case fromAction.ADD_DELIVERY_ADDRESS_SUCCESS: {
      const address = action.payload;

      return {
        ...state,
        address
      };
    }

    case fromAction.SET_DELIVERY_ADDRESS_SUCCESS: {
      const address = action.payload;

      return {
        ...state,
        address
      };
    }

    case fromAction.LOAD_SUPPORTED_DELIVERY_MODES_SUCCESS: {
      const supportedModes = action.payload.deliveryModes;
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

      const deliveryMode = {
        ...state.deliveryMode,
        supported
      };

      return {
        ...state,
        deliveryMode
      };
    }

    case fromAction.SET_DELIVERY_MODE_SUCCESS: {
      const selected = action.payload;
      const deliveryMode = {
        ...state.deliveryMode,
        selected
      };

      return {
        ...state,
        deliveryMode
      };
    }

    case fromAction.CREATE_PAYMENT_DETAILS_SUCCESS: {
      const details = action.payload;

      return {
        ...state,
        paymentDetails: details
      };
    }

    case fromAction.CREATE_PAYMENT_DETAILS_FAIL: {
      const details = action.payload;
      if (details['hasError']) {
        return {
          ...state,
          paymentDetails: details
        };
      }

      return state;
    }

    case fromAction.SET_PAYMENT_DETAILS_SUCCESS: {
      const paymentDetails = action.payload;

      return {
        ...state,
        paymentDetails
      };
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
          const deliveryMode = {
            ...state.deliveryMode,
            supported: {},
            selected: ''
          };
          return {
            ...state,
            deliveryMode
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
      const supported = {};
      const deliveryMode = {
        ...state.deliveryMode,
        supported
      };

      return {
        ...state,
        deliveryMode
      };
    }
  }

  return state;
}

export const getDeliveryAddress = (state: CheckoutState) => state.address;
export const getDeliveryMode = (state: CheckoutState) => state.deliveryMode;
export const getPaymentDetails = (state: CheckoutState) => state.paymentDetails;
export const getOrderDetails = (state: CheckoutState) => state.orderDetails;
