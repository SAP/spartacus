import * as fromAction from './../actions';

export interface CheckoutState {
  address: any;
  deliveryMode: {
    supported: { [code: string]: any };
    selected: string;
  };
}

export const initialState: CheckoutState = {
  address: {},
  deliveryMode: {
    supported: {},
    selected: ''
  }
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

        // case 3: {
        // }
      }

      return state;
    }

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
