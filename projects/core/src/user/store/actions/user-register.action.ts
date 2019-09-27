import { Action } from '@ngrx/store';
import { UserSignUp } from '../../../model/misc.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import {
  REGISTER_USER_PROCESS_ID,
  REMOVE_USER_PROCESS_ID,
} from '../user-state';

export const REGISTER_USER = '[User] Register User';
export const REGISTER_USER_FAIL = '[User] Register User Fail';
export const REGISTER_USER_SUCCESS = '[User] Register User Success';
export const RESET_REGISTER_USER_PROCESS = '[User] Reset Register User Process';

export const REGISTER_GUEST = '[User] Register Guest';
export const REGISTER_GUEST_FAIL = '[User] Register Guest Fail';
export const REGISTER_GUEST_SUCCESS = '[User] Register Guest Success';

export const REMOVE_USER = '[User] Remove User';
export const REMOVE_USER_FAIL = '[User] Remove User Fail';
export const REMOVE_USER_SUCCESS = '[User] Remove User Success';
export const REMOVE_USER_RESET = '[User] Reset Remove User Process State';

export class RegisterUser extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = REGISTER_USER;
  constructor(public payload: UserSignUp) {
    super(PROCESS_FEATURE, REGISTER_USER_PROCESS_ID);
  }
}

export class RegisterUserFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = REGISTER_USER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, REGISTER_USER_PROCESS_ID, payload);
  }
}

export class RegisterUserSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = REGISTER_USER_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, REGISTER_USER_PROCESS_ID);
  }
}

export class ResetRegisterUserProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_REGISTER_USER_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, REGISTER_USER_PROCESS_ID);
  }
}

export class RegisterGuest implements Action {
  readonly type = REGISTER_GUEST;
  constructor(public payload: { guid: string; password: string }) {}
}

export class RegisterGuestFail implements Action {
  readonly type = REGISTER_GUEST_FAIL;
  constructor(public payload: any) {}
}

export class RegisterGuestSuccess implements Action {
  readonly type = REGISTER_GUEST_SUCCESS;
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
  | ResetRegisterUserProcess
  | RegisterGuest
  | RegisterGuestFail
  | RegisterGuestSuccess
  | RemoveUser
  | RemoveUserFail
  | RemoveUserSuccess
  | RemoveUserReset;
