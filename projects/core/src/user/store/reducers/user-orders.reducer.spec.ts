import { MiscsDataAction } from '../actions/index';
import * as fromUserOrdersAction from '../actions/user-orders.action';

import * as fromUserOrdersReducer from './user-orders.reducer';

describe('User Orders Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserOrdersReducer;
      const action = {} as
        | fromUserOrdersAction.UserOrdersAction
        | MiscsDataAction;
      const state = fromUserOrdersReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });
});
