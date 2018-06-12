import * as fromClientToken from './client-authentication-token.reducer';
import * as fromActions from '../actions';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

describe('ClientAuthenticationToken reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromClientToken;
      const action = {} as any;
      const state = fromClientToken.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CLIENT_AUTHENTICATION_TOKEN_SUCCESS action', () => {
    it('should store a client authentication token', () => {
      const testToken: ClientAuthenticationToken = {
        access_token: 'abc-123',
        token_type: 'bearer',
        expires_in: 10000,
        scope: ''
      };
      const { initialState } = fromClientToken;

      const action = new fromActions.LoadClientAuthenticationTokenSuccess(
        testToken
      );
      const state = fromClientToken.reducer(initialState, action);

      expect(state.token).toEqual(testToken);
    });
  });
});
