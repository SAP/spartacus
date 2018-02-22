import { Action } from '@ngrx/store';
import { PageContext } from '../../../routing/models/page-context.model';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: PageContext) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: PageContext) {}
}

// action types
export type LoginLogoutAction = Login | Logout;
