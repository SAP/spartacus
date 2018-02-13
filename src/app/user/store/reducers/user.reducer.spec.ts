import * as fromUserReducer from './user.reducer';
import * as fromUserAction from '../actions/user.action';

fdescribe('User Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserReducer;
      const action = {} as any;
      const state = fromUserReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_SUCCESS action', () => {
    it('should populate the user state entities', () => {
      const mockUser = {
        name: 'mockName',
        password: 'mockPassword'
      };

      const entities = {
        user: mockUser
      };

      const { initialState } = fromUserReducer;
      const action = new fromUserAction.LoadUserSuccess(mockUser);
      const state = fromUserReducer.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_USER_FAIL action', () => {
    it('should populate empty user state entities', () => {
      const { initialState } = fromUserReducer;

      const entities = {
        user: {}
      };

      const action = new fromUserAction.LoadUserFail({});
      const state = fromUserReducer.reducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });
});
