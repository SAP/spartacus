import { Action } from '@ngrx/store';
import { ErrorModel, HttpErrorModel } from '@spartacus/core';

export const LOAD_GIGYA_USER_TOKEN = '[Auth] Load Gigya User Token';
export const LOAD_GIGYA_USER_TOKEN_FAIL = '[Auth] Load Gigya User Token Fail';

interface LoadUserTokenPayload {
  UID: string;
  UIDSignature: string;
  signatureTimestamp: string;
  idToken: string;
  baseSite: string;
}

interface LoadUserTokenFailurePayload {
  error: ErrorModel | HttpErrorModel | any;
  initialActionPayload: LoadUserTokenPayload;
}

export class LoadGigyaUserTokenFail implements Action {
  readonly type = LOAD_GIGYA_USER_TOKEN_FAIL;
  constructor(public payload: LoadUserTokenFailurePayload) {}
}

export class LoadGigyaUserToken implements Action {
  readonly type = LOAD_GIGYA_USER_TOKEN;
  constructor(public payload: LoadUserTokenPayload) {}
}

export type GigyaUserTokenAction = LoadGigyaUserToken | LoadGigyaUserTokenFail;
