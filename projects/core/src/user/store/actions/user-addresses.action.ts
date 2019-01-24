import { Action } from '@ngrx/store';

import { USER_ADDRESSES } from '../user-state';
import { Address } from '../../../occ/occ-models/index';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';

export const LOAD_USER_ADDRESSES = '[User] Load User Addresses';
export const LOAD_USER_ADDRESSES_FAIL = '[User] Load User Addresses Fail';
export const LOAD_USER_ADDRESSES_SUCCESS = '[User] Load User Addresses Success';

export const ADD_USER_ADDRESS = '[User] Add User Address';
export const ADD_USER_ADDRESS_FAIL = '[User] Add User Address Fail';
export const ADD_USER_ADDRESS_SUCCESS = '[User] Add User Address Success';

export const UPDATE_USER_ADDRESS = '[User] Update User Address';
export const UPDATE_USER_ADDRESS_FAIL = '[User] Update User Address Fail';
export const UPDATE_USER_ADDRESS_SUCCESS = '[User] Update User Address Success';

export const DELETE_USER_ADDRESS = '[User] Delete User Address';
export const DELETE_USER_ADDRESS_FAIL = '[User] Delete User Address Fail';
export const DELETE_USER_ADDRESS_SUCCESS = '[User] Delete User Address Success';

export class LoadUserAddresses extends LoaderLoadAction {
  readonly type = LOAD_USER_ADDRESSES;
  constructor(public payload: string) {
    super(USER_ADDRESSES);
  }
}

export class LoadUserAddressesFail extends LoaderFailAction {
  readonly type = LOAD_USER_ADDRESSES_FAIL;
  constructor(public payload: any) {
    super(USER_ADDRESSES, payload);
  }
}

export class LoadUserAddressesSuccess extends LoaderSuccessAction {
  readonly type = LOAD_USER_ADDRESSES_SUCCESS;
  constructor(public payload: Address[]) {
    super(USER_ADDRESSES);
  }
}

// Adding address actions
export class AddUserAddress implements Action {
  readonly type = ADD_USER_ADDRESS;
  constructor(public payload: { userId: string; address: Address }) {}
}

export class AddUserAddressFail implements Action {
  readonly type = ADD_USER_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class AddUserAddressSuccess implements Action {
  readonly type = ADD_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {}
}

// Updating address actions
export class UpdateUserAddress implements Action {
  readonly type = UPDATE_USER_ADDRESS;
  constructor(
    public payload: { userId: string; addressId: string; address: Address }
  ) {}
}

export class UpdateUserAddressFail implements Action {
  readonly type = UPDATE_USER_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class UpdateUserAddressSuccess implements Action {
  readonly type = UPDATE_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {}
}

// Deleting address actions
export class DeleteUserAddress implements Action {
  readonly type = DELETE_USER_ADDRESS;
  constructor(public payload: any) {}
}

export class DeleteUserAddressFail implements Action {
  readonly type = DELETE_USER_ADDRESS_FAIL;
  constructor(public payload: any) {}
}

export class DeleteUserAddressSuccess implements Action {
  readonly type = DELETE_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type UserAddressesAction =
  | LoadUserAddresses
  | LoadUserAddressesFail
  | LoadUserAddressesSuccess
  | AddUserAddress
  | AddUserAddressFail
  | AddUserAddressSuccess
  | UpdateUserAddress
  | UpdateUserAddressFail
  | UpdateUserAddressSuccess
  | DeleteUserAddress
  | DeleteUserAddressFail
  | DeleteUserAddressSuccess;
