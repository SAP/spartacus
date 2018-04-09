import * as fromReducer from './address-verification.reducer';
import * as fromActions from '../actions/';

describe('Address Verification Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ADDRESS_VERIFICATION_RESULTS_SUCCESS action', () => {
    it('should load the address verification results state entities', () => {
      const addresses = ['address1', 'address2'];

      const { initialState } = fromReducer;
      const action = new fromActions.LoadAddressVerificationResultsSuccess(
        addresses
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(addresses);
    });
  });

  describe('LOAD_ADDRESS_VERIFICATION_RESULTS_FAIL action', () => {
    it('should not load the address verification results state entities', () => {
      const error = 'error';

      const { initialState } = fromReducer;
      const action = new fromActions.LoadAddressVerificationResultsFail(error);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(undefined);
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
