import * as fromAuthActions from './';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';
import { CLIENT_TOKEN_DATA } from '../auth-state';
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
        type: fromAuthActions.LOAD_CLIENT_TOKEN,
        meta: loadMeta(CLIENT_TOKEN_DATA)
      });
    });
  });

  describe('LoadClientTokenFail', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromAuthActions.LoadClientTokenFail(error);
      expect({ ...action }).toEqual({
        type: fromAuthActions.LOAD_CLIENT_TOKEN_FAIL,
        payload: error,
        meta: failMeta(CLIENT_TOKEN_DATA, error)
      });
    });
  });

  describe('LoadClientTokenSuccess', () => {
    it('should create the action', () => {
      const action = new fromAuthActions.LoadClientTokenSuccess(clientToken);

      expect({ ...action }).toEqual({
        type: fromAuthActions.LOAD_CLIENT_TOKEN_SUCCESS,
        payload: clientToken,
        meta: successMeta(CLIENT_TOKEN_DATA)
      });
    });
  });
});
