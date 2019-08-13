import { Action } from '@ngrx/store';

export const SET_TOKEN = '[Captcha] Set Token';

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type CaptchaAction = SetToken;
