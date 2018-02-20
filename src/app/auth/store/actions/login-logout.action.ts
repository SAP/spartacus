import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: any) {}
}

// action types
export type LoginLogoutAction = Login | Logout;
