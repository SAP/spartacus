import { Action } from '@ngrx/store';
import { Address, AddressValidation } from '../../../model/address.model';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const VERIFY_ADDRESS = '[Checkout] Verify Address';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const VERIFY_ADDRESS_FAIL = '[Checkout] Verify Address Fail';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const VERIFY_ADDRESS_SUCCESS = '[Checkout] Verify Address Success';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const CLEAR_ADDRESS_VERIFICATION_RESULTS =
  '[Checkout] Clear Address Verification Results';

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class VerifyAddress implements Action {
  readonly type = VERIFY_ADDRESS;
  constructor(public payload: { userId: string; address: Address }) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class VerifyAddressFail implements Action {
  readonly type = VERIFY_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class VerifyAddressSuccess implements Action {
  readonly type = VERIFY_ADDRESS_SUCCESS;
  constructor(public payload: AddressValidation) {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export class ClearAddressVerificationResults implements Action {
  readonly type = CLEAR_ADDRESS_VERIFICATION_RESULTS;
  constructor() {}
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export type AddressVerificationActions =
  | VerifyAddress
  | VerifyAddressFail
  | VerifyAddressSuccess
  | ClearAddressVerificationResults;
