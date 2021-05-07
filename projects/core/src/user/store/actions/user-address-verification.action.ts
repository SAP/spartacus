import { Action } from '@ngrx/store';
import { Address, AddressValidation } from '../../../model/address.model';

export const VERIFY_USER_ADDRESS = '[User] Verify User Address';

export const VERIFY_USER_ADDRESS_FAIL = '[User] Verify User Address Fail';

export const VERIFY_USER_ADDRESS_SUCCESS = '[User] Verify User Address Success';

export const CLEAR_USER_ADDRESS_VERIFICATION_RESULTS =
  '[User] Clear User Address Verification Results';

export class VerifyUserAddress implements Action {
  readonly type = VERIFY_USER_ADDRESS;
  constructor(public payload: { userId: string; address: Address }) {}
}

export class VerifyUserAddressFail implements Action {
  readonly type = VERIFY_USER_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class VerifyUserAddressSuccess implements Action {
  readonly type = VERIFY_USER_ADDRESS_SUCCESS;
  constructor(public payload: AddressValidation) {}
}
export class ClearUserAddressVerificationResults implements Action {
  readonly type = CLEAR_USER_ADDRESS_VERIFICATION_RESULTS;
  constructor() {}
}

export type UserAddressVerificationActions =
  | VerifyUserAddress
  | VerifyUserAddressFail
  | VerifyUserAddressSuccess
  | ClearUserAddressVerificationResults;
