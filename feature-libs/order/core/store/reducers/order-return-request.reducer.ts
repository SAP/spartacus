import { ReturnRequestList } from '@spartacus/core';
import { OrderActions } from '../actions/index';

export const initialState: ReturnRequestList = {
  returnRequests: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: OrderActions.OrderReturnRequestAction
): ReturnRequestList {
  switch (action.type) {
    case OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }

  return state;
}
