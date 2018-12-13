import * as fromUserAddressesAction from '../actions/user-addresses.action';
import * as fromUserAddressesReducer from './user-addresses.reducer';
import { Address } from '../../../occ-models/index';

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

  describe('ADD_USER_ADDRESS action', () => {
    it('should set isActionProcessing flag to true', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.AddUserAddress({});
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state.isActionProcessing).toEqual(true);
    });
  });

  describe('UPDATE_USER_ADDRESS action', () => {
    it('should set isActionProcessing flag to true', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.UpdateUserAddress({});
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state.isActionProcessing).toEqual(true);
    });
  });

  describe('DELETE_USER_ADDRESS action', () => {
    it('should set isActionProcessing flag to true', () => {
      const { initialState } = fromUserAddressesReducer;
      const action = new fromUserAddressesAction.DeleteUserAddress({});
      const state = fromUserAddressesReducer.reducer(initialState, action);
      expect(state.isActionProcessing).toEqual(true);
    });
  });
});
