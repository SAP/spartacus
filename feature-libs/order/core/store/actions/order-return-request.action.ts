import {
  PROCESS_FEATURE,
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
  StateUtils,
} from '@spartacus/core';
import {
  CANCEL_RETURN_PROCESS_ID,
  RETURN_REQUESTS,
  RETURN_REQUEST_DETAILS,
} from '../order-state';

export const CREATE_ORDER_RETURN_REQUEST =
  '[Order] Create Order Return Request';
export const CREATE_ORDER_RETURN_REQUEST_FAIL =
  '[Order] Create Order Return Request Fail';
export const CREATE_ORDER_RETURN_REQUEST_SUCCESS =
  '[Order] Create Order Return Request Success';

export const LOAD_ORDER_RETURN_REQUEST =
  '[Order] Load Order Return Request details';
export const LOAD_ORDER_RETURN_REQUEST_FAIL =
  '[Order] Load Order Return Request details Fail';
export const LOAD_ORDER_RETURN_REQUEST_SUCCESS =
  '[Order] Load Order Return Request details Success';

export const CANCEL_ORDER_RETURN_REQUEST =
  '[Order] Cancel Order Return Request';
export const CANCEL_ORDER_RETURN_REQUEST_FAIL =
  '[Order] Cancel Order Return Request Fail';
export const CANCEL_ORDER_RETURN_REQUEST_SUCCESS =
  '[Order] Cancel Order Return Request Success';

export const LOAD_ORDER_RETURN_REQUEST_LIST =
  '[Order] Load User Order Return Request List';
export const LOAD_ORDER_RETURN_REQUEST_LIST_FAIL =
  '[Order] Load User Order Return Request List Fail';
export const LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS =
  '[Order] Load User Order Return Request List Success';

export const CLEAR_ORDER_RETURN_REQUEST =
  '[Order] Clear Order Return Request Details';
export const CLEAR_ORDER_RETURN_REQUEST_LIST =
  '[Order] Clear Order Return Request List';
export const RESET_CANCEL_RETURN_PROCESS =
  '[Order] Reset Cancel Return Request Process';

export class CreateOrderReturnRequest extends StateUtils.LoaderLoadAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestInput: ReturnRequestEntryInputList;
    }
  ) {
    super(RETURN_REQUEST_DETAILS);
  }
}

export class CreateOrderReturnRequestFail extends StateUtils.LoaderFailAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(RETURN_REQUEST_DETAILS, payload);
  }
}

export class CreateOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(RETURN_REQUEST_DETAILS);
  }
}

export class LoadOrderReturnRequest extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST;
  constructor(
    public payload: {
      userId: string;
      returnRequestCode: string;
    }
  ) {
    super(RETURN_REQUEST_DETAILS);
  }
}

export class LoadOrderReturnRequestFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(RETURN_REQUEST_DETAILS, payload);
  }
}

export class LoadOrderReturnRequestSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(RETURN_REQUEST_DETAILS);
  }
}

export class CancelOrderReturnRequest extends StateUtils.EntityLoadAction {
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

export class CancelOrderReturnRequestFail extends StateUtils.EntityFailAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID, payload);
  }
}

export class CancelOrderReturnRequestSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

export class LoadOrderReturnRequestList extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST;
  constructor(
    public payload: {
      userId: string;
      pageSize?: number;
      currentPage?: number;
      sort?: string;
    }
  ) {
    super(RETURN_REQUESTS);
  }
}

export class LoadOrderReturnRequestListFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_FAIL;
  constructor(public payload: any) {
    super(RETURN_REQUESTS, payload);
  }
}

export class LoadOrderReturnRequestListSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS;
  constructor(public payload: ReturnRequestList) {
    super(RETURN_REQUESTS);
  }
}

export class ClearOrderReturnRequest extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST;
  constructor() {
    super(RETURN_REQUEST_DETAILS);
  }
}

export class ClearOrderReturnRequestList extends StateUtils.LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST_LIST;
  constructor() {
    super(RETURN_REQUESTS);
  }
}

export class ResetCancelReturnProcess extends StateUtils.EntityLoaderResetAction {
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
