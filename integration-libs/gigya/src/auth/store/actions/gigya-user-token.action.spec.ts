import { GigyaAuthActions } from './index';

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

      const action = new GigyaAuthActions.LoadGigyaUserTokenFail(data);

      expect({ ...action }).toEqual({
        type: GigyaAuthActions.LOAD_GIGYA_USER_TOKEN_FAIL,
        payload: data,
      });
    });
  });
});
