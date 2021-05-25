import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

// action types
export type LoginLogoutAction = Login | Logout;
