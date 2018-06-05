import * as fromTrustedClientToken from './trusted-client-token.reducer';
import * as fromActions from '../actions';
import { TrustedClientToken } from '../../../user/models/token-types.model';

describe('TrustedClientToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromTrustedClientToken;
      const action = {} as any;
      const state = fromTrustedClientToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_TRUSTED_CLIENT_TOKEN_SUCCESS action', () => {
    it('should store a trusted client token', () => {
      const testToken: TrustedClientToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 10000,
        scope: ''
      };
      const { initialState } = fromTrustedClientToken;

      const action = new fromActions.LoadTrustedClientTokenSuccess(testToken);
      const state = fromTrustedClientToken.reducer(initialState, action);

      expect(state.token).toEqual(testToken);
    });
  });
});
