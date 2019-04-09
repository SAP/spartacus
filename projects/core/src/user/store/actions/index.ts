import { Action } from '@ngrx/store';

export const CLEAR_MISCS_DATA = '[User] Clear User Misc Data';

export class ClearMiscsData implements Action {
  readonly type = CLEAR_MISCS_DATA;
}

export * from './billing-countries.action';
export * from './delivery-countries.action';
export * from './forgot-password.action';
export * from './order-details.action';
export * from './payment-methods.action';
export * from './regions.action';
export * from './reset-password.action';
export * from './titles.action';
export * from './update-password.action';
export * from './user-addresses.action';
export * from './user-details.action';
export * from './user-orders.action';
export * from './user-register.action';
