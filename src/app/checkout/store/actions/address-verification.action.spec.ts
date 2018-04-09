import * as fromAction from '../actions/address-verification.action';

describe('Address Verification Actions', () => {
  describe('LoadAddressVerificationResults', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };

      const action = new fromAction.LoadAddressVerificationResults({
        userId: 'userId',
        address: 'address'
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ADDRESS_VERIFICATION_RESULTS,
        payload: payload
      });
    });
  });

  describe('LoadAddressVerificationResultsFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadAddressVerificationResultsFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ADDRESS_VERIFICATION_RESULTS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadAddressVerificationResultSuccess', () => {
    it('should create the action', () => {
      const addresses = ['address1', 'address2'];
      const action = new fromAction.LoadAddressVerificationResultsSuccess(
        addresses
      );
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_ADDRESS_VERIFICATION_RESULTS_SUCCESS,
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
