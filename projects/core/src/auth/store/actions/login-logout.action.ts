import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const REVOKE_TOKEN = '[Auth] Revoke token';
export const LOGOUT_CUSTOMER_SUPPORT_AGENT =
  '[Auth] Logout Customer Support Agent';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class RevokeToken implements Action {
  readonly type = REVOKE_TOKEN;
  constructor(public payload: UserToken) {}
}

export class LogoutCustomerSupportAgent implements Action {
  readonly type = LOGOUT_CUSTOMER_SUPPORT_AGENT;
}

// action types
export type LoginLogoutAction = Login | Logout | LogoutCustomerSupportAgent;
