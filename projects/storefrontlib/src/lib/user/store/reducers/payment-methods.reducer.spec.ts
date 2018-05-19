import * as fromUserPaymentMethodsAction from '../actions/payment-methods.action';
import * as fromUserPaymentMethodsReducer from './payment-methods.reducer';

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
      const mockUserPaymentMethods = ['payment1', 'payment2'];

      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new fromUserPaymentMethodsAction.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);

      expect(state.list).toEqual(mockUserPaymentMethods);
    });
  });
});
