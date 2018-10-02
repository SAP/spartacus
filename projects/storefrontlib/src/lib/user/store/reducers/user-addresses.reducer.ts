import * as fromUserAddressesAction from '../actions/user-addresses.action';

export interface UserAddressesState {
  list: any[];
  states: {
    loading: boolean;
  };
}

export const initialState: UserAddressesState = {
  list: [],
  states: {
    loading: true
  }
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
          states: {
            ...state.states,
            loading: false
          }
        };
      } else {
        return {
          ...state,
          states: {
            ...state.states,
            loading: false
          }
        };
      }
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES_FAIL: {
      return {
        ...state,
        states: {
          ...state.states,
          loading: false
        }
      };
    }

    case fromUserAddressesAction.LOAD_USER_ADDRESSES: {
      return {
        ...state,
        states: {
          ...state.states,
          loading: true
        }
      };
    }
  }
  return state;
}

export const getAddresses = (state: UserAddressesState) => state.list;
export const getLoading = (state: UserAddressesState) => state.states.loading;
