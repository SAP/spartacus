import * as fromAction from './../actions';

export interface CheckoutState {
  address: any;
}

export const initialState: CheckoutState = {
  address: {}
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

    case fromAction.CLEAR_CHECKOUT_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getDeliveryAddress = (state: CheckoutState) => state.address;
