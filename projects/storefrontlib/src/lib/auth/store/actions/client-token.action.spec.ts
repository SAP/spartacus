import * as fromAuthActions from './';
import { ClientToken } from './../../models/token-types.model';

const clientToken: ClientToken = {
  access_token: 'xxx',
  token_type: 'xxx',
  expires_in: 1,
  scope: 'xxx'
};

describe('Client Token Actions', () => {
  describe('LoadClientToken', () => {
    it('should create the action', () => {
      const action = new fromAuthActions.LoadClientToken();
      expect({ ...action }).toEqual({
        type: fromAuthActions.LOAD_CLIENT_TOKEN
      });
    });
  });

  describe('LoadClientTokenFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAuthActions.LoadClientTokenFail(error);

      expect({ ...action }).toEqual({
        type: fromAuthActions.LOAD_CLIENT_TOKEN_FAIL,
        payload: error
      });
    });
  });

  describe('LoadClientTokenSuccess', () => {
    it('should create the action', () => {
      const action = new fromAuthActions.LoadClientTokenSuccess(clientToken);

      expect({ ...action }).toEqual({
        type: fromAuthActions.LOAD_CLIENT_TOKEN_SUCCESS,
        payload: clientToken
      });
    });
  });
});
