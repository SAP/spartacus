import * as fromReducer from './client-token.reducer';
import * as fromActions from './../actions';
import { ClientToken } from './../../models/token-types.model';

const testToken: ClientToken = {
  access_token: 'xxx',
  token_type: 'xxx',
  expires_in: 1,
  scope: 'xxx'
};

describe('ClientToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromActions.ClientTokenAction;
      const state = fromReducer.reducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CLIENT_TOKEN_SUCCESS action', () => {
    it('should store a client token', () => {
      const { initialState } = fromReducer;

      const action = new fromActions.LoadClientTokenSuccess(testToken);
      const state = fromReducer.reducer(initialState, action);

      expect(state.token).toEqual(testToken);
    });
  });
});
