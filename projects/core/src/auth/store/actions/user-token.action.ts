import { Action } from '@ngrx/store';
import { UserToken } from '../../models/token-types.model';

export const LOAD_USER_TOKEN = '[Auth] Load User Token';
export const LOAD_USER_TOKEN_FAIL = '[Auth] Load User Token Fail';
export const LOAD_USER_TOKEN_SUCCESS = '[Auth] Load User Token Success';
export const REFRESH_USER_TOKEN = '[Auth] Refresh User Token';
export const REFRESH_USER_TOKEN_FAIL = '[Auth] Refresh User Token Fail';
export const REFRESH_USER_TOKEN_SUCCESS = '[Auth] Refresh User Token Success';
export const REVOKE_USER_TOKEN = '[Auth] Revoke User Token';
export const REVOKE_USER_TOKEN_FAIL = '[Auth] Revoke User Token Fail';
export const REVOKE_USER_TOKEN_SUCCESS = '[Auth] Revoke User Token Success';
export const CLEAR_USER_TOKEN = '[Auth] Clear User Token';

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

export class RefreshUserToken implements Action {
  readonly type = REFRESH_USER_TOKEN;
  constructor(public payload: { refreshToken: string }) {}
}

export class RefreshUserTokenSuccess implements Action {
  readonly type = REFRESH_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {}
}

export class RefreshUserTokenFail implements Action {
  readonly type = REFRESH_USER_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class RevokeUserToken implements Action {
  readonly type = REVOKE_USER_TOKEN;
  constructor(public payload: UserToken) {}
}

export class RevokeUserTokenSuccess implements Action {
  readonly type = REVOKE_USER_TOKEN_SUCCESS;
  constructor(public payload: UserToken) {}
}

export class RevokeUserTokenFail implements Action {
  readonly type = REVOKE_USER_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class ClearUserToken implements Action {
  readonly type = CLEAR_USER_TOKEN;
  constructor() {}
}

// action types
export type UserTokenAction =
  | LoadUserToken
  | LoadUserTokenFail
  | LoadUserTokenSuccess
  | RefreshUserToken
  | RefreshUserTokenFail
  | RefreshUserTokenSuccess
  | RevokeUserToken
  | RevokeUserTokenFail
  | RevokeUserTokenSuccess
  | ClearUserToken;
