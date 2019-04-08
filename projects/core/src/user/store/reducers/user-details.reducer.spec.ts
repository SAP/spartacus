import { User } from '../../../occ/occ-models/index';
import * as fromUpdateEmailAction from '../actions/update-email.action';
import * as fromUserDetailsAction from '../actions/user-details.action';
import * as fromUserDetailsReducer from './user-details.reducer';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

describe('User Details Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserDetailsReducer;
      const action = {} as fromUserDetailsAction.UserDetailsAction;
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

      expect(state).toEqual(mockUserDetails);
    });
  });

  describe('UPDATE_EMAIL_SUCCESS', () => {
    it('should update the existing userId/email ', () => {
      const testEmail = 'tester@sap.com';

      const action = new fromUpdateEmailAction.UpdateEmailSuccessAction(
        testEmail
      );

      const state = fromUserDetailsReducer.reducer(mockUserDetails, action);
      expect(state).toEqual({
        ...mockUserDetails,
        displayUid: testEmail,
        uid: testEmail,
      });
    });
  });
});
