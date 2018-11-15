import { Action } from '@ngrx/store';
import { ClientToken } from '../../models/token-types.model';

export const LOAD_CLIENT_TOKEN = '[Token] Create Client Token';
export const LOAD_CLIENT_TOKEN_FAIL = '[Token] Create Client Token Fail';
export const LOAD_CLIENT_TOKEN_SUCCESS = '[Token] Create Client Token Success';

export class LoadClientToken implements Action {
  readonly type = LOAD_CLIENT_TOKEN;
  constructor() {}
}

export class LoadClientTokenFail implements Action {
  readonly type = LOAD_CLIENT_TOKEN_FAIL;
  constructor(public payload: any) {}
}

export class LoadClientTokenSuccess implements Action {
  readonly type = LOAD_CLIENT_TOKEN_SUCCESS;
  constructor(public payload: ClientToken) {}
}

export type ClientTokenAction =
  | LoadClientToken
  | LoadClientTokenFail
  | LoadClientTokenSuccess;
