import { Action } from '@ngrx/store';
import {
  Order,
  PaymentDetails,
  PROCESS_FEATURE,
  StateUtils,
} from '@spartacus/core';
import { CheckoutDetails } from '../../models/checkout.model';
import {
  CHECKOUT_DETAILS,
  PLACED_ORDER_PROCESS_ID,
  SET_COST_CENTER_PROCESS_ID,
  SET_PAYMENT_DETAILS_PROCESS_ID,
} from '../checkout-state';

export const CREATE_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Create Payment Details Success';

export const SET_PAYMENT_DETAILS_SUCCESS =
  '[Checkout] Set Payment Details Success';
export const RESET_SET_PAYMENT_DETAILS_PROCESS =
  '[Checkout] Reset Set Payment Details Process';

export const PLACE_ORDER = '[Checkout] Place Order';
export const PLACE_ORDER_FAIL = '[Checkout] Place Order Fail';
export const PLACE_ORDER_SUCCESS = '[Checkout] Place Order Success';
export const CLEAR_PLACE_ORDER = '[Checkout] Clear Place Order';

export const CLEAR_CHECKOUT_STEP = '[Checkout] Clear One Checkout Step';
export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const LOAD_CHECKOUT_DETAILS = '[Checkout] Load Checkout Details';
export const LOAD_CHECKOUT_DETAILS_FAIL =
  '[Checkout] Load Checkout Details Fail';
export const LOAD_CHECKOUT_DETAILS_SUCCESS =
  '[Checkout] Load Checkout Details Success';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';
export const PAYMENT_PROCESS_SUCCESS = '[Checkout] Payment Process Success';

export const SET_COST_CENTER = '[Checkout] Set Cost Center';
export const SET_COST_CENTER_FAIL = '[Checkout] Set Cost Center Fail';
export const SET_COST_CENTER_SUCCESS = '[Checkout] Set Cost Center Success';
export const RESET_SET_COST_CENTER_PROCESS =
  '[Checkout] Reset Set Cost Center Process';

export class CreatePaymentDetailsSuccess implements Action {
  readonly type = CREATE_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {}
}

export class PaymentProcessSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PAYMENT_PROCESS_SUCCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class SetPaymentDetailsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_PAYMENT_DETAILS_SUCCESS;
  constructor(public payload: PaymentDetails) {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class ResetSetPaymentDetailsProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_PAYMENT_DETAILS_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_PAYMENT_DETAILS_PROCESS_ID);
  }
}

export class PlaceOrder extends StateUtils.EntityLoadAction {
  readonly type = PLACE_ORDER;
  constructor(
    public payload: { userId: string; cartId: string; termsChecked: boolean }
  ) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

export class PlaceOrderFail extends StateUtils.EntityFailAction {
  readonly type = PLACE_ORDER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID, payload);
  }
}

export class PlaceOrderSuccess extends StateUtils.EntitySuccessAction {
  readonly type = PLACE_ORDER_SUCCESS;
  constructor(public payload: Order) {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

export class ClearPlaceOrder extends StateUtils.EntityLoaderResetAction {
  readonly type = CLEAR_PLACE_ORDER;
  constructor() {
    super(PROCESS_FEATURE, PLACED_ORDER_PROCESS_ID);
  }
}

export class ClearCheckoutStep implements Action {
  readonly type = CLEAR_CHECKOUT_STEP;
  constructor(public payload: number) {}
}

export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

export class LoadCheckoutDetails extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CHECKOUT_DETAILS;
  constructor(public payload: { userId: string; cartId: string }) {
    super(CHECKOUT_DETAILS);
  }
}

export class LoadCheckoutDetailsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CHECKOUT_DETAILS_FAIL;
  constructor(public payload: any) {
    super(CHECKOUT_DETAILS, payload);
  }
}

export class LoadCheckoutDetailsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CHECKOUT_DETAILS_SUCCESS;
  constructor(public payload: CheckoutDetails) {
    super(CHECKOUT_DETAILS);
  }
}

export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

export class SetCostCenter extends StateUtils.EntityLoadAction {
  readonly type = SET_COST_CENTER;
  constructor(
    public payload: { userId: string; cartId: string; costCenterId: string }
  ) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export class SetCostCenterFail extends StateUtils.EntityFailAction {
  readonly type = SET_COST_CENTER_FAIL;
  constructor(public payload: any) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID, payload);
  }
}

export class SetCostCenterSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SET_COST_CENTER_SUCCESS;
  constructor(public payload: string) {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export class ResetSetCostCenterProcess extends StateUtils.EntityLoaderResetAction {
  readonly type = RESET_SET_COST_CENTER_PROCESS;
  constructor() {
    super(PROCESS_FEATURE, SET_COST_CENTER_PROCESS_ID);
  }
}

export type CheckoutAction =
  | CreatePaymentDetailsSuccess
  | SetPaymentDetailsSuccess
  | ResetSetPaymentDetailsProcess
  | PlaceOrder
  | PlaceOrderFail
  | PlaceOrderSuccess
  | ClearCheckoutStep
  | ClearCheckoutData
  | LoadCheckoutDetails
  | LoadCheckoutDetailsFail
  | LoadCheckoutDetailsSuccess
  | CheckoutClearMiscsData
  | SetCostCenter
  | SetCostCenterFail
  | SetCostCenterSuccess
  | ResetSetCostCenterProcess;
