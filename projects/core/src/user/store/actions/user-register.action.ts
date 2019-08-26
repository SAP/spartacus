import { Action } from '@ngrx/store';
import { UserSignUp } from '../../../model/misc.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { REMOVE_USER_PROCESS_ID } from '../user-state';

export const REGISTER_USER = '[User] Register User';
export const REGISTER_USER_FAIL = '[User] Register User Fail';
export const REGISTER_USER_SUCCESS = '[User] Register User Success';

export const REMOVE_USER = '[User] Remove User';
export const REMOVE_USER_FAIL = '[User] Remove User Fail';
export const REMOVE_USER_SUCCESS = '[User] Remove User Success';
export const REMOVE_USER_RESET = '[User] Reset Remove User Process State';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: UserSignUp) {}
}

export class RegisterUserFail implements Action {
  readonly type = REGISTER_USER_FAIL;
  constructor(public payload: any) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  constructor() {}
}

export class RemoveUser extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = REMOVE_USER;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID);
  }
}

export class RemoveUserFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = REMOVE_USER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID, payload);
  }
}

export class RemoveUserSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = REMOVE_USER_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID);
  }
}

export class RemoveUserReset extends StateEntityLoaderActions.EntityResetAction {
  readonly type = REMOVE_USER_RESET;
  constructor() {
    super(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID);
  }
}

// action types
export type UserRegisterOrRemoveAction =
  | RegisterUser
  | RegisterUserFail
  | RegisterUserSuccess
  | RemoveUser
  | RemoveUserFail
  | RemoveUserSuccess
  | RemoveUserReset;
