import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import { PaymentDetails } from '../../../occ/occ-models/index';

import * as fromUserPaymentMethodsReducer from './payment-methods.reducer';

describe('User Payment Methods Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = {} as fromUserPaymentMethodsAction.UserPaymentMethodsAction;
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
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        []
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethods(
        'userId'
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('SET_DEFAULT_USER_PAYMENT_METHOD action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethod(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('SET_DEFAULT_USER_PAYMENT_METHOD_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodFail(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.SetDefaultUserPaymentMethodSuccess(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('DELETE_USER_PAYMENT_METHOD action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethod(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('DELETE_USER_PAYMENT_METHOD_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethodFail(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('DELETE_USER_PAYMENT_METHOD_SUCCESS action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.DeleteUserPaymentMethodSuccess(
        {}
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
