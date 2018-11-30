import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesReducer from './user-addresses.reducer';
import { Address } from '@spartacus/core';

describe('User Addresses Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = {} as any;
      const state = fromUserAddressesReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_ADDRESSES_SUCCESS action', () => {
    it('should populate the user addresses state entities', () => {
      const mockUserAddresses: Address[] = [
        { id: 'address1' },
        { id: 'address2' }
      ];

      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.LoadUserAddressesSuccess(
        mockUserAddresses
      );
      const state = fromUserAddressesReducer.reducer(initialState, action);

      expect(state.list).toEqual(mockUserAddresses);
    });
  });

  describe('LOAD_USER_ADDRESSES_FAIL action', () => {
    it('should set isLoading flag to false', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.LoadUserAddressesFail({});
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe('LOAD_USER_ADDRESSES action', () => {
    it('should set isLoading flag to true', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.LoadUserAddresses('userId');
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
  });
});
