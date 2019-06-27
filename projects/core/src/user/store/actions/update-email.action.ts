import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { UPDATE_EMAIL_PROCESS_ID } from '../user-state';

export const UPDATE_EMAIL = '[User] Update Email';
export const UPDATE_EMAIL_ERROR = '[User] Update Email Error';
export const UPDATE_EMAIL_SUCCESS = '[User] Update Email Success';
export const RESET_EMAIL = '[User] Reset Email';

export class UpdateEmailAction extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = UPDATE_EMAIL;
  constructor(
    public payload: {
      uid: string;
      password: string;
      newUid: string;
    }
  ) {
    super(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID);
  }
}

export class UpdateEmailSuccessAction extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = UPDATE_EMAIL_SUCCESS;
  constructor(public newUid: string) {
    super(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID);
  }
}

export class UpdateEmailErrorAction extends StateEntityLoaderActions.EntityFailAction {
  readonly type = UPDATE_EMAIL_ERROR;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID, payload);
  }
}

export class ResetUpdateEmailAction extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_EMAIL;
  constructor() {
    super(PROCESS_FEATURE, UPDATE_EMAIL_PROCESS_ID);
  }
}

export type EmailActions =
  | UpdateEmailAction
  | UpdateEmailSuccessAction
  | UpdateEmailErrorAction
  | ResetUpdateEmailAction;
