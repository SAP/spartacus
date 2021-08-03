import { ReplenishmentOrder } from '@spartacus/core';
import { OrderActions } from '../actions/index';
import * as fromReducer from './replenishment-order-details.reducer';

const mockReplenishmentOrder: ReplenishmentOrder = {
  active: true,
  purchaseOrderNumber: 'test-po',
  replenishmentOrderCode: 'test-repl-order',
  entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
};

describe('ReplenishmentOrderDetailsReducer', () => {
  describe('LOAD_REPLENISHMENT_ORDER_DETAILS_SUCCESS action', () => {
    it('should load a replenishment order details', () => {
      const { initialState } = fromReducer;

      const action = new OrderActions.LoadReplenishmentOrderDetailsSuccess(
        mockReplenishmentOrder
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(mockReplenishmentOrder);
    });
  });

  describe('CANCEL_REPLENISHMENT_ORDER_SUCCESS action', () => {
    it('should update replenishment order details', () => {
      const { initialState } = fromReducer;

      const action = new OrderActions.CancelReplenishmentOrderSuccess(
        mockReplenishmentOrder
      );
      const state = fromReducer.reducer(initialState, action);
      expect(state).toEqual(mockReplenishmentOrder);
    });
  });
});
