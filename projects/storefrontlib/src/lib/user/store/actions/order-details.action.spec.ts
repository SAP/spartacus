import * as fromOrderDetailsAction from './order-details.action';

const mockUserOrder: any = {
  orderId: '123'
};

describe('Order Details Actions', () => {
  describe('LoadOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new fromOrderDetailsAction.LoadOrderDetails(mockUserOrder);

      expect({ ...action }).toEqual({
        type: fromOrderDetailsAction.LOAD_ORDER_DETAILS,
        payload: mockUserOrder
      });
    });
  });

  describe('LoadOrderDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new fromOrderDetailsAction.LoadOrderDetailsFail(error);

      expect({ ...action }).toEqual({
        type: fromOrderDetailsAction.LOAD_ORDER_DETAILS_FAIL,
        payload: error
      });
    });
  });

  describe('LoadOrderDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new fromOrderDetailsAction.LoadOrderDetailsSuccess(
        mockUserOrder
      );

      expect({ ...action }).toEqual({
        type: fromOrderDetailsAction.LOAD_ORDER_DETAILS_SUCCESS,
        payload: mockUserOrder
      });
    });
  });

  describe('ClearOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new fromOrderDetailsAction.ClearOrderDetails();

      expect({ ...action }).toEqual({
        type: fromOrderDetailsAction.CLEAR_ORDER_DETAILS
      });
    });
  });
});
