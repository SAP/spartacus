import { PaymentDetails } from '../../../model/cart.model';
import { UserActions } from '../actions/index';
import * as fromUserPaymentMethodsReducer from './payment-methods.reducer';

describe('User Payment Methods Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = {} as UserActions.UserPaymentMethodsAction;
      const state = fromUserPaymentMethodsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS_SUCCESS action', () => {
    it('should populate the user Payment Methods state entities', () => {
      const mockUserPaymentMethods: PaymentDetails[] = [
        { id: 'payment1' },
        { id: 'payment2' },
      ];

      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new UserActions.LoadUserPaymentMethodsSuccess(
        mockUserPaymentMethods
      );
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(mockUserPaymentMethods);
    });
  });

  describe('LOAD_USER_PAYMENT_METHODS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserPaymentMethodsReducer;
      const action = new UserActions.LoadUserPaymentMethodsSuccess([]);
      const state = fromUserPaymentMethodsReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
