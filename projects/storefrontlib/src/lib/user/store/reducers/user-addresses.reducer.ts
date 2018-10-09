import * as fromUserAddressesAction from '../actions/user-addresses.action';

export interface UserAddressesState {
  list: any[];
  isLoading: boolean;
}

export const initialState: UserAddressesState = {
  list: [],
  isLoading: false
};

export function reducer(
  state = initialState,
  action: fromUserAddressesAction.UserAddressesAction
): UserAddressesState {
  switch (action.type) {
    case fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS: {
      const list = action.payload;

      if (list !== undefined) {
        return {
          ...state,
          list,
          isLoading: false
        };
      } else {
        return {
          ...state,
          isLoading: false
        };
      }
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES: {
      return {
        ...state,
        isLoading: true
      };
    }
  }
  return state;
}

export const getAddresses = (state: UserAddressesState) => state.list;
export const getLoading = (state: UserAddressesState) => state.isLoading;
