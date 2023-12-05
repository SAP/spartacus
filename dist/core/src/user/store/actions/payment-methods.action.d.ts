import { PaymentDetails } from '../../../model/payment.model';
import { StateUtils } from '../../../state/utils/index';
export declare const LOAD_USER_PAYMENT_METHODS = "[User] Load User Payment Methods";
export declare const LOAD_USER_PAYMENT_METHODS_FAIL = "[User] Load User Payment Methods Fail";
export declare const LOAD_USER_PAYMENT_METHODS_SUCCESS = "[User] Load User Payment Methods Success";
export declare const SET_DEFAULT_USER_PAYMENT_METHOD = "[User] Set Default User Payment Method";
export declare const SET_DEFAULT_USER_PAYMENT_METHOD_FAIL = "[User] Set Default User Payment Method Fail";
export declare const SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS = "[User] Set Default User Payment Method Success";
export declare const DELETE_USER_PAYMENT_METHOD = "[User] Delete User Payment Method";
export declare const DELETE_USER_PAYMENT_METHOD_FAIL = "[User] Delete User Payment Method Fail";
export declare const DELETE_USER_PAYMENT_METHOD_SUCCESS = "[User] Delete User  Payment Method Success";
export declare class LoadUserPaymentMethods extends StateUtils.LoaderLoadAction {
    payload: string;
    readonly type = "[User] Load User Payment Methods";
    constructor(payload: string);
}
export declare class LoadUserPaymentMethodsFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Load User Payment Methods Fail";
    constructor(payload: any);
}
export declare class LoadUserPaymentMethodsSuccess extends StateUtils.LoaderSuccessAction {
    payload: PaymentDetails[];
    readonly type = "[User] Load User Payment Methods Success";
    constructor(payload: PaymentDetails[]);
}
export declare class SetDefaultUserPaymentMethod extends StateUtils.LoaderLoadAction {
    payload: any;
    readonly type = "[User] Set Default User Payment Method";
    constructor(payload: any);
}
export declare class SetDefaultUserPaymentMethodFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Set Default User Payment Method Fail";
    constructor(payload: any);
}
export declare class SetDefaultUserPaymentMethodSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[User] Set Default User Payment Method Success";
    constructor(payload: any);
}
export declare class DeleteUserPaymentMethod extends StateUtils.LoaderLoadAction {
    payload: any;
    readonly type = "[User] Delete User Payment Method";
    constructor(payload: any);
}
export declare class DeleteUserPaymentMethodFail extends StateUtils.LoaderFailAction {
    payload: any;
    readonly type = "[User] Delete User Payment Method Fail";
    constructor(payload: any);
}
export declare class DeleteUserPaymentMethodSuccess extends StateUtils.LoaderSuccessAction {
    payload: any;
    readonly type = "[User] Delete User  Payment Method Success";
    constructor(payload: any);
}
export type UserPaymentMethodsAction = LoadUserPaymentMethods | LoadUserPaymentMethodsFail | LoadUserPaymentMethodsSuccess | SetDefaultUserPaymentMethod | SetDefaultUserPaymentMethodFail | SetDefaultUserPaymentMethodSuccess | DeleteUserPaymentMethod | DeleteUserPaymentMethodFail | DeleteUserPaymentMethodSuccess;
