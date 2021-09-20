import {
  PaginationModel,
  ReplenishmentOrder,
  ReplenishmentOrderList,
  SortModel,
} from '@spartacus/core';
import { OrderActions } from '../actions/index';
import * as fromReducer from './replenishment-orders.reducer';

const replenishmentOrders: ReplenishmentOrder[] = [
  {
    active: false,
    purchaseOrderNumber: 'test-po',
    replenishmentOrderCode: 'test-repl-order',
    entries: [{ entryNumber: 0, product: { name: 'test-product' } }],
  },
];

const pagination: PaginationModel = {
  currentPage: 1,
  totalPages: 5,
  pageSize: 5,
};
const sorts: SortModel[] = [{ code: 'byDate' }];
const mockUserReplenishmentOrders: ReplenishmentOrderList = {
  replenishmentOrders,
  pagination,
  sorts,
};

describe('User Orders Replenishment Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {} as OrderActions.UserReplenishmentOrdersAction;
      const state = fromReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS action', () => {
    it('should populate the User Replenishment Orders state entities', () => {
      const { initialState } = fromReducer;
      const action = new OrderActions.LoadUserReplenishmentOrdersSuccess(
        mockUserReplenishmentOrders
      );
      const state = fromReducer.reducer(initialState, action);

      expect(state).toEqual(mockUserReplenishmentOrders);
    });
  });

  describe('CANCEL_REPLENISHMENT_ORDER_SUCCESS action', () => {
    it('should update replenishment order details', () => {
      const action = new OrderActions.CancelReplenishmentOrderSuccess(
        replenishmentOrders[0]
      );
      const state = fromReducer.reducer(mockUserReplenishmentOrders, action);

      expect(state).toEqual(mockUserReplenishmentOrders);
    });
  });
});
