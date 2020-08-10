import { Action } from '@ngrx/store';
import { ErrorModel, HttpErrorModel } from '@spartacus/core';

export const LOAD_CDC_USER_TOKEN = '[Auth] Load CDC User Token';
export const LOAD_CDC_USER_TOKEN_FAIL = '[Auth] Load CDC User Token Fail';

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

export class LoadCdcUserTokenFail implements Action {
  readonly type = LOAD_CDC_USER_TOKEN_FAIL;
  constructor(public payload: LoadUserTokenFailurePayload) {}
}

export class LoadCdcUserToken implements Action {
  readonly type = LOAD_CDC_USER_TOKEN;
  constructor(public payload: LoadUserTokenPayload) {}
}

export type CdcUserTokenAction = LoadCdcUserToken | LoadCdcUserTokenFail;
