import { Action } from '@ngrx/store';

import { USER_UPDATE_DETAILS } from '../user-state';
import {
  EntityLoadAction,
  EntityFailAction,
  EntitySuccessAction
} from '../../../state';
import { User } from '../../../occ/occ-models/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

export const LOAD_USER_DETAILS = '[User] Load User Details';
export const LOAD_USER_DETAILS_FAIL = '[User] Load User Details Fail';
export const LOAD_USER_DETAILS_SUCCESS = '[User] Load User Details Success';

export const UPDATE_USER_DETAILS = '[User] Update User Details';
export const UPDATE_USER_DETAILS_FAIL = '[User] Update User Details Fail';
export const UPDATE_USER_DETAILS_SUCCESS = '[User] Update User Details Success';

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

export class UpdateUserDetails extends EntityLoadAction {
  readonly type = UPDATE_USER_DETAILS;
  constructor(public payload: { username: string; userDetails: User }) {
    super(PROCESS_FEATURE, USER_UPDATE_DETAILS);
  }
}

export class UpdateUserDetailsFail extends EntityFailAction {
  readonly type = UPDATE_USER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, USER_UPDATE_DETAILS, payload);
  }
}

export class UpdateUserDetailsSuccess extends EntitySuccessAction {
  readonly type = UPDATE_USER_DETAILS_SUCCESS;
  constructor(public userUpdates: User) {
    super(PROCESS_FEATURE, USER_UPDATE_DETAILS);
  }
}

// action types
export type UserDetailsAction =
  | LoadUserDetails
  | LoadUserDetailsFail
  | LoadUserDetailsSuccess
  | UpdateUserDetails
  | UpdateUserDetailsFail
  | UpdateUserDetailsSuccess;
