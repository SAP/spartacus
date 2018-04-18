import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOAD_USER_TOKEN = '[User] Load User Token';
export const LOAD_USER_TOKEN_FAIL = '[User] Load User Token Fail';
export const LOAD_USER_TOKEN_SUCCESS = '[User] Load User Token Success';

export class LoadUserToken implements Action {
  readonly type = LOAD_USER_TOKEN;
  constructor(public payload: { userId: string; password: string }) {}
}

export class LoadUserTokenFail implements Action {
  readonly type = LOAD_USER_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserTokenSuccess implements Action {
  readonly type = LOAD_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {}
}

// action types
export type UserTokenAction =
  | LoadUserToken
  | LoadUserTokenFail
  | LoadUserTokenSuccess;
