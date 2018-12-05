import * as fromUserOrdersAction from '../actions/user-orders.action';
import * as fromAction from '../actions';
import { UserOrdersState } from '../user-state';

export const initialState: UserOrdersState = {
  orders: {
    orders: [],
    pagination: {},
    sorts: []
  },
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction | fromAction.MiscsDataAction
): UserOrdersState {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS: {
      const orders = action.payload;
      return {
        ...state,
        orders,
        loaded: true,
        loading: false
      };
    }
    case fromUserOrdersAction.LOAD_USER_ORDERS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }

    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}

export const getOrders = (state: UserOrdersState) => state.orders;
export const getOrdersLoaded = (state: UserOrdersState) => state.loaded;
export const getOrdersLoading = (state: UserOrdersState) => state.loading;
