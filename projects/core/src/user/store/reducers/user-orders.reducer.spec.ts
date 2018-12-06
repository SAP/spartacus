import * as fromUserOrdersReducer from './user-orders.reducer';
import * as fromUserOrdersAction from '../actions/user-orders.action';
import {
  PaginationModel,
  SortModel,
  OrderHistory,
  OrderHistoryList
} from '../../../occ-models/occ.models';

describe('User Orders Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromUserOrdersReducer;
      const action = {} as any;
      const state = fromUserOrdersReducer.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_USER_ORDERS_SUCCESS action', () => {
    it('should populate the user Orders state entities', () => {
      const orders: OrderHistory[] = [{ code: '01' }, { code: '02' }];
      const pagination: PaginationModel = {
        currentPage: 1,
        totalPages: 5,
        pageSize: 5
      };
      const sorts: SortModel[] = [{ code: 'byDate' }];
      const mockUserOrders: OrderHistoryList = {
        orders,
        pagination,
        sorts
      };

      const { initialState } = fromUserOrdersReducer;
      const action = new fromUserOrdersAction.LoadUserOrdersSuccess(
        mockUserOrders
      );
      const state = fromUserOrdersReducer.reducer(initialState, action);

      expect(state.orders).toEqual(mockUserOrders);
    });
  });
});
