import * as fromReducer from './customer.reducer';

describe('Customer reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const state = fromReducer.reducer(initialState, undefined);

      expect(state).toBe(initialState);
    });
  });
});
