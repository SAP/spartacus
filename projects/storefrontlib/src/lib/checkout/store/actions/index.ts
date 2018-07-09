import { Action } from '@ngrx/store';

export const CLEAR_MISCS_DATA = '[Checkout] Clear Countries';

export class ClearMiscsData implements Action {
  readonly type = CLEAR_MISCS_DATA;
}

export type MiscsDataAction = ClearMiscsData;

export * from './checkout.action';
export * from './delivery-countries.action';
export * from './card-types.action';
export * from './address-verification.action';
