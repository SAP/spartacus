import { LoaderState } from '../../state/utils/loader/loader-state';
import {
  ClientToken,
  OpenIdToken,
  UserToken,
} from '../models/token-types.model';

export const AUTH_FEATURE = 'auth';
export const CLIENT_TOKEN_DATA = '[Auth] Client Token Data';
export const OPEN_ID_TOKEN_DATA = '[Auth] Open ID Token Data';

export interface StateWithAuth {
  [AUTH_FEATURE]: AuthState;
}

export interface AuthState {
  userToken: UserTokenState;
  clientToken: LoaderState<ClientToken>;
  openIdToken: LoaderState<OpenIdToken>;
}

export interface UserTokenState {
  token: UserToken;
}
