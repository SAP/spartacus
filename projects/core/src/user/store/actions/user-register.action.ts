import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { REGISTER_USER_PROCESS_ID } from '../user-state';

export const REGISTER_USER_SUCCESS = '[User] Register User Success';

/**
 * @deprecated since 3.2, moved to `@spartacus/user/profile/core`
 */
export class RegisterUserSuccess extends StateUtils.EntitySuccessAction {
  readonly type = REGISTER_USER_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, REGISTER_USER_PROCESS_ID);
  }
}

// action types
export type UserRegisterOrRemoveAction = RegisterUserSuccess;
