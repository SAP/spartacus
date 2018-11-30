import { Action } from '@ngrx/store';
import { Address } from '../../../occ-models';

export const LOAD_USER_ADDRESSES = '[User] Load User Addresses';
export const LOAD_USER_ADDRESSES_FAIL = '[User] Load User Addresses Fail';
export const LOAD_USER_ADDRESSES_SUCCESS = '[User] Load User Addresses Success';

export class LoadUserAddresses implements Action {
  readonly type = LOAD_USER_ADDRESSES;
  constructor(public payload: string) {}
}

export class LoadUserAddressesFail implements Action {
  readonly type = LOAD_USER_ADDRESSES_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserAddressesSuccess implements Action {
  readonly type = LOAD_USER_ADDRESSES_SUCCESS;
  constructor(public payload: Address[]) {}
}

// action types
export type UserAddressesAction =
  | LoadUserAddresses
  | LoadUserAddressesFail
  | LoadUserAddressesSuccess;
