import { UserOrdersState } from '../user-state';
import * as fromAction from '../actions/index';
import * as fromUserOrdersAction from '../actions/user-orders.action';

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
    case fromAction.CLEAR_MISCS_DATA: {
      return initialState;
    }
  }

  return state;
}
