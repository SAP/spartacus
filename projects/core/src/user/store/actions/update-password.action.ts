import { PROCESSID_UPDATE_PASSWORD } from '../user-state';
import {
  EntityFailAction,
  EntityLoadAction,
  EntitySuccessAction,
} from '../../../state';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

export const UPDATE_PASSWORD = '[User] Update Password';
export const UPDATE_PASSWORD_FAIL = '[User] Update Password Fail';
export const UPDATE_PASSWORD_SUCCESS = '[User] Update Password Success';

export class UpdatePassword extends EntityLoadAction {
  readonly type = UPDATE_PASSWORD;
  constructor(
    public payload: { userId: string; oldPassword: string; newPassword: string }
  ) {
    super(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD);
  }
}

export class UpdatePasswordFail extends EntityFailAction {
  readonly type = UPDATE_PASSWORD_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD, payload);
  }
}

export class UpdatePasswordSuccess extends EntitySuccessAction {
  readonly type = UPDATE_PASSWORD_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, PROCESSID_UPDATE_PASSWORD);
  }
}

// action types
export type UpdatePasswordAction =
  | UpdatePassword
  | UpdatePasswordFail
  | UpdatePasswordSuccess;
