import { ORDER_TYPE } from '@spartacus/core';
import { CheckoutActions } from './../actions/index';
import * as fromReducer from './order-types.reducer';

describe('Order types reducer', () => {
  describe('SET_ORDER_TYPE action', () => {
    it('should set an order type', () => {
      const { initialState } = fromReducer;

      const action = new CheckoutActions.SetOrderType(
        ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state.selected).toEqual(ORDER_TYPE.SCHEDULE_REPLENISHMENT_ORDER);
    });

    it('should reset order type to default state', () => {
      const { initialState } = fromReducer;

      const action = new CheckoutActions.ClearCheckoutData();

      const state = fromReducer.reducer(initialState, action);
      expect(state.selected).toEqual(ORDER_TYPE.PLACE_ORDER);
    });
  });
});
