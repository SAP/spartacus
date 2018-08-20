import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const SAVE_REDIRECT_URL = '[Router] Save Redirect Url';
export const CLEAR_REDIRECT_URL = '[Router] Clear Redirect Url';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
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

export type Actions = Go | Back | Forward | SaveRedirectUrl | ClearRedirectUrl;
