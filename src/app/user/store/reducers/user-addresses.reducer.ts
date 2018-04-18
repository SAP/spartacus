import * as fromUserAddressesAction from '../actions/user-addresses.action';

export interface UserAddressesState {
  entities: any;
}

export const initialState: UserAddressesState = {
  entities: <any>{}
};

export function reducer(
  state = initialState,
  action: fromUserAddressesAction.UserAddressesAction
): UserAddressesState {
  switch (action.type) {
    case fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS: {
      const entities = action.payload;

      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const getAddresses = (state: UserAddressesState) => state.entities;
