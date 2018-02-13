import { Action } from '@ngrx/store';

export const LOAD_USER = '[User] Load User Data';
export const LOAD_USER_FAIL = '[User] Load User Data Fail';
export const LOAD_USER_SUCCESS = '[User] Load User Data Success';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
  constructor(public payload: string) { }
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;
  constructor(public payload: any) { }
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: any) { }
}

// action types
export type UserAction = LoadUser | LoadUserFail | LoadUserSuccess;
