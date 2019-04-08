import { Action } from '@ngrx/store';

import { UserRegisterFormData } from '../../model/user.model';

export const REGISTER_USER = '[User] Register User';
export const REGISTER_USER_FAIL = '[User] Register User Fail';
export const REGISTER_USER_SUCCESS = '[User] Register User Success';

export const REMOVE_USER = '[User] Remove User';
export const REMOVE_USER_FAIL = '[User] Remove User Fail';
export const REMOVE_USER_SUCCESS = '[User] Remove User Success';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: UserRegisterFormData) {}
}

export class RegisterUserFail implements Action {
  readonly type = REGISTER_USER_FAIL;
  constructor(public payload: any) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor() {}
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
  constructor(public payload: string) {}
}

export class RemoveUserFail implements Action {
  readonly type = REMOVE_USER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveUserSuccess implements Action {
  readonly type = REMOVE_USER_SUCCESS;
  constructor() {}
}

// action types
export type UserRegisterOrRemoveAction =
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess
  | RemoveUser
  | RemoveUserFail
  | RemoveUserSuccess;
