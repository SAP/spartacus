import { UserProfileActions } from './index';

describe('User misc action', () => {
  describe('ClearUserMiscData', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.ClearUserMiscData();
      expect({ ...action }).toEqual({
        type: UserProfileActions.CLEAR_USER_MISC_DATA,
      });
    });
  });
});
