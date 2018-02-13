import * as fromUserAction from './user.action';

const mockUser = {
  name: 'mockName',
  password: 'mockPassword'
};

fdescribe('User Actions', () => {
  describe('LoadUser Actions', () => {
    it('should create the action', () => {
      const action = new fromUserAction.LoadUser(mockUser.name);

      expect({ ...action }).toEqual({
        type: fromUserAction.LOAD_USER,
        payload: mockUser.name
      });
    });
  });

  describe('LoadUserFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserAction.LoadUserFail(error);

      expect({ ...action }).toEqual({
        type: fromUserAction.LOAD_USER_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserAction.LoadUserSuccess(mockUser);

      expect({ ...action }).toEqual({
        type: fromUserAction.LOAD_USER_SUCCESS,
        payload: mockUser
      });
    });
  });
});