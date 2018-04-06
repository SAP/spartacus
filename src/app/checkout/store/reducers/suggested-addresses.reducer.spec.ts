import * as fromReducer from './suggested-addresses.reducer';
import * as fromActions from '../actions/';

describe('Suggested Addresses Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as any;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_SUGGESTED_ADDRESSES_SUCCESS action', () => {
    it('should load the suggested addresses state entities', () => {
      const addresses = ['address1', 'address2'];

      const { initialState } = fromReducer;
      const action = new fromActions.LoadSuggestedAddressesSuccess(addresses);
      const state = fromReducer.reducer(initialState, action);
      expect(state.suggestedAddresses).toEqual(addresses);
    });
  });

  describe('CLEAR_SUGGESTED_ADDRESSES action', () => {
    it('should clear the suggested addresses data', () => {
      const { initialState } = fromReducer;
      const action = new fromActions.ClearSuggestedAddresses();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
