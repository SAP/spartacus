import { ClientToken, UserToken } from '../models/token-types.model';

export const AUTH_FEATURE = 'auth';

export interface StateWithAuth {
  [AUTH_FEATURE]: AuthState;
}

export interface AuthState {
  userToken: UserTokenState;
  clientToken: ClientTokenState;
}

export interface ClientTokenState {
  token: ClientToken;
  loading: boolean;
  loaded: boolean;
}

export interface UserTokenState {
  token: UserToken;
}
