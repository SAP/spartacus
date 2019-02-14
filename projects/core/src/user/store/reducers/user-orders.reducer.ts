import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OrderHistoryList } from '../../../occ';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: []
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction
): OrderHistoryList {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_FAIL: {
      return initialState;
    }
  }

  return state;
}
