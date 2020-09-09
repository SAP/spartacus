import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ORDERS } from '../user-state';
import { UserActions } from './index';

const mockUserOrder: {
  userId: string;
  pageSize: number;
  currentPage: number;
  sort: string;
} = {
  userId: 'test@sap.com',
  pageSize: 5,
  currentPage: 1,
  sort: 'byDate',
};

const mockUserOrders: OrderHistoryList = {
  orders: [{ code: '01' }, { code: '02' }],
  pagination: {
    totalPages: 13,
  },
  sorts: [{ selected: true }, { selected: false }],
};

describe('User Orders Actions', () => {
  describe('LoadUserOrders Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserOrders(mockUserOrder);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ORDERS,
        payload: mockUserOrder,
        meta: StateUtils.loadMeta(USER_ORDERS),
      });
    });
  });

  describe('LoadUserOrdersFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadUserOrdersFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ORDERS_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_ORDERS, error),
      });
    });
  });

  describe('LoadUserOrdersSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadUserOrdersSuccess(mockUserOrders);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ORDERS_SUCCESS,
        payload: mockUserOrders,
        meta: StateUtils.successMeta(USER_ORDERS),
      });
    });
  });

  describe('ClearUserOrders Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearUserOrders();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_USER_ORDERS,
        meta: StateUtils.resetMeta(USER_ORDERS),
      });
    });
  });
});
