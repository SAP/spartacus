import { OrderHistoryList } from '../../../model/order.model';
import { UserActions } from '../actions/index';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: UserActions.UserOrdersAction
): OrderHistoryList {
  switch (action.type) {
    case UserActions.LOAD_USER_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case UserActions.LOAD_USER_ORDERS_FAIL: {
      return initialState;
    }
  }

  return state;
}
