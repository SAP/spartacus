import { Order } from '@spartacus/core';
import { OrderActions } from '../actions/index';
import * as fromOrderDetailsReducer from './order-details.reducer';

describe('Order Details Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromOrderDetailsReducer;
      const action = {} as OrderActions.OrderDetailsAction;
      const state = fromOrderDetailsReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_ORDER_DETAILS_SUCCESS action', () => {
    it('should populate the order details state entities', () => {
      const mockOrderDetails: Order = { code: '123' };

      const { initialState } = fromOrderDetailsReducer;
      const action = new OrderActions.LoadOrderDetailsSuccess(mockOrderDetails);
      const state = fromOrderDetailsReducer.reducer(initialState, action);

      expect(state).toEqual(mockOrderDetails);
    });
  });
});
