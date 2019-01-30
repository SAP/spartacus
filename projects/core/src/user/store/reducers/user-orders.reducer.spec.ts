import { MiscsDataAction } from '../actions/index';

import * as fromUserOrdersReducer from './user-orders.reducer';

describe('User Orders Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserOrdersReducer;
      const action = {} as MiscsDataAction;
      const state = fromUserOrdersReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
});
