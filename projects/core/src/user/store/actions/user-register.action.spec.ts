import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  entityFailMeta,
  entityLoadMeta,
  entityResetMeta,
  entitySuccessMeta,
} from '../../../state';
import { REMOVE_USER_PROCESS_ID } from '../user-state';
import * as fromUserRegister from './user-register.action';
import { UserRegisterFormData } from '../../model/user.model';

describe('User Register Actions', () => {
  describe('RegisterUser Action', () => {
    it('should create the action', () => {
      const user: UserRegisterFormData = {
        titleCode: '',
        firstName: '',
        lastName: '',
        password: '',
        uid: '',
      };

      const action = new fromUserRegister.RegisterUser(user);
      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER,
        payload: user,
      });
    });
  });

  describe('RegisterUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromUserRegister.RegisterUserFail(error);

      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER_FAIL,
        payload: error,
      });
    });
  });

  describe('RegisterUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserRegister.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER_SUCCESS,
      });
    });
  });
});

describe('Remove User Actions', () => {
  describe('RemoveUser Action', () => {
    it('should create the action', () => {
      const action = new fromUserRegister.RemoveUser('testUserId');
      expect({ ...action }).toEqual({
        type: fromUserRegister.REMOVE_USER,
        payload: 'testUserId',
        meta: entityLoadMeta(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID),
      });
    });
  });

  describe('RemoveUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromUserRegister.RemoveUserFail(error);

      expect({ ...action }).toEqual({
        type: fromUserRegister.REMOVE_USER_FAIL,
        payload: error,
        meta: entityFailMeta(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID, error),
      });
    });
  });

  describe('RemoveUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserRegister.RemoveUserSuccess();

      expect({ ...action }).toEqual({
        type: fromUserRegister.REMOVE_USER_SUCCESS,
        meta: entitySuccessMeta(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID),
        payload: undefined,
      });
    });
  });

  describe('RemoveUserReset Action', () => {
    it('should create the action', () => {
      const action = new fromUserRegister.RemoveUserReset();

      expect({ ...action }).toEqual({
        type: fromUserRegister.REMOVE_USER_RESET,
        meta: entityResetMeta(PROCESS_FEATURE, REMOVE_USER_PROCESS_ID),
      });
    });
  });
});
