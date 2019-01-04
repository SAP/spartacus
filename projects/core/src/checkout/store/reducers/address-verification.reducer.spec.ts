import * as fromReducer from './address-verification.reducer';
import * as fromActions from '../actions/index';
import { AddressValidation } from '@spartacus/core';

describe('Address Verification Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('VERIFY_ADDRESS_SUCCESS action', () => {
    it('should load the address verification results state entities', () => {
      const addressValidation: AddressValidation = {
        decision: 'test address validation',
        suggestedAddresses: [{ id: 'address1' }]
      };

      const { initialState } = fromReducer;
      const action = new fromActions.VerifyAddressSuccess(addressValidation);
      const state = fromReducer.reducer(initialState, action);
      expect(state.results).toEqual(addressValidation);
    });
  });

  describe('CLEAR_ADDRESS_VERIFICATION_RESULTS action', () => {
    it('should clear the address verification results data', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.ClearAddressVerificationResults();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
