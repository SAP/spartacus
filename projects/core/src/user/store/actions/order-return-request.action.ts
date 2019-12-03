import {
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
} from '../../../model/order.model';
import {
  USER_RETURN_REQUESTS,
  USER_RETURN_REQUEST_DETAILS,
} from '../user-state';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
  LoaderResetAction,
} from '../../../state/utils/loader/loader.action';

export const CREATE_ORDER_RETURN_REQUEST = '[User] Create Order Return Request';
export const CREATE_ORDER_RETURN_REQUEST_FAIL =
  '[User] Create Order Return Request Fail';
export const CREATE_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Create Order Return Request Success';

export const LOAD_ORDER_RETURN_REQUESTS =
  '[User] Load User Order Return Requests';
export const LOAD_ORDER_RETURN_REQUESTS_FAIL =
  '[User] Load User Order Return Requests Fail';
export const LOAD_ORDER_RETURN_REQUESTS_SUCCESS =
  '[User] Load User Order Return Requests Success';

export const CLEAR_ORDER_RETURN_REQUESTS = '[User] Clear Order Return Requests';

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

export class LoadOrderReturnRequestList extends LoaderLoadAction {
  readonly type = LOAD_ORDER_RETURN_REQUESTS;
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
  readonly type = LOAD_ORDER_RETURN_REQUESTS_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUESTS, payload);
  }
}

export class LoadOrderReturnRequestListSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUESTS_SUCCESS;
  constructor(public payload: ReturnRequestList) {
    super(USER_RETURN_REQUESTS);
  }
}

export class ClearOrderReturnRequestList extends LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUESTS;
  constructor() {
    super(USER_RETURN_REQUESTS);
  }
}

export type OrderReturnRequestAction =
  | CreateOrderReturnRequest
  | CreateOrderReturnRequestFail
  | CreateOrderReturnRequestSuccess
  | LoadOrderReturnRequestList
  | LoadOrderReturnRequestListFail
  | LoadOrderReturnRequestListSuccess
  | ClearOrderReturnRequestList;
