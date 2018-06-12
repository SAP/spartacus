import { Action } from '@ngrx/store';
import { ClientAuthenticationToken } from '../../../user/models/token-types.model';

export const LOAD_CLIENT_AUTHENTICATION_TOKEN =
  '[Auth] Load Client Authentication Token';
export const LOAD_CLIENT_AUTHENTICATION_TOKEN_FAIL =
  '[Auth] Load Client Authentication Token Fail';
export const LOAD_CLIENT_AUTHENTICATION_TOKEN_SUCCESS =
  '[Auth] Load Client Authentication Token Success';

export class LoadClientAuthenticationToken implements Action {
  readonly type = LOAD_CLIENT_AUTHENTICATION_TOKEN;
  constructor() {}
}

export class LoadClientAuthenticationTokenFail implements Action {
  readonly type = LOAD_CLIENT_AUTHENTICATION_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadClientAuthenticationTokenSuccess implements Action {
  readonly type = LOAD_CLIENT_AUTHENTICATION_TOKEN_SUCCESS;
  constructor(public payload: ClientAuthenticationToken) {}
}

// action types
export type ClientAuthenticationTokenAction =
  | LoadClientAuthenticationToken
  | LoadClientAuthenticationTokenFail
  | LoadClientAuthenticationTokenSuccess;
