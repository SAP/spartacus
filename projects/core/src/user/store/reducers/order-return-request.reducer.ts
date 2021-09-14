import { ReturnRequestList } from '../../../model/order.model';
import { UserActions } from '../actions/index';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const initialState: ReturnRequestList = {
  returnRequests: [],
  pagination: {},
  sorts: [],
};

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
