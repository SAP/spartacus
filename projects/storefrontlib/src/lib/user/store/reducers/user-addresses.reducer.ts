import * as fromUserAddressesAction from '../actions/user-addresses.action';
import { Address } from '@spartacus/core';

export interface UserAddressesState {
  list: Address[];
  isLoading: boolean;
  isActionProcessing: boolean;
}

export const initialState: UserAddressesState = {
  list: [],
  isLoading: false,
  isActionProcessing: false
};

export function reducer(
  state = initialState,
  action: fromUserAddressesAction.UserAddressesAction
): UserAddressesState {
  switch (action.type) {
    case fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS: {
      const list: Address[] = action.payload;

      if (list !== undefined) {
        return {
          ...state,
          list,
          isLoading: false,
          isActionProcessing: false
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isActionProcessing: false
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

    case fromUserAddressesAction.ADD_USER_ADDRESS: {
      return {
        ...state,
        isActionProcessing: true
      };
    }

    case fromUserAddressesAction.UPDATE_USER_ADDRESS: {
      return {
        ...state,
        isActionProcessing: true
      };
    }

    case fromUserAddressesAction.DELETE_USER_ADDRESS: {
      return {
        ...state,
        isActionProcessing: true
      };
    }
  }

  return state;
}

export const getAddresses = (state: UserAddressesState) => state.list;
export const getLoading = (state: UserAddressesState) => state.isLoading;
