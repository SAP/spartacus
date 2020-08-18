import { ORDER_TYPE } from '../../../model/replenishment-order.model';
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
  });
});
