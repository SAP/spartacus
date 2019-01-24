import { USER_ADDRESSES } from '../user-state';
import { Address } from '../../../occ/occ-models/index';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';

import * as fromUserAddressesAction from './user-addresses.action';

const userId = '123';

describe('User Addresses Actions', () => {
  describe('LoadUserAddresses Actions', () => {
    it('should create the action', () => {
      const action = new fromUserAddressesAction.LoadUserAddresses(userId);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.LOAD_USER_ADDRESSES,
        payload: userId,
        meta: loadMeta(USER_ADDRESSES)
      });
    });
  });

  describe('LoadUserAddressesFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserAddressesAction.LoadUserAddressesFail(error);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.LOAD_USER_ADDRESSES_FAIL,
        payload: error,
        meta: failMeta(USER_ADDRESSES, error)
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
        payload: mockUserAddresses,
        meta: successMeta(USER_ADDRESSES)
      });
    });
  });
});
