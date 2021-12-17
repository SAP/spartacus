import {
  PROCESS_FEATURE,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  StateUtils,
} from '@spartacus/core';
import {
  CANCEL_RETURN_PROCESS_ID,
  RETURN_REQUESTS,
  RETURN_REQUEST_DETAILS,
} from '../order-state';
import { OrderActions } from './index';

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
      const action = new OrderActions.CreateOrderReturnRequest({
        userId: 'userId',
        returnRequestInput,
      });

      expect({ ...action }).toEqual({
        type: OrderActions.CREATE_ORDER_RETURN_REQUEST,
        payload: {
          userId: 'userId',
          returnRequestInput,
        },
        meta: StateUtils.loadMeta(RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('CreateOrderReturnRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.CreateOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.CREATE_ORDER_RETURN_REQUEST_FAIL,
        payload: error,
        meta: StateUtils.failMeta(RETURN_REQUEST_DETAILS, error),
      });
    });
  });

  describe('CreateOrderReturnRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.CreateOrderReturnRequestSuccess({
        rma: '0000',
      });

      expect({ ...action }).toEqual({
        type: OrderActions.CREATE_ORDER_RETURN_REQUEST_SUCCESS,
        payload: { rma: '0000' },
        meta: StateUtils.successMeta(RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('LoadOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
      });

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST,
        payload: {
          userId: 'userId',
          returnRequestCode: 'test',
        },
        meta: StateUtils.loadMeta(RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('LoadOrderReturnRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.LoadOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST_FAIL,
        payload: error,
        meta: StateUtils.failMeta(RETURN_REQUEST_DETAILS, error),
      });
    });
  });

  describe('LoadOrderReturnRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderReturnRequestSuccess({
        rma: '0000',
      });

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST_SUCCESS,
        payload: { rma: '0000' },
        meta: StateUtils.successMeta(RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('CancelOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.CancelOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
        returnRequestModification: {},
      });

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER_RETURN_REQUEST,
        payload: {
          userId: 'userId',
          returnRequestCode: 'test',
          returnRequestModification: {},
        },
        meta: StateUtils.entityLoadMeta(
          PROCESS_FEATURE,
          CANCEL_RETURN_PROCESS_ID
        ),
      });
    });
  });

  describe('CancelOrderReturnRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.CancelOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER_RETURN_REQUEST_FAIL,
        payload: error,
        meta: StateUtils.entityFailMeta(
          PROCESS_FEATURE,
          CANCEL_RETURN_PROCESS_ID,
          error
        ),
      });
    });
  });

  describe('CancelOrderReturnRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.CancelOrderReturnRequestSuccess();

      expect({ ...action }).toEqual({
        type: OrderActions.CANCEL_ORDER_RETURN_REQUEST_SUCCESS,
        meta: StateUtils.entitySuccessMeta(
          PROCESS_FEATURE,
          CANCEL_RETURN_PROCESS_ID
        ),
        payload: undefined,
      });
    });
  });

  describe('LoadOrderReturnRequestList Actions', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderReturnRequestList(
        mockLoadPayload
      );

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST,
        payload: mockLoadPayload,
        meta: StateUtils.loadMeta(RETURN_REQUESTS),
      });
    });
  });

  describe('LoadOrderReturnRequestListFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new OrderActions.LoadOrderReturnRequestListFail(error);

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST_FAIL,
        payload: error,
        meta: StateUtils.failMeta(RETURN_REQUESTS, error),
      });
    });
  });

  describe('LoadOrderReturnRequestListSuccess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.LoadOrderReturnRequestListSuccess(
        mockReturnRequestList
      );

      expect({ ...action }).toEqual({
        type: OrderActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS,
        payload: mockReturnRequestList,
        meta: StateUtils.successMeta(RETURN_REQUESTS),
      });
    });
  });

  describe('ClearOrderReturnRequestList Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ClearOrderReturnRequestList();

      expect({ ...action }).toEqual({
        type: OrderActions.CLEAR_ORDER_RETURN_REQUEST_LIST,
        meta: StateUtils.resetMeta(RETURN_REQUESTS),
      });
    });
  });

  describe('ClearOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ClearOrderReturnRequest();

      expect({ ...action }).toEqual({
        type: OrderActions.CLEAR_ORDER_RETURN_REQUEST,
        meta: StateUtils.resetMeta(RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('ResetCancelReturnProcess Action', () => {
    it('should create the action', () => {
      const action = new OrderActions.ResetCancelReturnProcess();

      expect({ ...action }).toEqual({
        type: OrderActions.RESET_CANCEL_RETURN_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          CANCEL_RETURN_PROCESS_ID
        ),
      });
    });
  });
});
