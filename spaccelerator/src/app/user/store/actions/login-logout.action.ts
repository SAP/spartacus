import { Action } from '@ngrx/store';

export const LOGIN = '[User] Login';
export const LOGOUT = '[User] Logout';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

// action types
export type LoginLogoutAction = Login | Logout;
