import { Address } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_ADDRESSES } from '../user-state';

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

export class LoadUserAddresses extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_ADDRESSES;
  constructor(public payload: string) {
    super(USER_ADDRESSES);
  }
}

export class LoadUserAddressesFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_ADDRESSES_FAIL;
  constructor(public payload: any) {
    super(USER_ADDRESSES, payload);
  }
}

export class LoadUserAddressesSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_ADDRESSES_SUCCESS;
  constructor(public payload: Address[]) {
    super(USER_ADDRESSES);
  }
}

// Adding address actions
export class AddUserAddress extends StateUtils.LoaderLoadAction {
  readonly type = ADD_USER_ADDRESS;
  constructor(public payload: { userId: string; address: Address }) {
    super(USER_ADDRESSES);
  }
}

export class AddUserAddressFail extends StateUtils.LoaderFailAction {
  readonly type = ADD_USER_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(USER_ADDRESSES, payload);
  }
}

export class AddUserAddressSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = ADD_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {
    super(USER_ADDRESSES);
  }
}

// Updating address actions
export class UpdateUserAddress extends StateUtils.LoaderLoadAction {
  readonly type = UPDATE_USER_ADDRESS;
  constructor(
    public payload: { userId: string; addressId: string; address: Address }
  ) {
    super(USER_ADDRESSES);
  }
}

export class UpdateUserAddressFail extends StateUtils.LoaderFailAction {
  readonly type = UPDATE_USER_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(USER_ADDRESSES, payload);
  }
}

export class UpdateUserAddressSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = UPDATE_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {
    super(USER_ADDRESSES);
  }
}

// Deleting address actions
export class DeleteUserAddress extends StateUtils.LoaderLoadAction {
  readonly type = DELETE_USER_ADDRESS;
  constructor(public payload: any) {
    super(USER_ADDRESSES);
  }
}

export class DeleteUserAddressFail extends StateUtils.LoaderFailAction {
  readonly type = DELETE_USER_ADDRESS_FAIL;
  constructor(public payload: any) {
    super(USER_ADDRESSES, payload);
  }
}

export class DeleteUserAddressSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = DELETE_USER_ADDRESS_SUCCESS;
  constructor(public payload: any) {
    super(USER_ADDRESSES);
  }
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
