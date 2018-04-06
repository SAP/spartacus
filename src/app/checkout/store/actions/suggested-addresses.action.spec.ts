import * as fromAction from '../actions/suggested-addresses.action';

describe('Suggested Addresses Actions', () => {
  describe('LoadSuggestedAddresses', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'userId',
        address: 'address'
      };

      const action = new fromAction.LoadSuggestedAddresses({
        userId: 'userId',
        address: 'address'
      });
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_SUGGESTED_ADDRESSES,
        payload: payload
      });
    });
  });

  describe('LoadSuggestedAddressesFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAction.LoadSuggestedAddressesFail(error);

      expect({ ...action }).toEqual({
        type: fromAction.LOAD_SUGGESTED_ADDRESSES_FAIL,
        payload: error
      });
    });
  });

  describe('LoadSuggestedAddressesSuccess', () => {
    it('should create the action', () => {
      const addresses = ['address1', 'address2'];
      const action = new fromAction.LoadSuggestedAddressesSuccess(addresses);
      expect({ ...action }).toEqual({
        type: fromAction.LOAD_SUGGESTED_ADDRESSES_SUCCESS,
        payload: addresses
      });
    });
  });

  describe('ClearSuggestedAddresses', () => {
    it('should create the action', () => {
      const action = new fromAction.ClearSuggestedAddresses();
      expect({ ...action }).toEqual({
        type: fromAction.CLEAR_SUGGESTED_ADDRESSES
      });
    });
  });
});
