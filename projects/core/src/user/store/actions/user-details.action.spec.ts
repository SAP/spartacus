import { User } from '../../../occ/occ-models/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
} from '../../../state';
import { UPDATE_USER_DETAILS_PROCESS_ID } from '../user-state';
import * as fromUserDetailsAction from './user-details.action';

const mockUserDetails: User = {
  displayUid: 'Display Uid',
  firstName: 'First',
  lastName: 'Last',
  name: 'First Last',
  uid: 'UID',
};

describe('User Details Actions', () => {
  describe('LoadUserDetails Actions', () => {
    it('should create the action', () => {
      const action = new fromUserDetailsAction.LoadUserDetails(
        mockUserDetails.name
      );

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS,
        payload: mockUserDetails.name,
      });
    });
  });

  describe('LoadUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserDetailsAction.LoadUserDetailsFail(error);

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserDetailsAction.LoadUserDetailsSuccess(
        mockUserDetails
      );

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.LOAD_USER_DETAILS_SUCCESS,
        payload: mockUserDetails,
      });
    });
  });

  describe('UpdateUserDetails Action', () => {
    it('should create the action', () => {
      const username = 'xxx';
      const userDetails: User = {
        title: 'mr',
      };
      const action = new fromUserDetailsAction.UpdateUserDetails({
        username,
        userDetails,
      });

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.UPDATE_USER_DETAILS,
        payload: { username, userDetails },
        meta: entityLoadMeta(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID),
      });
    });
  });

  describe('UpdateUserDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'error';
      const action = new fromUserDetailsAction.UpdateUserDetailsFail(error);

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.UPDATE_USER_DETAILS_FAIL,
        payload: error,
        meta: entityFailMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('UpdateUserDetailsSuccess Action', () => {
    it('should create the action', () => {
      const userUpdates: User = {
        title: 'mr',
      };
      const action = new fromUserDetailsAction.UpdateUserDetailsSuccess(
        userUpdates
      );

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.UPDATE_USER_DETAILS_SUCCESS,
        userUpdates,
        meta: entitySuccessMeta(
          PROCESS_FEATURE,
          UPDATE_USER_DETAILS_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('ResetUpdateUserDetails Action', () => {
    it('should create the action', () => {
      const action = new fromUserDetailsAction.ResetUpdateUserDetails();

      expect({ ...action }).toEqual({
        type: fromUserDetailsAction.RESET_USER_DETAILS,
        meta: entityResetMeta(PROCESS_FEATURE, UPDATE_USER_DETAILS_PROCESS_ID),
      });
    });
  });
});
