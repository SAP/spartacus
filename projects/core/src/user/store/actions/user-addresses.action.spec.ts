import { USER_ADDRESSES } from '../user-state';
import { Address } from '../../../occ/occ-models/index';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';

import * as fromUserAddressesAction from './user-addresses.action';

const userId = '123';
const address: Address = {
  companyName: 'sap'
};

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

  describe('AddUserAddress Actions', () => {
    it('should create the action', () => {
      const action = new fromUserAddressesAction.AddUserAddress({
        userId,
        address
      });

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.ADD_USER_ADDRESS,
        payload: { userId, address },
        meta: loadMeta(USER_ADDRESSES)
      });
    });
  });

  describe('AddUserAddressFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserAddressesAction.AddUserAddressFail(error);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.ADD_USER_ADDRESS_FAIL,
        payload: error,
        meta: failMeta(USER_ADDRESSES, error)
      });
    });
  });

  describe('AddUserAddressSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new fromUserAddressesAction.AddUserAddressSuccess(payload);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.ADD_USER_ADDRESS_SUCCESS,
        payload: payload,
        meta: successMeta(USER_ADDRESSES)
      });
    });
  });

  describe('UpdateUserAddress Actions', () => {
    it('should create the action', () => {
      const action = new fromUserAddressesAction.UpdateUserAddress({
        userId,
        addressId: '1',
        address
      });

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.UPDATE_USER_ADDRESS,
        payload: {
          userId,
          addressId: '1',
          address
        },
        meta: loadMeta(USER_ADDRESSES)
      });
    });
  });

  describe('UpdateUserAddressFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserAddressesAction.UpdateUserAddressFail(error);

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.UPDATE_USER_ADDRESS_FAIL,
        payload: error,
        meta: failMeta(USER_ADDRESSES, error)
      });
    });
  });

  describe('UpdateUserAddressSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new fromUserAddressesAction.UpdateUserAddressSuccess(
        payload
      );

      expect({ ...action }).toEqual({
        type: fromUserAddressesAction.UPDATE_USER_ADDRESS_SUCCESS,
        payload: payload,
        meta: successMeta(USER_ADDRESSES)
      });
    });
  });
});
