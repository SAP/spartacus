import * as fromUserAddressesAction from '../actions/user-addresses.action';

export interface UserAddressesState {
  entites: any;
}

export const initialState: UserAddressesState = {
  entites: <any>{}
};

export function reducer(
  state = initialState,
  action: fromUserAddressesAction.UserAddressesAction
): UserAddressesState {
  switch (action.type) {
    case fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS: {
      const entites = action.payload;

      return {
        ...state,
        entites
      };
    }
  }
  return state;
}

export const getAddressesEntites = (state: UserAddressesState) => state.entites;
