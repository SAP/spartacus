import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsReducer from './user-details.reducer';

describe('User Details Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserDetailsReducer;
      const action = {} as any;
      const state = fromUserDetailsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_DETAILS_SUCCESS action', () => {
    it('should populate the user details state entities', () => {
      const mockUserDetails: any = {
        displayUid: 'Display Uid',
        firstName: 'First',
        lastName: 'Last',
        name: 'First Last',
        type: 'Mock Type',
        uid: 'UID'
      };

      const { initialState } = fromUserDetailsReducer;
      const action = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );
      const state = fromUserDetailsReducer.reducer(initialState, action);

      expect(state.details).toEqual(mockUserDetails);
    });
  });
});
