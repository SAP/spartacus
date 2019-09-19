import { UserSignUp } from '../../../model/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import {
  REGISTER_USER_PROCESS_ID,
  REMOVE_USER_PROCESS_ID,
} from '../user-state';
import { UserActions } from './index';

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
      const action = new UserActions.RegisterUser(user);

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER,
        payload: user,
        meta: StateEntityLoaderActions.entityLoadMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID
        ),
      });
    });
  });

  describe('RegisterUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.RegisterUserFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER_FAIL,
        payload: error,
        meta: StateEntityLoaderActions.entityFailMeta(
          PROCESS_FEATURE,
          REGISTER_USER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('RegisterUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER_SUCCESS,
        meta: StateEntityLoaderActions.entitySuccessMeta(
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
      const action = new UserActions.RegisterGuest({
        guid: 'guid',
        password: 'password',
      });
      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_GUEST,
        payload: { guid: 'guid', password: 'password' },
      });
    });
  });

  describe('RegisterGuestFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.RegisterGuestFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_GUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('RegisterGuestSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RegisterGuestSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_GUEST_SUCCESS,
      });
    });
  });
});

describe('Remove User Actions', () => {
  describe('RemoveUser Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RemoveUser('testUserId');
      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_USER,
        payload: 'testUserId',
        meta: StateEntityLoaderActions.entityLoadMeta(
          PROCESS_FEATURE,
          REMOVE_USER_PROCESS_ID
        ),
      });
    });
  });

  describe('RemoveUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new UserActions.RemoveUserFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_USER_FAIL,
        payload: error,
        meta: StateEntityLoaderActions.entityFailMeta(
          PROCESS_FEATURE,
          REMOVE_USER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('RemoveUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RemoveUserSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_USER_SUCCESS,
        meta: StateEntityLoaderActions.entitySuccessMeta(
          PROCESS_FEATURE,
          REMOVE_USER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('RemoveUserReset Action', () => {
    it('should create the action', () => {
      const action = new UserActions.RemoveUserReset();

      expect({ ...action }).toEqual({
        type: UserActions.REMOVE_USER_RESET,
        meta: StateEntityLoaderActions.entityResetMeta(
          PROCESS_FEATURE,
          REMOVE_USER_PROCESS_ID
        ),
      });
    });
  });
});
