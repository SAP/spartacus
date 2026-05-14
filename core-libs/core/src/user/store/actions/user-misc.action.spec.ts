import { UserActions } from './index';

describe('User misc action', () => {
  describe('ClearUserMiscsData', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearUserMiscsData();
      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_USER_MISCS_DATA,
      });
    });
  });
});
