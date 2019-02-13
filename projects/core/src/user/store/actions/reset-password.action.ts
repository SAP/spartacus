import { Action } from '@ngrx/store';

export const RESET_PASSWORD = '[User] Reset Password';
export const RESET_PASSWORD_SUCCESS = '[User] Reset Password Success';
export const RESET_PASSWORD_FAIL = '[User] Reset Password Fail';

export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;
  constructor(public payload: { token: string; password: string }) {}
}

export class ResetPasswordFail implements Action {
  readonly type = RESET_PASSWORD_FAIL;
  constructor(public payload: any) {}
}

export class ResetPasswordSuccess implements Action {
  readonly type = RESET_PASSWORD_SUCCESS;
  constructor(public payload: any) {}
}

export type ResetPasswordAction =
  | ResetPassword
  | ResetPasswordFail
  | ResetPasswordSuccess;
