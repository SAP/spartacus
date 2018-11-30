import { Action } from '@ngrx/store';
import { User } from '../../../occ-models';

export const LOAD_USER_DETAILS = '[User] Load User Details';
export const LOAD_USER_DETAILS_FAIL = '[User] Load User Details Fail';
export const LOAD_USER_DETAILS_SUCCESS = '[User] Load User Details Success';

export class LoadUserDetails implements Action {
  readonly type = LOAD_USER_DETAILS;
  constructor(public payload: string) {}
}

export class LoadUserDetailsFail implements Action {
  readonly type = LOAD_USER_DETAILS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserDetailsSuccess implements Action {
  readonly type = LOAD_USER_DETAILS_SUCCESS;
  constructor(public payload: User) {}
}

// action types
export type UserDetailsAction =
  | LoadUserDetails
  | LoadUserDetailsFail
  | LoadUserDetailsSuccess;
