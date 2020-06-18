import { GigyaAuthActions } from '../actions/index';
import * as fromUserToken from './gigya-user-token.reducer';
import { UserToken } from '@spartacus/core';
import { LoadUserTokenSuccessPayload } from '../actions/gigya-user-token.action';

const testToken: UserToken = {
  access_token: 'xxx',
  token_type: 'bearer',
  refresh_token: 'xxx',
  expires_in: 1000,
  scope: ['xxx'],
  userId: 'xxx',
};

describe('UserToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserToken;
      const action = {} as GigyaAuthActions.GigyaUserTokenAction;
      const state = fromUserToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_TOKEN_SUCCESS action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const data = {
        token: testToken,
        initActionPayload: '',
      } as LoadUserTokenSuccessPayload;

      const action = new GigyaAuthActions.LoadUserTokenSuccess(data);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toEqual(testToken);
    });
  });

  describe('LOAD_GIGYA_USER_TOKEN action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const payload = {
        UID: 'abc',
        UIDSignature: 'abc',
        signatureTimestamp: 'abc',
        idToken: 'abc',
        baseSite: 'abc',
      };

      const action = new GigyaAuthActions.LoadGigyaUserToken(payload);
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toBeDefined();
    });
  });

  describe('LOAD_USER_TOKEN_FAIL action', () => {
    it('should store a user token', () => {
      const { initialState } = fromUserToken;

      const action = new GigyaAuthActions.LoadUserTokenFail('error');
      const state = fromUserToken.reducer(initialState, action);

      expect(state).toBeDefined();
    });
  });
});
