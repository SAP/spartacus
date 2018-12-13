import * as fromUserOrdersAction from './user-orders.action';
import { OrderHistoryList } from '../../../occ/occ-models/index';

const mockUserOrder: {
  userId: string;
  pageSize: number;
  currentPage: number;
  sort: string;
} = {
  userId: 'test@sap.com',
  pageSize: 5,
  currentPage: 1,
  sort: 'byDate'
};

const mockUserOrders: OrderHistoryList = {
  orders: [{ code: '01' }, { code: '02' }],
  pagination: {
    totalPages: 13
  },
  sorts: [{ selected: true }, { selected: false }]
};

describe('User Orders Actions', () => {
  describe('LoadUserOrders Actions', () => {
    it('should create the action', () => {
      const action = new fromUserOrdersAction.LoadUserOrders(mockUserOrder);

      expect({ ...action }).toEqual({
        type: fromUserOrdersAction.LOAD_USER_ORDERS,
        payload: mockUserOrder
      });
    });
  });

  describe('LoadUserOrdersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromUserOrdersAction.LoadUserOrdersFail(error);

      expect({ ...action }).toEqual({
        type: fromUserOrdersAction.LOAD_USER_ORDERS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadUserOrdersSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromUserOrdersAction.LoadUserOrdersSuccess(
        mockUserOrders
      );

      expect({ ...action }).toEqual({
        type: fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS,
        payload: mockUserOrders
      });
    });
  });
});
