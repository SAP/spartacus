import * as fromUserRegister from './user-register.action';
import { UserRegisterFormData } from '../../model/user.model';

describe('User Register Actions', () => {
  describe('RegisterUser Action', () => {
    it('should create the action', () => {
      const user: UserRegisterFormData = {
        firstName: '',
        lastName: '',
        password: '',
        uid: ''
      };

      const action = new fromUserRegister.RegisterUser(user);
      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER,
        payload: user
      });
    });
  });

  describe('RegisterUserFail Action', () => {
    it('should create the action', () => {
      const error = 'anError';
      const action = new fromUserRegister.RegisterUserFail(error);

      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER_FAIL,
        payload: error
      });
    });
  });

  describe('RegisterUserSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserRegister.RegisterUserSuccess();

      expect({ ...action }).toEqual({
        type: fromUserRegister.REGISTER_USER_SUCCESS
      });
    });
  });
});
