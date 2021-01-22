import { Action } from '@ngrx/store';
import { User } from '../../model/user.model';

export const LOAD_USER_ACCOUNT = '[User] Load User Details';
export const LOAD_USER_ACCOUNT_FAIL = '[User] Load User Details Fail';
export const LOAD_USER_ACCOUNT_SUCCESS = '[User] Load User Details Success';

export class LoadUserAccount implements Action {
  readonly type = LOAD_USER_ACCOUNT;
  constructor(public payload: string) {}
}

export class LoadUserAccountFail implements Action {
  readonly type = LOAD_USER_ACCOUNT_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserAccountSuccess implements Action {
  readonly type = LOAD_USER_ACCOUNT_SUCCESS;
  constructor(public payload: User) {}
}

// action types
export type UserAccountAction =
  | LoadUserAccount
  | LoadUserAccountFail
  | LoadUserAccountSuccess;
