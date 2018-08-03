import { Action } from '@ngrx/store';

export const CLEAR_MISCS_DATA = '[Checkout] Clear Miscs Data';

export class ClearMiscsData implements Action {
  readonly type = CLEAR_MISCS_DATA;
}

export type MiscsDataAction = ClearMiscsData;

export * from './checkout.action';
export * from './card-types.action';
export * from './address-verification.action';
