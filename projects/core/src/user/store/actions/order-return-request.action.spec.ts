import {
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';
import { StateLoaderActions } from '../../../state/utils/index';
import { USER_RETURN_REQUESTS } from '../user-state';
import { UserActions } from './index';

const returnRequestInput: ReturnRequestEntryInputList = {
  orderCode: 'orderCode',
  returnRequestEntryInputs: [{ orderEntryNumber: 0, quantity: 1 }],
};

const mockLoadPayload: {
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

const mockReturnRequestList: ReturnRequestList = {
  returnRequests: [{ rma: '01' }, { rma: '02' }],
  pagination: {
    totalPages: 13,
  },
  sorts: [{ selected: true }, { selected: false }],
};

describe('Order Return Request actions', () => {
  describe('CreateOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new UserActions.CreateOrderReturnRequest({
        userId: 'userId',
        returnRequestInput,
      });

      expect({ ...action }).toEqual({
        type: UserActions.CREATE_ORDER_RETURN_REQUEST,
        payload: {
          userId: 'userId',
          returnRequestInput,
        },
      });
    });
  });

  describe('CreateOrderReturnRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.CreateOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.CREATE_ORDER_RETURN_REQUEST_FAIL,
        payload: error,
      });
    });
  });

  describe('CreateOrderReturnRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.CreateOrderReturnRequestSuccess({
        rma: '0000',
      });

      expect({ ...action }).toEqual({
        type: UserActions.CREATE_ORDER_RETURN_REQUEST_SUCCESS,
        payload: { rma: '0000' },
      });
    });
  });

  describe('LoadOrderReturnRequestList Actions', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderReturnRequestList(
        mockLoadPayload
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUESTS,
        payload: mockLoadPayload,
        meta: StateLoaderActions.loadMeta(USER_RETURN_REQUESTS),
      });
    });
  });

  describe('LoadOrderReturnRequestListFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadOrderReturnRequestListFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUESTS_FAIL,
        payload: error,
        meta: StateLoaderActions.failMeta(USER_RETURN_REQUESTS, error),
      });
    });
  });

  describe('LoadOrderReturnRequestListSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderReturnRequestListSuccess(
        mockReturnRequestList
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUESTS_SUCCESS,
        payload: mockReturnRequestList,
        meta: StateLoaderActions.successMeta(USER_RETURN_REQUESTS),
      });
    });
  });

  describe('ClearOrderReturnRequestList Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearOrderReturnRequestList();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_ORDER_RETURN_REQUESTS,
      });
    });
  });
});
