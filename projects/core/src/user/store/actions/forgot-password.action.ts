import { Action } from '@ngrx/store';

export const FORGOT_PASSWORD_EMAIL_REQUEST =
  '[User] Forgot Password Email Request';
export const FORGOT_PASSWORD_EMAIL_REQUEST_SUCCESS =
  '[User] Forgot Password Email Request Success';
export const FORGOT_PASSWORD_EMAIL_REQUEST_FAIL =
  '[User] Forgot Password Email Request Fail';

export class ForgotPasswordEmailRequest implements Action {
  readonly type = FORGOT_PASSWORD_EMAIL_REQUEST;
  constructor(public payload: string) {}
}

export class ForgotPasswordEmailRequestFail implements Action {
  readonly type = FORGOT_PASSWORD_EMAIL_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class ForgotPasswordEmailRequestSuccess implements Action {
  readonly type = FORGOT_PASSWORD_EMAIL_REQUEST_SUCCESS;
}

export type ForgotPasswordEmailRequestAction =
  | ForgotPasswordEmailRequest
  | ForgotPasswordEmailRequestFail
  | ForgotPasswordEmailRequestSuccess;
