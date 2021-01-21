import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { User } from '@spartacus/user/details/core';
import { UPDATE_USER_DETAILS_PROCESS_ID } from '../user-profile.state';

export const UPDATE_USER_DETAILS = '[User] Update User Details';
export const UPDATE_USER_DETAILS_FAIL = '[User] Update User Details Fail';
export const UPDATE_USER_DETAILS_SUCCESS = '[User] Update User Details Success';
export const RESET_USER_DETAILS = '[User] Reset User Details';

export class UpdateUserDetails extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_USER_DETAILS;
  constructor(public payload: { username: string; userDetails: User }) {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}

export class UpdateUserDetailsFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_USER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID, payload);
  }
}

export class UpdateUserDetailsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_USER_DETAILS_SUCCESS;
  constructor(public userUpdates: User) {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}

export class ResetUpdateUserDetails extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_USER_DETAILS;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID);
  }
}
