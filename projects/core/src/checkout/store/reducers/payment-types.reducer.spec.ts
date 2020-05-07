import { PaymentType } from '../../../model/cart.model';
import { CheckoutActions } from '../actions/index';
import * as fromReducer from './payment-types.reducer';

describe('Payment Types Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as CheckoutActions.PaymentTypesAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_PAYMENT_TYPES_SUCCESS action', () => {
    it('should populate the payment types state entities', () => {
      const paymentTypes: PaymentType[] = [
        {
          code: 'card',
          displayName: 'card',
        },
        {
          code: 'account',
          displayName: 'accoun',
        },
      ];

      const mockPaymentTypesList = {
        card: paymentTypes[0],
        account: paymentTypes[1],
      };

      const { initialState } = fromReducer;
      const action = new CheckoutActions.LoadPaymentTypesSuccess(paymentTypes);
      const state = fromReducer.reducer(initialState, action);
      expect(state.entities).toEqual(mockPaymentTypesList);
    });
  });

  describe('CHECKOUT_CLEAR_MISCS_DATA action', () => {
    it('should clear the mics data', () => {
      const { initialState } = fromReducer;
      const action = new CheckoutActions.CheckoutClearMiscsData();
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });
});
