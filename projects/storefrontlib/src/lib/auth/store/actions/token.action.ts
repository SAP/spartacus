import { Action } from '@ngrx/store';

export const GET_TOKEN = '[Token] Create Token';
export const GET_TOKEN_FAIL = '[Token] Create Token Fail';
export const GET_TOKEN_SUCCESS = '[Token] Create Token Success';

export class GetToken implements Action {
  readonly type = GET_TOKEN;
  constructor(public payload: any) {}
}

export class GetTokenFail implements Action {
  readonly type = GET_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class GetTokenSuccess implements Action {
  readonly type = GET_TOKEN_SUCCESS;
  constructor(public payload: any) {}
}

export type TokenAction = GetToken | GetTokenFail | GetTokenSuccess;
