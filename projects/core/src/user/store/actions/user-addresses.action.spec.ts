import * as fromUserAddressesAction from './user-addresses.action';
import { Address } from '../../../occ-models/index';

const userId = '123';

describe('User Addresses Actions', () => {
  describe('LoadUserAddresses Actions', () => {
    it('should create the action', () => {
      const action = new fromUserAddressesAction.LoadUserAddresses(userId);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.LOAD_USER_ADDRESSES,
        payload: userId
      });
    });
  });

  describe('LoadUserAddressesFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserAddressesAction.LoadUserAddressesFail(error);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.LOAD_USER_ADDRESSES_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserAddressesSuccess Action', () => {
    const mockUserAddresses: Address[] = [
      { id: 'address1' },
      { id: 'address2' }
    ];

    it('should create the action', () => {
      const action = new fromUserAddressesAction.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.LOAD_USER_ADDRESSES_SUCCESS,
        payload: mockUserAddresses
      });
    });
  });
});
