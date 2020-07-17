import { Action } from '@ngrx/store';

export const SET_USER_TOKEN_DATA = '[Auth] Set User Token Data';

export class SetUserTokenData implements Action {
  readonly type = SET_USER_TOKEN_DATA;
  constructor(public payload: any) {}
}

// action types
export type UserTokenAction = SetUserTokenData;
