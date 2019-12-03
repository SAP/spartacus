import { Order } from '../../../model/order.model';
import { UserActions } from '../actions/index';

export const initialState: Order = {};

export function reducer(
  state = initialState,
  action: UserActions.OrderDetailsAction
): Order {
  switch (action.type) {
    case UserActions.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;
      return order;
    }
  }
  return state;
}
