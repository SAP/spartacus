import { Occ } from '../../../occ/occ-models/occ.models';
import { StateUtils } from '../../../state/utils/index';
import { USER_PAYMENT_METHODS } from '../user-state';
import { UserActions } from './index';

const userId = '123';

describe('User Payment Methods Actions', () => {
  describe('LoadUserPaymentMethods Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserPaymentMethods(userId);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_PAYMENT_METHODS,
        payload: userId,
        meta: StateUtils.loadMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('LoadUserPaymentMethodsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadUserPaymentMethodsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_PAYMENT_METHODS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_PAYMENT_METHODS, error),
      });
    });
  });

  describe('LoadUserPaymentMethodsSuccess Action', () => {
    const mockUserPaymentMethods: Occ.PaymentDetailsList = {
      payments: [{ id: 'payment1' }, { id: 'payment2' }],
    };

    it('should create the action', () => {
      const action = new UserActions.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods.payments
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_PAYMENT_METHODS_SUCCESS,
        payload: mockUserPaymentMethods.payments,
        meta: StateUtils.successMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('SetDefaultUserPaymentMethod Action', () => {
    it('should create the action', () => {
      const action = new UserActions.SetDefaultUserPaymentMethod(false);
      expect({ ...action }).toEqual({
        type: UserActions.SET_DEFAULT_USER_PAYMENT_METHOD,
        payload: false,
        meta: StateUtils.loadMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('SetDefaultUserPaymentMethodFail Action', () => {
    it('should create the action', () => {
      const action = new UserActions.SetDefaultUserPaymentMethodFail(false);
      expect({ ...action }).toEqual({
        type: UserActions.SET_DEFAULT_USER_PAYMENT_METHOD_FAIL,
        payload: false,
        meta: StateUtils.failMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('SetDefaultUserPaymentMethodSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.SetDefaultUserPaymentMethodSuccess(false);
      expect({ ...action }).toEqual({
        type: UserActions.SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS,
        payload: false,
        meta: StateUtils.successMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('DeleteUserPaymentMethod Action', () => {
    it('should create the action', () => {
      const action = new UserActions.DeleteUserPaymentMethod(false);
      expect({ ...action }).toEqual({
        type: UserActions.DELETE_USER_PAYMENT_METHOD,
        payload: false,
        meta: StateUtils.loadMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('DeleteUserPaymentMethodFail Action', () => {
    it('should create the action', () => {
      const action = new UserActions.DeleteUserPaymentMethodFail(false);
      expect({ ...action }).toEqual({
        type: UserActions.DELETE_USER_PAYMENT_METHOD_FAIL,
        payload: false,
        meta: StateUtils.failMeta(USER_PAYMENT_METHODS),
      });
    });
  });

  describe('DeleteUserPaymentMethodSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.DeleteUserPaymentMethodSuccess(false);
      expect({ ...action }).toEqual({
        type: UserActions.DELETE_USER_PAYMENT_METHOD_SUCCESS,
        payload: false,
        meta: StateUtils.successMeta(USER_PAYMENT_METHODS),
      });
    });
  });
});
