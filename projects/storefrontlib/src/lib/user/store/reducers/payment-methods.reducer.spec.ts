import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import * as fromUserPaymentMethodsReducer from './payment-methods.reducer';
import { PaymentDetails } from '@spartacus/core';

describe('User Payment Methods Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = {} as any;
      const state = fromUserPaymentMethodsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS_SUCCESS action', () => {
    it('should populate the user Payment Methods state entities', () => {
      const mockUserPaymentMethods: PaymentDetails[] = [
        { id: 'payment1' },
        { id: 'payment2' }
      ];

      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);

      expect(state.list).toEqual(mockUserPaymentMethods);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS_FAIL action', () => {
    it('should set isLoading flag to false', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        []
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS action', () => {
    it('should set isLoading flag to true', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
        'userId'
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state.isLoading).toEqual(true);
    });
  });
});
