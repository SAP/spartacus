import {
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';
import { StateUtils } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import {
  USER_RETURN_REQUESTS,
  USER_RETURN_REQUEST_DETAILS,
  CANCEL_RETURN_PROCESS_ID,
} from '../user-state';
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
        meta: StateUtils.loadMeta(USER_RETURN_REQUEST_DETAILS),
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
        meta: StateUtils.failMeta(USER_RETURN_REQUEST_DETAILS, error),
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
        meta: StateUtils.successMeta(USER_RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('LoadOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
      });

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST,
        payload: {
          userId: 'userId',
          returnRequestCode: 'test',
        },
        meta: StateUtils.loadMeta(USER_RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('LoadOrderReturnRequestFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_RETURN_REQUEST_DETAILS, error),
      });
    });
  });

  describe('LoadOrderReturnRequestSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderReturnRequestSuccess({
        rma: '0000',
      });

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST_SUCCESS,
        payload: { rma: '0000' },
        meta: StateUtils.successMeta(USER_RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('CancelOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new UserActions.CancelOrderReturnRequest({
        userId: 'userId',
        returnRequestCode: 'test',
        returnRequestModification: {},
      });

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER_RETURN_REQUEST,
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
      const action = new UserActions.CancelOrderReturnRequestFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER_RETURN_REQUEST_FAIL,
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
      const action = new UserActions.CancelOrderReturnRequestSuccess();

      expect({ ...action }).toEqual({
        type: UserActions.CANCEL_ORDER_RETURN_REQUEST_SUCCESS,
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
      const action = new UserActions.LoadOrderReturnRequestList(
        mockLoadPayload
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST_LIST,
        payload: mockLoadPayload,
        meta: StateUtils.loadMeta(USER_RETURN_REQUESTS),
      });
    });
  });

  describe('LoadOrderReturnRequestListFail Action', () => {
    it('should create the action', () => {
      const error = 'mockError';
      const action = new UserActions.LoadOrderReturnRequestListFail(error);

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST_LIST_FAIL,
        payload: error,
        meta: StateUtils.failMeta(USER_RETURN_REQUESTS, error),
      });
    });
  });

  describe('LoadOrderReturnRequestListSuccess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.LoadOrderReturnRequestListSuccess(
        mockReturnRequestList
      );

      expect({ ...action }).toEqual({
        type: UserActions.LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS,
        payload: mockReturnRequestList,
        meta: StateUtils.successMeta(USER_RETURN_REQUESTS),
      });
    });
  });

  describe('ClearOrderReturnRequestList Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearOrderReturnRequestList();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_ORDER_RETURN_REQUEST_LIST,
        meta: StateUtils.resetMeta(USER_RETURN_REQUESTS),
      });
    });
  });

  describe('ClearOrderReturnRequest Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ClearOrderReturnRequest();

      expect({ ...action }).toEqual({
        type: UserActions.CLEAR_ORDER_RETURN_REQUEST,
        meta: StateUtils.resetMeta(USER_RETURN_REQUEST_DETAILS),
      });
    });
  });

  describe('ResetCancelReturnProcess Action', () => {
    it('should create the action', () => {
      const action = new UserActions.ResetCancelReturnProcess();

      expect({ ...action }).toEqual({
        type: UserActions.RESET_CANCEL_RETURN_PROCESS,
        meta: StateUtils.entityResetMeta(
          PROCESS_FEATURE,
          CANCEL_RETURN_PROCESS_ID
        ),
      });
    });
  });
});
