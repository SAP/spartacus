import { Order } from '../../../model/order.model';
import { UserActions } from './index';

const mockOrderDetails: Order = { code: '123' };

const mockOrderDetailsParams = {
  userId: 'user15355363988711@ydev.hybris.com',
  orderCode: '00000386',
};

describe('Order Details Actions', () => {
  describe('LoadOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderDetails(mockOrderDetailsParams);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_DETAILS,
        payload: mockOrderDetailsParams,
      });
    });
  });

  describe('LoadOrderDetailsFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadOrderDetailsFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_DETAILS_FAIL,
        payload: error,
      });
    });
  });

  describe('LoadOrderDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderDetailsSuccess(mockOrderDetails);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_DETAILS_SUCCESS,
        payload: mockOrderDetails,
      });
    });
  });

  describe('ClearOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearOrderDetails();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_ORDER_DETAILS,
      });
    });
  });
});
