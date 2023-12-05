import { Address } from '../../../model/address.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_USER_ADDRESSES = "[User] Load User Addresses";
export declare const LOAD_USER_ADDRESSES_FAIL = "[User] Load User Addresses Fail";
export declare const LOAD_USER_ADDRESSES_SUCCESS = "[User] Load User Addresses Success";
export declare const ADD_USER_ADDRESS = "[User] Add User Address";
export declare const ADD_USER_ADDRESS_FAIL = "[User] Add User Address Fail";
export declare const ADD_USER_ADDRESS_SUCCESS = "[User] Add User Address Success";
export declare const UPDATE_USER_ADDRESS = "[User] Update User Address";
export declare const UPDATE_USER_ADDRESS_FAIL = "[User] Update User Address Fail";
export declare const UPDATE_USER_ADDRESS_SUCCESS = "[User] Update User Address Success";
export declare const DELETE_USER_ADDRESS = "[User] Delete User Address";
export declare const DELETE_USER_ADDRESS_FAIL = "[User] Delete User Address Fail";
export declare const DELETE_USER_ADDRESS_SUCCESS = "[User] Delete User Address Success";
export declare class LoadUserAddresses extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load User Addresses";
    constructor(payload: string);
}
export declare class LoadUserAddressesFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load User Addresses Fail";
    constructor(payload: any);
}
export declare class LoadUserAddressesSuccess extends StateUtils.LoaderSuccessAction {
    payload: Address[];
    readonly type = "[User] Load User Addresses Success";
    constructor(payload: Address[]);
}
export declare class AddUserAddress extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        address: Address;
    };
    readonly type = "[User] Add User Address";
    constructor(payload: {
        userId: string;
        address: Address;
    });
}
export declare class AddUserAddressFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Add User Address Fail";
    constructor(payload: any);
}
export declare class AddUserAddressSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[User] Add User Address Success";
    constructor(payload: any);
}
export declare class UpdateUserAddress extends StateUtils.LoaderLoadAction {
    payload: {
        userId: string;
        addressId: string;
        address: Address;
    };
    readonly type = "[User] Update User Address";
    constructor(payload: {
        userId: string;
        addressId: string;
        address: Address;
    });
}
export declare class UpdateUserAddressFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Update User Address Fail";
    constructor(payload: any);
}
export declare class UpdateUserAddressSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[User] Update User Address Success";
    constructor(payload: any);
}
export declare class DeleteUserAddress extends StateUtils.LoaderLoadAction {
    payload: any;
    readonly type = "[User] Delete User Address";
    constructor(payload: any);
}
export declare class DeleteUserAddressFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Delete User Address Fail";
    constructor(payload: any);
}
export declare class DeleteUserAddressSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[User] Delete User Address Success";
    constructor(payload: any);
}
export type UserAddressesAction = LoadUserAddresses | LoadUserAddressesFail | LoadUserAddressesSuccess | AddUserAddress | AddUserAddressFail | AddUserAddressSuccess | UpdateUserAddress | UpdateUserAddressFail | UpdateUserAddressSuccess | DeleteUserAddress | DeleteUserAddressFail | DeleteUserAddressSuccess;
