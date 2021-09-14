import {
  CancellationRequestEntryInputList,
  Order,
} from '../../../model/order.model';
import { PROCESS_FEATURE } from '../../../process/store/process-state';
import { StateUtils } from '../../../state/utils/index';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderResetAction,
  LoaderSuccessAction,
} from '../../../state/utils/loader/loader.action';
import { CANCEL_ORDER_PROCESS_ID, USER_ORDER_DETAILS } from '../user-state';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_DETAILS = '[User] Load Order Details';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_DETAILS_FAIL = '[User] Load Order Details Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const LOAD_ORDER_DETAILS_SUCCESS = '[User] Load Order Details Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CLEAR_ORDER_DETAILS = '[User] Clear Order Details';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER = '[User] Cancel Order';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_FAIL = '[User] Cancel Order Fail';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const CANCEL_ORDER_SUCCESS = '[User] Cancel Order Success';
/**
 * @deprecated since 4.2 - use order lib instead
 */
export const RESET_CANCEL_ORDER_PROCESS = '[User] Reset Cancel Order Process';

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderDetails extends LoaderLoadAction {
  readonly type = LOAD_ORDER_DETAILS;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
    }
  ) {
    super(USER_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderDetailsFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(USER_ORDER_DETAILS, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class LoadOrderDetailsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_DETAILS_SUCCESS;
  constructor(public payload: Order) {
    super(USER_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ClearOrderDetails extends LoaderResetAction {
  readonly type = CLEAR_ORDER_DETAILS;
  constructor() {
    super(USER_ORDER_DETAILS);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelOrder extends StateUtils.EntityLoadAction {
  readonly type = CANCEL_ORDER;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
      cancelRequestInput: CancellationRequestEntryInputList;
    }
  ) {
    super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelOrderFail extends StateUtils.EntityFailAction {
  readonly type = CANCEL_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID, payload);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class CancelOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = CANCEL_ORDER_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export class ResetCancelOrderProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_CANCEL_ORDER_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, CANCEL_ORDER_PROCESS_ID);
  }
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export type OrderDetailsAction =
  | LoadOrderDetails
  | LoadOrderDetailsFail
  | LoadOrderDetailsSuccess
  | ClearOrderDetails
  | CancelOrder
  | CancelOrderFail
  | CancelOrderSuccess;
