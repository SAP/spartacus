import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { UPDATE_USER_PROFILE_PROCESS_ID } from '../user-profile.state';

export const UPDATE_USER_PROFILE = '[User] Update User Details';
export const UPDATE_USER_PROFILE_FAIL = '[User] Update User Details Fail';
export const UPDATE_USER_PROFILE_SUCCESS = '[User] Update User Details Success';
export const RESET_USER_PROFILE = '[User] Reset User Details';

export class UpdateUserProfile extends StateUtils.EntityLoadAction {
  readonly type = UPDATE_USER_PROFILE;
  constructor(public payload: { uid: string; details: User }) {
    super(PROCESS_FEATURE, UPDATE_USER_PROFILE_PROCESS_ID);
  }
}
export class UpdateUserProfileFail extends StateUtils.EntityFailAction {
  readonly type = UPDATE_USER_PROFILE_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UPDATE_USER_PROFILE_PROCESS_ID, payload);
  }
}

export class UpdateUserProfileSuccess extends StateUtils.EntitySuccessAction {
  readonly type = UPDATE_USER_PROFILE_SUCCESS;
  constructor(public userUpdates: User) {
    super(PROCESS_FEATURE, UPDATE_USER_PROFILE_PROCESS_ID);
  }
}

export class ResetUpdateUserProfile extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_USER_PROFILE;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_USER_PROFILE_PROCESS_ID);
  }
}
