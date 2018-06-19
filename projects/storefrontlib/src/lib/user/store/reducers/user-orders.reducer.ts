import * as fromUserOrdersAction from '../actions/user-orders.action';

export interface UserOrdersState {
  orders: any;
  loading: boolean;
  loaded: boolean;
}

export const initialState: UserOrdersState = {
  orders: <any>{},
  loading: false,
  loaded: false
};

export function reducer(
  state = initialState,
  action: fromUserOrdersAction.UserOrdersAction
): UserOrdersState {
  switch (action.type) {
    case fromUserOrdersAction.LOAD_USER_ORDERS: {
      return {
        ...state,
        loading: true,
        loaded: false
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
      const orders = action.payload;
      return {
        ...state,
        orders,
        loaded: false,
        loading: false
      };
    }
  }
  return state;
}

export const getOrders = (state: UserOrdersState) => state.orders;
