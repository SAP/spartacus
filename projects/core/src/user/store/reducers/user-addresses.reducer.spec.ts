import { Address } from '../../../model/address.model';
import { UserActions } from '../actions/index';
import * as fromUserAddressesReducer from './user-addresses.reducer';

describe('User Addresses Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = {} as UserActions.UserAddressesAction;
      const state = fromUserAddressesReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_ADDRESSES_SUCCESS action', () => {
    it('should populate the user addresses state entities', () => {
      const mockUserAddresses: Address[] = [
        { id: 'address1' },
        { id: 'address2' },
      ];

      const { initialState } = fromUserAddressesReducer;
      const action = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );
      const state = fromUserAddressesReducer.reducer(initialState, action);

      expect(state).toEqual(mockUserAddresses);
    });
  });

  describe('LOAD_USER_ADDRESSES_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new UserActions.LoadUserAddressesFail({});
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
