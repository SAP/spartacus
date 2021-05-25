import { OrderHistoryList } from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ORDERS } from '../user-state';
import { UserActions } from './index';

describe('UserOrdersActions', () => {
  describe('LoadUserOrders Actions', () => {
    it('should create the action', () => {
      const payload: {
        userId: string;
        pageSize?: number;
        currentPage?: number;
        sort?: string;
        replenishmentOrderCode?: string;
      } = {
        userId: 'test@sap.com',
        pageSize: 5,
        currentPage: 1,
        sort: 'byDate',
        replenishmentOrderCode: 'test-repl-code',
      };

      const action = new UserActions.LoadUserOrders(payload);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ORDERS,
        payload,
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
      const payload: OrderHistoryList = {
        orders: [{ code: '01' }, { code: '02' }],
        pagination: {
          totalPages: 13,
        },
        sorts: [{ selected: true }, { selected: false }],
      };

      const action = new UserActions.LoadUserOrdersSuccess(payload);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_USER_ORDERS_SUCCESS,
        payload,
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
