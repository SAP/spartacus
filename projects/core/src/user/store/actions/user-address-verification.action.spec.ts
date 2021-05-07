import { Address, AddressValidation } from '../../../model/address.model';
import { UserActions } from './index';

describe('Address Verification Actions', () => {
  describe('VerifyAddress', () => {
    it('should create the action', () => {
      const address: Address = {
        id: 'testAddress1',
      };

      const payload = {
        userId: 'userId',
        address,
      };

      const action = new UserActions.VerifyUserAddress(payload);

      expect({ ...action }).toEqual({
        type: UserActions.VERIFY_USER_ADDRESS,
        payload: payload,
      });
    });
  });

  describe('VerifyAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.VerifyUserAddressFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.VERIFY_USER_ADDRESS_FAIL,
        payload: error,
      });
    });
  });

  describe('VerifyAddressSuccess', () => {
    it('should create the action', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }],
      };
      const action = new UserActions.VerifyUserAddressSuccess(
        addressValidation
      );
      expect({ ...action }).toEqual({
        type: UserActions.VERIFY_USER_ADDRESS_SUCCESS,
        payload: addressValidation,
      });
    });
  });

  describe('ClearAddressVerificationResults', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearUserAddressVerificationResults();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_USER_ADDRESS_VERIFICATION_RESULTS,
      });
    });
  });
});
