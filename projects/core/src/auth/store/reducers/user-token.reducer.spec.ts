import { UserToken } from '../../models/token-types.model';
import { AuthActions } from '../actions/index';
import * as fromUserToken from './user-token.reducer';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
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

  describe('LOAD_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new AuthActions.LoadUserTokenSuccess(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });

  describe('REFRESH_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new AuthActions.RefreshUserTokenSuccess(testToken);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });

  describe('CLEAR_USER_TOKEN action', () => {
    it('should reset state', () => {
      const { initialState } = fromUserToken;
      const preState = { ...initialState, access_token: 'access_token' };
      const action = new AuthActions.ClearUserToken();
      const state = fromUserToken.reducer(preState, action);

      expect(state).toEqual(initialState);
    });
  });
});
