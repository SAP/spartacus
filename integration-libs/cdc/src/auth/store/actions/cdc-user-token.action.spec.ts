import { CdcAuthActions } from './index';

describe('CDC User Token Actions', () => {
  describe('LoadCdcUserToken Actions', () => {
    it('should create the action', () => {
      const tokenRequest = {
        UID: 'xxx',
        UIDSignature: 'xxx',
        signatureTimestamp: 'xxx',
        idToken: 'xxx',
        baseSite: 'xxx',
      };

      const action = new CdcAuthActions.LoadCdcUserToken(tokenRequest);
      expect({ ...action }).toEqual({
        type: CdcAuthActions.LOAD_CDC_USER_TOKEN,
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

      const action = new CdcAuthActions.LoadCdcUserTokenFail(data);

      expect({ ...action }).toEqual({
        type: CdcAuthActions.LOAD_CDC_USER_TOKEN_FAIL,
        payload: data,
      });
    });
  });
});
