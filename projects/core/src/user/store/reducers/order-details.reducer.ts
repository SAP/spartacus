import { Order } from '../../../model/order.model';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const initialState: Order = {};

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
