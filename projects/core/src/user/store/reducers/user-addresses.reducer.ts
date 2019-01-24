import { UserAddressesState } from '../user-state';
import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { Address } from '../../../occ/occ-models/index';

export const initialState: UserAddressesState = {
  list: [],
  isActionProcessing: false
};

export function reducer(
  state = initialState,
  action: fromUserAddressesAction.UserAddressesAction
): UserAddressesState {
  switch (action.type) {
    case fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS: {
      const list: Address[] = action.payload || initialState.list;
      return {
        ...state,
        list,
        isActionProcessing: false
      };
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES_FAIL: {
      return {
        ...state
      };
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES: {
      return {
        ...state
      };
    }

    case fromUserAddressesAction.UPDATE_USER_ADDRESS:
    case fromUserAddressesAction.DELETE_USER_ADDRESS:
    case fromUserAddressesAction.ADD_USER_ADDRESS: {
      return {
        ...state,
        isActionProcessing: true
      };
    }
  }

  return state;
}
