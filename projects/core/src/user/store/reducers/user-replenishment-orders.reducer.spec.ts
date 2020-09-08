import { PaginationModel, SortModel } from '../../../model/misc.model';
import { OrderHistory } from '../../../model/order.model';
import { ReplenishmentOrderList } from '../../../model/replenishment-order.model';
import { UserActions } from '../actions/index';
import * as fromUserReplenishmentOrdersReducer from './user-replenishment-orders.reducer';

describe('User Orders Replenishment Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserReplenishmentOrdersReducer;
      const action = {} as UserActions.UserReplenishmentOrdersAction;
      const state = fromUserReplenishmentOrdersReducer.reducer(
        undefined,
        action
      );

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS action', () => {
    it('should populate the user Replenishment Orders state entities', () => {
      const replenishmentOrders: OrderHistory[] = [
        { code: '01' },
        { code: '02' },
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

      const { initialState } = fromUserReplenishmentOrdersReducer;
      const action = new UserActions.LoadUserReplenishmentOrdersSuccess(
        mockUserReplenishmentOrders
      );
      const state = fromUserReplenishmentOrdersReducer.reducer(
        initialState,
        action
      );

      expect(state).toEqual(mockUserReplenishmentOrders);
    });
  });

  describe('LOAD_USER_REPLENISHMENT_ORDERS_FAIL action', () => {
    it('should return the initial state', () => {
      const { initialState } = fromUserReplenishmentOrdersReducer;
      const action = new UserActions.LoadUserReplenishmentOrdersFail('error');
      const state = fromUserReplenishmentOrdersReducer.reducer(
        initialState,
        action
      );
      expect(state).toEqual(initialState);
    });
  });
});
