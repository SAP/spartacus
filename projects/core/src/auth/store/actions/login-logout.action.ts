import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGOUT_CUSTOMER_SUPPORT_AGENT =
  '[Auth] Logout Customer Support Agent';
export const REVOKE_TOKEN = '[Auth] Revoke token';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

// action types
export type LoginLogoutAction = Login | Logout;

export class RevokeUserToken implements Action {
  readonly type = REVOKE_TOKEN;
  constructor(public payload: UserToken) {}
}
