import { USER_PAYMENT_METHODS } from '../user-state';
import { PaymentDetails } from '../../../occ/occ-models/index';
import {
  LoaderLoadAction,
  LoaderFailAction,
  LoaderSuccessAction
} from '../../../state/utils/loader/loader.action';

export const LOAD_USER_PAYMENT_METHODS = '[User] Load User Payment Methods';
export const LOAD_USER_PAYMENT_METHODS_FAIL =
  '[User] Load User Payment Methods Fail';
export const LOAD_USER_PAYMENT_METHODS_SUCCESS =
  '[User] Load User Payment Methods Success';

export const SET_DEFAULT_USER_PAYMENT_METHOD =
  '[User] Set Default User Payment Method';
export const SET_DEFAULT_USER_PAYMENT_METHOD_FAIL =
  '[User] Set Default User Payment Method Fail';
export const SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS =
  '[User] Set Default User Payment Method Success';

export const DELETE_USER_PAYMENT_METHOD = '[User] Delete User Payment Method';
export const DELETE_USER_PAYMENT_METHOD_FAIL =
  '[User] Delete User Payment Method Fail';
export const DELETE_USER_PAYMENT_METHOD_SUCCESS =
  '[User] Delete User  Payment Method Success';

export class LoadUserPaymentMethods extends LoaderLoadAction {
  readonly type = LOAD_USER_PAYMENT_METHODS;
  constructor(public payload: string) {
    super(USER_PAYMENT_METHODS);
  }
}

export class LoadUserPaymentMethodsFail extends LoaderFailAction {
  readonly type = LOAD_USER_PAYMENT_METHODS_FAIL;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS, payload);
  }
}

export class LoadUserPaymentMethodsSuccess extends LoaderSuccessAction {
  readonly type = LOAD_USER_PAYMENT_METHODS_SUCCESS;
  constructor(public payload: PaymentDetails[]) {
    super(USER_PAYMENT_METHODS);
  }
}

export class SetDefaultUserPaymentMethod extends LoaderLoadAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class SetDefaultUserPaymentMethodFail extends LoaderFailAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_FAIL;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS, payload);
  }
}

export class SetDefaultUserPaymentMethodSuccess extends LoaderSuccessAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class DeleteUserPaymentMethod extends LoaderLoadAction {
  readonly type = DELETE_USER_PAYMENT_METHOD;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class DeleteUserPaymentMethodFail extends LoaderFailAction {
  readonly type = DELETE_USER_PAYMENT_METHOD_FAIL;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS, payload);
  }
}

export class DeleteUserPaymentMethodSuccess extends LoaderSuccessAction {
  readonly type = DELETE_USER_PAYMENT_METHOD_SUCCESS;
  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

// action types
export type UserPaymentMethodsAction =
  | LoadUserPaymentMethods
  | LoadUserPaymentMethodsFail
  | LoadUserPaymentMethodsSuccess
  | SetDefaultUserPaymentMethod
  | SetDefaultUserPaymentMethodFail
  | SetDefaultUserPaymentMethodSuccess
  | DeleteUserPaymentMethod
  | DeleteUserPaymentMethodFail
  | DeleteUserPaymentMethodSuccess;
