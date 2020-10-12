import { LoaderState } from '../../state/utils/loader/loader-state';
import { ClientToken } from '../models/token-types.model';

export const AUTH_FEATURE = 'auth';
export const CLIENT_TOKEN_DATA = '[Auth] Client Token Data';

export interface StateWithAuth {
  [AUTH_FEATURE]: AuthState;
}

export interface AuthState {
  clientToken: LoaderState<ClientToken>;
}
