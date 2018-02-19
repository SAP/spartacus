import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOAD_USER_TOKEN = '[Auth] Load User Token';
export const LOAD_USER_TOKEN_FAIL = '[Auth] Load User Token Fail';
export const LOAD_USER_TOKEN_SUCCESS = '[Auth] Load User Token Success';
export const CLEAR_USER_TOKEN = '[Auth] Clear User Token';

export class LoadUserToken implements Action {
  readonly type = LOAD_USER_TOKEN;
  constructor(public payload: { username: string; password: string }) {}
}

export class LoadUserTokenFail implements Action {
  readonly type = LOAD_USER_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserTokenSuccess implements Action {
  readonly type = LOAD_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {}
}

export class ClearUserToken implements Action {
  readonly type = CLEAR_USER_TOKEN;
  constructor(public payload: any) {}
}

// action types
export type UserTokenAction =
  | LoadUserToken
  | LoadUserTokenFail
  | LoadUserTokenSuccess
  | ClearUserToken;
