import { Action } from '@ngrx/store';

export const LOAD_ADDRESS_VERIFICATION_RESULTS =
  '[Checkout] Load Address Verification Results';
export const LOAD_ADDRESS_VERIFICATION_RESULTS_FAIL =
  '[Checkout] Load Address Verification Results Fail';
export const LOAD_ADDRESS_VERIFICATION_RESULTS_SUCCESS =
  '[Checkout] Load Address Verification Results Success';

export const CLEAR_ADDRESS_VERIFICATION_RESULTS =
  '[Checkout] Clear Address Verification Results';

export class LoadAddressVerificationResults implements Action {
  readonly type = LOAD_ADDRESS_VERIFICATION_RESULTS;
  constructor(public payload: { userId: string; address: string }) {}
}

export class LoadAddressVerificationResultsFail implements Action {
  readonly type = LOAD_ADDRESS_VERIFICATION_RESULTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadAddressVerificationResultsSuccess implements Action {
  readonly type = LOAD_ADDRESS_VERIFICATION_RESULTS_SUCCESS;
  constructor(public payload: any) {}
}

export class ClearAddressVerificationResults implements Action {
  readonly type = CLEAR_ADDRESS_VERIFICATION_RESULTS;
  constructor() {}
}

export type AddressVerificationActions =
  | LoadAddressVerificationResults
  | LoadAddressVerificationResultsFail
  | LoadAddressVerificationResultsSuccess
  | ClearAddressVerificationResults;
