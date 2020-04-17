import { Order } from '../../../model/order.model';
import { UserActions } from './index';
import { StateUtils } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { USER_ORDER_DETAILS, CANCEL_ORDER_PROCESS_ID } from '../user-state';

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
        meta: StateUtils.loadMeta(USER_ORDER_DETAILS),
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
        meta: StateUtils.failMeta(USER_ORDER_DETAILS, error),
      });
    });
  });

  describe('LoadOrderDetailsSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderDetailsSuccess(mockOrderDetails);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_DETAILS_SUCCESS,
        payload: mockOrderDetails,
        meta: StateUtils.successMeta(USER_ORDER_DETAILS),
      });
    });
  });

  describe('ClearOrderDetails Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearOrderDetails();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_ORDER_DETAILS,
        meta: StateUtils.resetMeta(USER_ORDER_DETAILS),
      });
    });
  });

  describe('CancelOrder Action', () => {
    it('should create the action', () => {
      const payload = {
        userId: 'test',
        orderCode: 'test',
        cancelRequestInput: {},
      };
      const action = new UserActions.CancelOrder(payload);

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER,
        payload: payload,
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
      });
    });
  });

  describe('CancelOrderFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.CancelOrderFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('CancelOrderSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.CancelOrderSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('ResetCancelOrderProcess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetCancelOrderProcess();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_CANCEL_ORDER_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          CANCEL_ORDER_PROCESS_ID
        ),
      });
    });
  });
});
