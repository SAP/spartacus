import { UserToken } from '../../models/token-types.model';
import { AuthActions } from './index';

const token: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
};

describe('User Token Actions', () => {
  describe('LoadUserToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest = {
        userId: 'xxx@xxx.xxx',
        password: '1234',
      };

      const action = new AuthActions.LoadUserToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_USER_TOKEN,
        payload: tokenRequest,
      });
    });
  });

  describe('LoadUserTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AuthActions.LoadUserTokenFail(error);

      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_USER_TOKEN_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadUserTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.LoadUserTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: AuthActions.LOAD_USER_TOKEN_SUCCESS,
        payload: token,
      });
    });
  });

  describe('RefreshUserToken Actions', () => {
    it('should create the action', () => {
      const refreshTokenRequest = {
        refreshToken: '1234',
      };

      const action = new AuthActions.RefreshUserToken(refreshTokenRequest);
      expect({ ...action }).toEqual({
        type: AuthActions.REFRESH_USER_TOKEN,
        payload: refreshTokenRequest,
      });
    });
  });

  describe('RefreshUserTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AuthActions.RefreshUserTokenFail(error);

      expect({ ...action }).toEqual({
        type: AuthActions.REFRESH_USER_TOKEN_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadUserTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.RefreshUserTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: AuthActions.REFRESH_USER_TOKEN_SUCCESS,
        payload: token,
      });
    });
  });

  describe('RevokeUserToken Actions', () => {
    it('should create the action', () => {
      const action = new AuthActions.RevokeUserToken(token);
      expect({ ...action }).toEqual({
        type: AuthActions.REVOKE_USER_TOKEN,
        payload: token,
      });
    });
  });

  describe('RevokeUserTokenFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new AuthActions.RevokeUserTokenFail(error);

      expect({ ...action }).toEqual({
        type: AuthActions.REVOKE_USER_TOKEN_FAIL,
        payload: error,
      });
    });
  });

  describe('RevokeUserTokenSuccess Action', () => {
    it('should create the action', () => {
      const action = new AuthActions.RevokeUserTokenSuccess(token);

      expect({ ...action }).toEqual({
        type: AuthActions.REVOKE_USER_TOKEN_SUCCESS,
        payload: token,
      });
    });
  });

  describe('ClearUserToken', () => {
    it('should create the action', () => {
      const action = new AuthActions.ClearUserToken();

      expect({ ...action }).toEqual({
        type: AuthActions.CLEAR_USER_TOKEN,
      });
    });
  });
});
