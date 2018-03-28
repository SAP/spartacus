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
  action: fromAction.CheckoutAction
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

    case fromAction.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getDeliveryAddress = (state: CheckoutState) => state.address;
export const getDeliveryMode = (state: CheckoutState) => state.deliveryMode;
