import * as fromAction from '../actions/index';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OrderHistoryList } from '../../../occ';

export const initialState: OrderHistoryList = {
  orders: [],
  pagination: {},
  sorts: []
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction | fromAction.MiscsDataAction
): OrderHistoryList {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_FAIL: {
      return initialState;
    }

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
