import { GigyaAuthActions } from './index';
import { UserToken } from '@spartacus/core';

const token: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('Gigya User Token Actions', () => {
  describe('LoadGigyaUserToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest = {
        UID: 'xxx',
        UIDSignature: 'xxx',
        signatureTimestamp: 'xxx',
        idToken: 'xxx',
        baseSite: 'xxx',
      };

      const action = new GigyaAuthActions.LoadGigyaUserToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: GigyaAuthActions.LOAD_GIGYA_USER_TOKEN,
        payload: tokenRequest,
      });
    });
  });

  describe('LoadUserTokenFail Action', () => {
    it('should create the action', () => {
      const data = {
        error: 'anError',
        initActionPayload: 'payload',
      } as any;

      const action = new GigyaAuthActions.LoadUserTokenFail(data);

      expect({ ...action }).toEqual({
        type: GigyaAuthActions.LOAD_USER_TOKEN_FAIL,
        payload: data,
      });
    });
  });

  describe('LoadUserTokenSuccess Action', () => {
    it('should create the action', () => {
      const data = {
        token: token,
        initActionPayload: 'payload',
      } as any;

      const action = new GigyaAuthActions.LoadUserTokenSuccess(data);

      expect({ ...action }).toEqual({
        type: GigyaAuthActions.LOAD_USER_TOKEN_SUCCESS,
        payload: data,
      });
    });
  });
});
