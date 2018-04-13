import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesReducer from './user-addresses.reducer';

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
      const mockUserAddresses = { addresses: ['address1', 'address2'] };

      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.LoadUserAddressesSuccess(
        mockUserAddresses
      );
      const state = fromUserAddressesReducer.reducer(initialState, action);

      expect(state.entities).toEqual(mockUserAddresses);
    });
  });
});
