import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsReducer from './user-details.reducer';

const mockUserDetails: any = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  type: 'Mock Type',
  uid: 'UID'
};

fdescribe('User Details Reducer', () => {
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
      const { initialState } = fromUserDetailsReducer;
      const action = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );
      const state = fromUserDetailsReducer.reducer(initialState, action);

      expect(state.details).toEqual(mockUserDetails);
    });

    describe('CLEAR_USER_DETAILS action', () => {
      it('should return an empty token', () => {
        const { initialState } = fromUserDetailsReducer;

        const action = new fromUserDetailsAction.ClearUserDetails(
          mockUserDetails
        );
        const state = fromUserDetailsReducer.reducer(initialState, action);
        expect(state.details).toEqual({});
      });
    });
  });
});
