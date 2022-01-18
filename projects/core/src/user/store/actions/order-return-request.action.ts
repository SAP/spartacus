import {
  ReturnRequest,
  ReturnRequestEntryInputList,
  ReturnRequestList,
  ReturnRequestModification,
} from '../../../model/order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import {
  CANCEL_RETURN_PROCESS_ID,
  USER_RETURN_REQUESTS,
  USER_RETURN_REQUEST_DETAILS,
} from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CREATE_ORDER_RETURN_REQUEST = '[User] Create Order Return Request';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CREATE_ORDER_RETURN_REQUEST_FAIL =
  '[User] Create Order Return Request Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CREATE_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Create Order Return Request Success';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST =
  '[User] Load Order Return Request details';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST_FAIL =
  '[User] Load Order Return Request details Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Load Order Return Request details Success';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_RETURN_REQUEST = '[User] Cancel Order Return Request';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_RETURN_REQUEST_FAIL =
  '[User] Cancel Order Return Request Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_RETURN_REQUEST_SUCCESS =
  '[User] Cancel Order Return Request Success';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST_LIST =
  '[User] Load User Order Return Request List';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST_LIST_FAIL =
  '[User] Load User Order Return Request List Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS =
  '[User] Load User Order Return Request List Success';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_ORDER_RETURN_REQUEST =
  '[User] Clear Order Return Request Details';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_ORDER_RETURN_REQUEST_LIST =
  '[User] Clear Order Return Request List';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const RESET_CANCEL_RETURN_PROCESS =
  '[User] Reset Cancel Return Request Process';

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CreateOrderReturnRequestFail extends LoaderFailAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUEST_DETAILS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CreateOrderReturnRequestSuccess extends LoaderSuccessAction {
  readonly type = CREATE_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderReturnRequestFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUEST_DETAILS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderReturnRequestSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_SUCCESS;
  constructor(public payload: ReturnRequest) {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelOrderReturnRequestFail extends StateUtils.EntityFailAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelOrderReturnRequestSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CANCEL_ORDER_RETURN_REQUEST_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
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

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderReturnRequestListFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_FAIL;
  constructor(public payload: any) {
    super(USER_RETURN_REQUESTS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderReturnRequestListSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_RETURN_REQUEST_LIST_SUCCESS;
  constructor(public payload: ReturnRequestList) {
    super(USER_RETURN_REQUESTS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearOrderReturnRequest extends LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST;
  constructor() {
    super(USER_RETURN_REQUEST_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearOrderReturnRequestList extends LoaderResetAction {
  readonly type = CLEAR_ORDER_RETURN_REQUEST_LIST;
  constructor() {
    super(USER_RETURN_REQUESTS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ResetCancelReturnProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_CANCEL_RETURN_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_RETURN_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
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
