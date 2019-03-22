import * as fromAction from '../actions/reset-password.action';
import * as fromReducer from './reset-password.reducer';

describe('Reset Password Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as fromAction.ResetPasswordAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('RESET_PASSWORD_SUCCESS action', () => {
    it('should set resetPassword to true', () => {
      const { initialState } = fromReducer;
      const action = new fromAction.ResetPasswordSuccess();

      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(true);
    });
  });
});
