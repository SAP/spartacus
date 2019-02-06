import { USER_PAYMENT_METHODS } from '../user-state';
import { PaymentDetailsList } from '../../../occ/occ-models/index';
import {
  loadMeta,
  failMeta,
  successMeta
} from '../../../state/utils/loader/loader.action';

import * as fromUserPaymentMethodsAction from './payment-methods.action';

const userId = '123';

describe('User Payment Methods Actions', () => {
  describe('LoadUserPaymentMethods Actions', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
        userId
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS,
        payload: userId,
        meta: loadMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('LoadUserPaymentMethodsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsFail(
        error
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_FAIL,
        payload: error,
        meta: failMeta(USER_PAYMENT_METHODS, error)
      });
    });
  });

  describe('LoadUserPaymentMethodsSuccess Action', () => {
    const mockUserPaymentMethods: PaymentDetailsList = {
      payments: [{ id: 'payment1' }, { id: 'payment2' }]
    };

    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods.payments
      );

      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.LOAD_USER_PAYMENT_METHODS_SUCCESS,
        payload: mockUserPaymentMethods.payments,
        meta: successMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('SetDefaultUserPaymentMethod Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethod(
        false
      );
      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD,
        payload: false,
        meta: loadMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('SetDefaultUserPaymentMethodFail Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodFail(
        false
      );
      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD_FAIL,
        payload: false,
        meta: failMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('SetDefaultUserPaymentMethodSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodSuccess(
        false
      );
      expect({ ...action }).toEqual({
        type:
          fromUserPaymentMethodsAction.SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS,
        payload: false,
        meta: successMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('DeleteUserPaymentMethod Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethod(
        false
      );
      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD,
        payload: false,
        meta: loadMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('DeleteUserPaymentMethodFail Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethodFail(
        false
      );
      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD_FAIL,
        payload: false,
        meta: failMeta(USER_PAYMENT_METHODS)
      });
    });
  });

  describe('DeleteUserPaymentMethodSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethodSuccess(
        false
      );
      expect({ ...action }).toEqual({
        type: fromUserPaymentMethodsAction.DELETE_USER_PAYMENT_METHOD_SUCCESS,
        payload: false,
        meta: successMeta(USER_PAYMENT_METHODS)
      });
    });
  });
});
