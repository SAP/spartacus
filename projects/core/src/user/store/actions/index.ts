import { Action } from '@ngrx/store';

export const CLEAR_MISCS_DATA = '[User] Clear User Misc Data';

export class ClearMiscsData implements Action {
  readonly type = CLEAR_MISCS_DATA;
}

export * from './user-details.action';
export * from './user-addresses.action';
export * from './payment-methods.action';
export * from './user-register.action';
export * from './user-orders.action';
export * from './titles.action';
export * from './delivery-countries.action';
export * from './regions.action';
export * from './order-details.action';
export * from './billing-countries.action';
export * from './forgot-password.action';
