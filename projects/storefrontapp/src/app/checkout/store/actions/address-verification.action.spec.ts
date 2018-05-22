import * as fromAction from '../actions/address-verification.action';

describe('Address Verification Actions', () => {
  describe('VerifyAddress', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };

      const action = new fromAction.VerifyAddress({
        userId: 'userId',
        address: 'address'
      });
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
      const addresses = ['address1', 'address2'];
      const action = new fromAction.VerifyAddressSuccess(addresses);
      expect({ ...action }).toEqual({
        type: fromAction.VERIFY_ADDRESS_SUCCESS,
        payload: addresses
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
