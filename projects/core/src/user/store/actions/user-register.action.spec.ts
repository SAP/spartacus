import { UserSignUp } from '../../../model/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import { REGISTER_USER_PROCESS_ID } from '../user-state';
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
      const action = new UserActions.RegisterUserFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER_FAIL,
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
      const action = new UserActions.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.REGISTER_USER_SUCCESS,
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
