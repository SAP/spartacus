import { Action } from '@ngrx/store';

export const CHECKOUT_CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';

export class CheckoutClearMiscsData implements Action {
  readonly type = CHECKOUT_CLEAR_MISCS_DATA;
}

export type CheckoutMiscsDataAction = CheckoutClearMiscsData;

export * from './checkout.action';
export * from './card-types.action';
export * from './address-verification.action';
