import { UserActions } from './index';

describe('User misc action', () => {
  describe('ClearUserMiscData', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearUserMiscData();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_USER_MISC_DATA,
      });
    });
  });
});
