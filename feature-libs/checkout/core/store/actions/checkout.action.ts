import { Action } from '@ngrx/store';

export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';

export const SET_COST_CENTER_SUCCESS = '[Checkout] Set Cost Center Success';

export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

export class SetCostCenterSuccess implements Action {
  readonly type = SET_COST_CENTER_SUCCESS;
  constructor(public payload: string) {}
}

export type CheckoutAction =
  | ClearCheckoutData
  | CheckoutClearMiscsData
  | SetCostCenterSuccess;
