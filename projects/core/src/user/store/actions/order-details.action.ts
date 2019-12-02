import { Action } from '@ngrx/store';
import {
  Order,
  CancellationRequestEntryInputList,
} from '../../../model/order.model';
import {
  LoaderFailAction,
  LoaderLoadAction,
  LoaderSuccessAction,
  LoaderResetAction,
} from '../../../state/utils/loader/loader.action';
import { USER_ORDER_DETAILS } from '../user-state';

export const LOAD_ORDER_DETAILS = '[User] Load Order Details';
export const LOAD_ORDER_DETAILS_FAIL = '[User] Load Order Details Fail';
export const LOAD_ORDER_DETAILS_SUCCESS = '[User] Load Order Details Success';
export const CLEAR_ORDER_DETAILS = '[User] Clear Order Details';

export const CANCEL_ORDER = '[User] Cancel Order';
export const CANCEL_ORDER_FAIL = '[User] Cancel Order Fail';
export const CANCEL_ORDER_SUCCESS = '[User] Cancel Order Success';

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

export class LoadOrderDetailsFail extends LoaderFailAction {
  readonly type = LOAD_ORDER_DETAILS_FAIL;
  constructor(public payload: any) {
    super(USER_ORDER_DETAILS, payload);
  }
}

export class LoadOrderDetailsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_ORDER_DETAILS_SUCCESS;
  constructor(public payload: Order) {
    super(USER_ORDER_DETAILS);
  }
}

export class ClearOrderDetails extends LoaderResetAction {
  readonly type = CLEAR_ORDER_DETAILS;
  constructor() {
    super(USER_ORDER_DETAILS);
  }
}

export class CancelOrder extends LoaderLoadAction {
  readonly type = CANCEL_ORDER;
  constructor(
    public payload: {
      userId: string;
      orderCode: string;
      cancelRequestInput: CancellationRequestEntryInputList;
    }
  ) {
    super(USER_ORDER_DETAILS);
  }
}

export class CancelOrderFail extends LoaderFailAction {
  readonly type = CANCEL_ORDER_FAIL;
  constructor(public payload: any) {
    super(USER_ORDER_DETAILS, payload);
  }
}

export class CancelOrderSuccess extends LoaderSuccessAction {
  readonly type = CANCEL_ORDER_SUCCESS;
  constructor(public payload: any) {
    super(USER_ORDER_DETAILS);
  }
}

export type OrderDetailsAction =
  | LoadOrderDetails
  | LoadOrderDetailsFail
  | LoadOrderDetailsSuccess
  | ClearOrderDetails
  | CancelOrder
  | CancelOrderFail
  | CancelOrderSuccess;
