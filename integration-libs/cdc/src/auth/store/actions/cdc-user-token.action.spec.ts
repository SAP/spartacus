import { CDCAuthActions } from './index';

describe('CDC User Token Actions', () => {
  describe('LoadCDCUserToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest = {
        UID: 'xxx',
        UIDSignature: 'xxx',
        signatureTimestamp: 'xxx',
        idToken: 'xxx',
        baseSite: 'xxx',
      };

      const action = new CDCAuthActions.LoadCDCUserToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: CDCAuthActions.LOAD_CDC_USER_TOKEN,
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

      const action = new CDCAuthActions.LoadCDCUserTokenFail(data);

      expect({ ...action }).toEqual({
        type: CDCAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
        payload: data,
      });
    });
  });
});
