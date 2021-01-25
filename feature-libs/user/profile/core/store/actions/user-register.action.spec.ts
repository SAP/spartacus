import { PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import { UserSignUp } from '../../model/user-profile.model';
import {
  CLOSE_USER_PROCESS_ID,
  REGISTER_USER_PROCESS_ID,
} from '../user-profile.state';
import { UserProfileActions } from './index';

const user: UserSignUp = {
  titleCode: '',
  firstName: '',
  lastName: '',
  password: '',
  uid: '',
};

describe('User Register Actions', () => {
  describe('RegisterUser Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RegisterUser(user);

      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_USER,
        payload: user,
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID
        ),
      });
    });
  });

  describe('RegisterUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserProfileActions.RegisterUserFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_USER_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('RegisterUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_USER_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });
});

describe('Guest Register Actions', () => {
  describe('RegisterGuest Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      });
      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_GUEST,
        payload: { guid: 'guid', password: 'password' },
      });
    });
  });

  describe('RegisterGuestFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserProfileActions.RegisterGuestFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_GUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('RegisterGuestSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RegisterGuestSuccess();

      expect({ ...action }).toEqual({
        type: UserProfileActions.REGISTER_GUEST_SUCCESS,
      });
    });
  });
});

describe('Remove User Actions', () => {
  describe('RemoveUser Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RemoveUser('testUserId');
      expect({ ...action }).toEqual({
        type: UserProfileActions.REMOVE_USER,
        payload: 'testUserId',
        meta: StateUtils.entityLoadMeta(PROCESS_FEATURE, CLOSE_USER_PROCESS_ID),
      });
    });
  });

  describe('RemoveUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserProfileActions.RemoveUserFail(error);

      expect({ ...action }).toEqual({
        type: UserProfileActions.REMOVE_USER_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          CLOSE_USER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('RemoveUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RemoveUserSuccess();

      expect({ ...action }).toEqual({
        type: UserProfileActions.REMOVE_USER_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          CLOSE_USER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('RemoveUserReset Action', () => {
    it('should create the action', () => {
      const action = new UserProfileActions.RemoveUserReset();

      expect({ ...action }).toEqual({
        type: UserProfileActions.REMOVE_USER_RESET,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          CLOSE_USER_PROCESS_ID
        ),
      });
    });
  });
});
