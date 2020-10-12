import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';
import * as fromUserToken from './user-token.reducer';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_at: '900',
  access_token_stored_at: '800',
  granted_scopes: [],
};

describe('UserToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserToken;
      const action = {} as AuthActions.UserTokenAction;
      const state = fromUserToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('SET_USER_TOKEN_DATA action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new AuthActions.SetUserTokenData(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });
});
