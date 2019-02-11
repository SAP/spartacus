import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const GO_BY_URL = '[Router] Go By Url';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const SAVE_REDIRECT_URL = '[Router] Save Redirect Url';
export const CLEAR_REDIRECT_URL = '[Router] Clear Redirect Url';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class GoByUrl implements Action {
  readonly type = GO_BY_URL;
  constructor(
    public payload: string
  ) {}
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export class SaveRedirectUrl implements Action {
  readonly type = SAVE_REDIRECT_URL;
  constructor(public payload: string) {}
}

export class ClearRedirectUrl implements Action {
  readonly type = CLEAR_REDIRECT_URL;
}

export type Actions = Go | GoByUrl | Back | Forward | SaveRedirectUrl | ClearRedirectUrl;
