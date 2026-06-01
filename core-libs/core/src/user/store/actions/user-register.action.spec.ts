import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { REGISTER_USER_PROCESS_ID } from '../user-state';
import { UserActions } from './index';

describe('User Register Actions', () => {
  describe('RegisterUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });
});
