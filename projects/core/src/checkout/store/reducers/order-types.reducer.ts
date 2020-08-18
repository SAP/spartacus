import { ORDER_TYPE } from '../../../model/replenishment-order.model';
import { CheckoutActions } from '../actions/index';
import { OrderTypesState } from '../checkout-state';

export const initialState: OrderTypesState = {
  selected: ORDER_TYPE.PLACE_ORDER,
};

export function reducer(
  state = initialState,
  action: CheckoutActions.OrderTypesActions
): OrderTypesState {
  switch (action.type) {
    case CheckoutActions.SET_ORDER_TYPE: {
      return {
        ...state,
        selected: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
