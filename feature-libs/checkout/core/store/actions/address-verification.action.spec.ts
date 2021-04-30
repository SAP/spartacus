import { Address, AddressValidation } from '@spartacus/core';
import { CheckoutActions } from '../actions/index';

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

      const action = new CheckoutActions.VerifyAddress(payload);

      expect({ ...action }).toEqual({
        type: CheckoutActions.VERIFY_ADDRESS,
        payload: payload,
      });
    });
  });

  describe('VerifyAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new CheckoutActions.VerifyAddressFail(error);

      expect({ ...action }).toEqual({
        type: CheckoutActions.VERIFY_ADDRESS_FAIL,
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
      const action = new CheckoutActions.VerifyAddressSuccess(
        addressValidation
      );
      expect({ ...action }).toEqual({
        type: CheckoutActions.VERIFY_ADDRESS_SUCCESS,
        payload: addressValidation,
      });
    });
  });

  describe('ClearAddressVerificationResults', () => {
    it('should create the action', () => {
      const action = new CheckoutActions.ClearAddressVerificationResults();
      expect({ ...action }).toEqual({
        type: CheckoutActions.CLEAR_ADDRESS_VERIFICATION_RESULTS,
      });
    });
  });
});
