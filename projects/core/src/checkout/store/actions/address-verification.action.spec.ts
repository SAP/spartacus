import * as fromAction from '../actions/address-verification.action';
import { AddressValidation, Address } from '@spartacus/core';

describe('Address Verification Actions', () => {
  describe('VerifyAddress', () => {
    it('should create the action', () => {
      const address: Address = {
        id: 'testAddress1'
      };

      const payload = {
        userId: 'userId',
        address
      };

      const action = new fromAction.VerifyAddress(payload);

      expect({ ...action }).toEqual({
        type: fromAction.VERIFY_ADDRESS,
        payload: payload
      });
    });
  });

  describe('VerifyAddressFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.VerifyAddressFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.VERIFY_ADDRESS_FAIL,
        payload: error
      });
    });
  });

  describe('VerifyAddressSuccess', () => {
    it('should create the action', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }]
      };
      const action = new fromAction.VerifyAddressSuccess(addressValidation);
      expect({ ...action }).toEqual({
        type: fromAction.VERIFY_ADDRESS_SUCCESS,
        payload: addressValidation
      });
    });
  });

  describe('ClearAddressVerificationResults', () => {
    it('should create the action', () => {
      const action = new fromAction.ClearAddressVerificationResults();
      expect({ ...action }).toEqual({
        type: fromAction.CLEAR_ADDRESS_VERIFICATION_RESULTS
      });
    });
  });
});
