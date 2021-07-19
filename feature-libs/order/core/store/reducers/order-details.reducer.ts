import { Order } from 'feature-libs/order/root/public_api';
import { OrderActions } from '../actions/index';

export const initialState: Order = {};

export function reducer(
  state = initialState,
  action: OrderActions.OrderDetailsAction
): Order {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_DETAILS_SUCCESS: {
      const order: Order = action.payload;
      return order;
    }
  }
  return state;
}
