import { Action } from '@ngrx/store';
import { UserToken, ErrorModel, HttpErrorModel } from '@spartacus/core';

export const LOAD_GIGYA_USER_TOKEN = '[Auth] Load Gigya User Token';
export const LOAD_USER_TOKEN_FAIL = '[Auth] Load User Token Fail';
export const LOAD_USER_TOKEN_SUCCESS = '[Auth] Load User Token Success';

export interface LoadUserTokenSuccessPayload {
  token: UserToken;
  initActionPayload: any;
}

export class LoadUserTokenSuccess implements Action {
  readonly type = LOAD_USER_TOKEN_SUCCESS;
  constructor(public payload: LoadUserTokenSuccessPayload) {}
}

export class LoadUserTokenFail implements Action {
  readonly type = LOAD_USER_TOKEN_FAIL;
  constructor(public payload: ErrorModel | HttpErrorModel | any) {}
}

export class LoadGigyaUserToken implements Action {
  readonly type = LOAD_GIGYA_USER_TOKEN;
  constructor(
    public payload: {
      UID: string;
      UIDSignature: string;
      signatureTimestamp: string;
      idToken: string;
      baseSite: string;
    }
  ) {}
}

export type GigyaUserTokenAction =
  | LoadGigyaUserToken
  | LoadUserTokenFail
  | LoadUserTokenSuccess;
