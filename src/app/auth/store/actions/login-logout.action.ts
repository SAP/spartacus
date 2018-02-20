import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

// Not sure if we need this action. We already have LoadUserDetails and
// LoadUserToken for login
export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}

// action types
export type LoginLogoutAction = Login | Logout;
