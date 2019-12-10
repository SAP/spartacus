import { ReturnRequestList } from '../../../model/order.model';
import { UserActions } from '../actions/index';

export const initialState: ReturnRequestList = {
  returnRequests: [],
  pagination: {},
  sorts: [],
};

export function reducer(
  state = initialState,
  action: UserActions.OrderReturnRequestAction
): ReturnRequestList {
  switch (action.type) {
    case UserActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS: {
      return action.payload ? action.payload : initialState;
    }
  }

  return state;
}
