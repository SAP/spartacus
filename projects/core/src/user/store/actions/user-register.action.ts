import { Action } from '@ngrx/store';

import { UserRegisterFormData } from '../../model/user.model';

export const REGISTER_USER = '[User] Register User';
export const REGISTER_USER_FAIL = '[User] Register User Fail';
export const REGISTER_USER_SUCCESS = '[User] Register User Success';

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

// action types
export type UserRegisterAction =
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess;
