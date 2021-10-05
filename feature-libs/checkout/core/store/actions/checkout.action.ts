import { Action } from '@ngrx/store';
import { Order, PROCESS_FEATURE, StateUtils } from '@spartacus/core';
import {
  PLACED_ORDER_PROCESS_ID,
  SET_COST_CENTER_PROCESS_ID,
} from '../checkout-state';

export const PLACE_ORDER = '[Checkout] Place Order';
export const PLACE_ORDER_FAIL = '[Checkout] Place Order Fail';
export const PLACE_ORDER_SUCCESS = '[Checkout] Place Order Success';
export const CLEAR_PLACE_ORDER = '[Checkout] Clear Place Order';

export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';

export const SET_COST_CENTER = '[Checkout] Set Cost Center';
export const SET_COST_CENTER_FAIL = '[Checkout] Set Cost Center Fail';
export const SET_COST_CENTER_SUCCESS = '[Checkout] Set Cost Center Success';
export const RESET_SET_COST_CENTER_PROCESS =
  '[Checkout] Reset Set Cost Center Process';

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

export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
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
  | PlaceOrder
  | PlaceOrderFail
  | PlaceOrderSuccess
  | ClearCheckoutData
  | CheckoutClearMiscsData
  | SetCostCenter
  | SetCostCenterFail
  | SetCostCenterSuccess
  | ResetSetCostCenterProcess;
