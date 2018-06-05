import { Action } from '@ngrx/store';
import { TrustedClientToken } from '../../../user/models/token-types.model';

export const LOAD_TRUSTED_CLIENT_TOKEN = '[Auth] Load Trusted Client Token';
export const LOAD_TRUSTED_CLIENT_TOKEN_FAIL =
  '[Auth] Load Trusted Client Token Fail';
export const LOAD_TRUSTED_CLIENT_TOKEN_SUCCESS =
  '[Auth] Load Trusted Client Token Success';

export class LoadTrustedClientToken implements Action {
  readonly type = LOAD_TRUSTED_CLIENT_TOKEN;
  constructor() {}
}

export class LoadTrustedClientTokenFail implements Action {
  readonly type = LOAD_TRUSTED_CLIENT_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadTrustedClientTokenSuccess implements Action {
  readonly type = LOAD_TRUSTED_CLIENT_TOKEN_SUCCESS;
  constructor(public payload: TrustedClientToken) {}
}

// action types
export type TrustedClientTokenAction =
  | LoadTrustedClientToken
  | LoadTrustedClientTokenFail
  | LoadTrustedClientTokenSuccess;
