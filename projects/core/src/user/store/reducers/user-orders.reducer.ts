import { UserOrdersState } from '../user-state';
import * as fromAction from '../actions/index';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import { OrderHistoryList } from '../../../occ/occ-models';

export const initialState: UserOrdersState = {
  orders: {
    orders: [],
    pagination: {},
    sorts: []
  }
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction | fromAction.MiscsDataAction
): UserOrdersState {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS: {
      return {
        ...state
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS: {
      const orders: OrderHistoryList = action.payload;
      return {
        ...state,
        orders
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_FAIL: {
      return {
        ...state
      };
    }

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
