import { CustomerActions } from '../actions';
import * as fromReducer from './customer.reducer';

describe('Customer reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as CustomerActions.CustomerAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
});
