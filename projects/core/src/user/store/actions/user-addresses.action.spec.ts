import { Address } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ADDRESSES } from '../user-state';
import { UserActions } from './index';

const userId = '123';
const address: Address = {
  companyName: 'sap',
};

describe('User Addresses Actions', () => {
  describe('LoadUserAddresses Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserAddresses(userId);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ADDRESSES,
        payload: userId,
        meta: StateUtils.loadMeta(USER_ADDRESSES),
      });
    });
  });

  describe('LoadUserAddressesFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadUserAddressesFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ADDRESSES_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_ADDRESSES, error),
      });
    });
  });

  describe('LoadUserAddressesSuccess Action', () => {
    const mockUserAddresses: Address[] = [
      { id: 'address1' },
      { id: 'address2' },
    ];

    it('should create the action', () => {
      const action = new UserActions.LoadUserAddressesSuccess(
        mockUserAddresses
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ADDRESSES_SUCCESS,
        payload: mockUserAddresses,
        meta: StateUtils.successMeta(USER_ADDRESSES),
      });
    });
  });

  describe('AddUserAddress Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.AddUserAddress({
        userId,
        address,
      });

      expect({ ...action }).toEqual({
        type: UserActions.ADD_USER_ADDRESS,
        payload: { userId, address },
        meta: StateUtils.loadMeta(USER_ADDRESSES),
      });
    });
  });

  describe('AddUserAddressFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.AddUserAddressFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.ADD_USER_ADDRESS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_ADDRESSES, error),
      });
    });
  });

  describe('AddUserAddressSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new UserActions.AddUserAddressSuccess(payload);

      expect({ ...action }).toEqual({
        type: UserActions.ADD_USER_ADDRESS_SUCCESS,
        payload: payload,
        meta: StateUtils.successMeta(USER_ADDRESSES),
      });
    });
  });

  describe('UpdateUserAddress Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.UpdateUserAddress({
        userId,
        addressId: '1',
        address,
      });

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_ADDRESS,
        payload: {
          userId,
          addressId: '1',
          address,
        },
        meta: StateUtils.loadMeta(USER_ADDRESSES),
      });
    });
  });

  describe('UpdateUserAddressFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.UpdateUserAddressFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_ADDRESS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_ADDRESSES, error),
      });
    });
  });

  describe('UpdateUserAddressSuccess Action', () => {
    const payload = 'success';

    it('should create the action', () => {
      const action = new UserActions.UpdateUserAddressSuccess(payload);

      expect({ ...action }).toEqual({
        type: UserActions.UPDATE_USER_ADDRESS_SUCCESS,
        payload: payload,
        meta: StateUtils.successMeta(USER_ADDRESSES),
      });
    });
  });
});
