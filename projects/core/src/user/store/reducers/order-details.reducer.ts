import { Order } from '../../../model/order.model';
import { UserActions } from '../actions/index';
import { OrderDetailsState } from '../user-state';

export const initialState: OrderDetailsState = {
  order: {},
};

export function reducer(
  state = initialState,
  action: UserActions.OrderDetailsAction
): OrderDetailsState {
  switch (action.type) {
    case UserActions.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;

      return {
        ...state,
        order,
      };
    }
    case UserActions.CLEAR_ORDER_DETAILS: {
      return initialState;
    }
  }
  return state;
}
