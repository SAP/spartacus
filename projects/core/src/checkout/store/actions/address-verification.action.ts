import { Action } from '@ngrx/store';
import {
  Address,
  AddressValidation
} from 'projects/core/src/occ/occ-models/index';

export const VERIFY_ADDRESS = '[Checkout] Verify Address';
export const VERIFY_ADDRESS_FAIL = '[Checkout] Verify Address Fail';
export const VERIFY_ADDRESS_SUCCESS = '[Checkout] Verify Address Success';

export const CLEAR_ADDRESS_VERIFICATION_RESULTS =
  '[Checkout] Clear Address Verification Results';

export class VerifyAddress implements Action {
  readonly type = VERIFY_ADDRESS;
  constructor(public payload: { userId: string; address: Address }) {}
}

export class VerifyAddressFail implements Action {
  readonly type = VERIFY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class VerifyAddressSuccess implements Action {
  readonly type = VERIFY_ADDRESS_SUCCESS;
  constructor(public payload: AddressValidation) {}
}

export class ClearAddressVerificationResults implements Action {
  readonly type = CLEAR_ADDRESS_VERIFICATION_RESULTS;
  constructor() {}
}

export type AddressVerificationActions =
  | VerifyAddress
  | VerifyAddressFail
  | VerifyAddressSuccess
  | ClearAddressVerificationResults;
