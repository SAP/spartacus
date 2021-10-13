import { Action } from '@ngrx/store';

export const CLEAR_CHECKOUT_DATA = '[Checkout] Clear Checkout Data';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';
export class ClearCheckoutData implements Action {
  readonly type = CLEAR_CHECKOUT_DATA;
}

export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

export type CheckoutAction = ClearCheckoutData | CheckoutClearMiscsData;
