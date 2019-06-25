import { Action } from '@ngrx/store';
import { User } from '../../../model/misc.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntityResetAction,
  EntitySuccessAction,
} from '../../../state';
import { UPDATE_USER_DETAILS_PROCESS_ID } from '../user-state';

export const LOAD_USER_DETAILS = '[User] Load User Details';
export const LOAD_USER_DETAILS_FAIL = '[User] Load User Details Fail';
export const LOAD_USER_DETAILS_SUCCESS = '[User] Load User Details Success';

export const UPDATE_USER_DETAILS = '[User] Update User Details';
export const UPDATE_USER_DETAILS_FAIL = '[User] Update User Details Fail';
export const UPDATE_USER_DETAILS_SUCCESS = '[User] Update User Details Success';
export const RESET_USER_DETAILS = '[User] Reset User Details';

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
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}

export class UpdateUserDetailsFail extends EntityFailAction {
  readonly type = UPDATE_USER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID, payload);
  }
}

export class UpdateUserDetailsSuccess extends EntitySuccessAction {
  readonly type = UPDATE_USER_DETAILS_SUCCESS;
  constructor(public userUpdates: User) {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}

export class ResetUpdateUserDetails extends EntityResetAction {
  readonly type = RESET_USER_DETAILS;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}

// action types
export type UserDetailsAction =
  | LoadUserDetails
  | LoadUserDetailsFail
  | LoadUserDetailsSuccess
  | UpdateUserDetails
  | UpdateUserDetailsFail
  | UpdateUserDetailsSuccess
  | ResetUpdateUserDetails;
