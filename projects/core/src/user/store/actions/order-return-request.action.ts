import {
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '../../../model/order.model';
import {
  USER_RETURN_REQUESTS,
  USER_RETURN_REQUEST_DETAILS,
  CANCEL_RETURN_PROCESS_ID,
} from '../user-state';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
  LoaderResetAction,
} from '../../../state/utils/loader/loader.action';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { PROCESS_FEATURE } from '../../../process/store/process-state';

export const CREATE_ORDER_RETURN_REQUEST = '[User] Create Order Return Request';
export const CREATE_ORDER_RETURN_REQUEST_FAIL =
  '[User] Create Order Return Request Fail';
export const CREATE_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Create Order Return Request Success';

export const LOAD_ORDER_RETURN_REQUEST =
  '[User] Load Order Return Request details';
export const LOAD_ORDER_RETURN_REQUEST_FAIL =
  '[User] Load Order Return Request details Fail';
export const LOAD_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Load Order Return Request details Success';

export const CANCEL_ORDER_RETURN_REQUEST = '[User] Cancel Order Return Request';
export const CANCEL_ORDER_RETURN_REQUEST_FAIL =
  '[User] Cancel Order Return Request Fail';
export const CANCEL_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Cancel Order Return Request Success';

export const LOAD_ORDER_RETURN_REQUEST_LIST =
  '[User] Load User Order Return Request List';
export const LOAD_ORDER_RETURN_REQUEST_LIST_FAIL =
  '[User] Load User Order Return Request List Fail';
export const LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS =
  '[User] Load User Order Return Request List Success';

export const CLEAR_ORDER_RETURN_REQUEST =
  '[User] Clear Order Return Request Details';
export const CLEAR_ORDER_RETURN_REQUEST_LIST =
  '[User] Clear Order Return Request List';
export const RESET_CANCEL_RETURN_PROCESS =
  '[User] Reset Cancel Return Request Process';

export class CreateOrderReturnRequest extends LoaderLoadAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestInput: ReturnRequestEntryInputList;
    }
  ) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

export class CreateOrderReturnRequestFail extends LoaderFailAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUEST_DETAILS, payload);
  }
}

export class CreateOrderReturnRequestSuccess extends LoaderSuccessAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

export class LoadOrderReturnRequest extends LoaderLoadAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestCode: string;
    }
  ) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

export class LoadOrderReturnRequestFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUEST_DETAILS, payload);
  }
}

export class LoadOrderReturnRequestSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

export class CancelOrderReturnRequest extends StateEntityLoaderActions.EntityLoadAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestCode: string;
      returnRequestModification: ReturnRequestModification;
    }
  ) {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

export class CancelOrderReturnRequestFail extends StateEntityLoaderActions.EntityFailAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID, payload);
  }
}

export class CancelOrderReturnRequestSuccess extends StateEntityLoaderActions.EntitySuccessAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

export class LoadOrderReturnRequestList extends LoaderLoadAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(USER_RETURN_REQUESTS);
  }
}

export class LoadOrderReturnRequestListFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUESTS, payload);
  }
}

export class LoadOrderReturnRequestListSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS;
  constructor(public payload: ReturnRequestList) {
    super(USER_RETURN_REQUESTS);
  }
}

export class ClearOrderReturnRequest extends LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST;
  constructor() {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

export class ClearOrderReturnRequestList extends LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST_LIST;
  constructor() {
    super(USER_RETURN_REQUESTS);
  }
}

export class ResetCancelReturnProcess extends StateEntityLoaderActions.EntityResetAction {
  readonly type = RESET_CANCEL_RETURN_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

export type OrderReturnRequestAction =
  | CreateOrderReturnRequest
  | CreateOrderReturnRequestFail
  | CreateOrderReturnRequestSuccess
  | LoadOrderReturnRequest
  | LoadOrderReturnRequestFail
  | LoadOrderReturnRequestSuccess
  | CancelOrderReturnRequest
  | CancelOrderReturnRequestFail
  | CancelOrderReturnRequestSuccess
  | LoadOrderReturnRequestList
  | LoadOrderReturnRequestListFail
  | LoadOrderReturnRequestListSuccess
  | ClearOrderReturnRequest
  | ClearOrderReturnRequestList
  | ResetCancelReturnProcess;
