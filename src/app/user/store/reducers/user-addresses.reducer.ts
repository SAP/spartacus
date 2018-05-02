import * as fromUserAddressesAction from '../actions/user-addresses.action';

export interface UserAddressesState {
  list: any[];
}

export const initialState: UserAddressesState = {
  list: []
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
          list
        };
      }
    }
  }
  return state;
}

export const getAddresses = (state: UserAddressesState) => state.list;
