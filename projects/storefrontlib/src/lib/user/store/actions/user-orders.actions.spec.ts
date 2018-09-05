import * as fromUserOrdersAction from './user-orders.action';

const mockUserOrder: any = {
  userId: 'test@sap.com',
  pageSize: 5,
  currentPage: 1,
  sort: 'byDate'
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
        mockUserOrder
      );

      expect({ ...action }).toEqual({
        type: fromUserOrdersAction.LOAD_USER_ORDERS_SUCCESS,
        payload: mockUserOrder
      });
    });
  });
});
