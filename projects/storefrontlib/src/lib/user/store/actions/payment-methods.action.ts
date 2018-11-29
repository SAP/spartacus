import { Action } from '@ngrx/store';
import { PaymentDetails } from '@spartacus/core';

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

export class LoadUserPaymentMethods implements Action {
  readonly type = LOAD_USER_PAYMENT_METHODS;
  constructor(public payload: string) {}
}

export class LoadUserPaymentMethodsFail implements Action {
  readonly type = LOAD_USER_PAYMENT_METHODS_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserPaymentMethodsSuccess implements Action {
  readonly type = LOAD_USER_PAYMENT_METHODS_SUCCESS;
  constructor(public payload: PaymentDetails[]) {}
}

export class SetDefaultUserPaymentMethod implements Action {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD;
  constructor(public payload: any) {}
}

export class SetDefaultUserPaymentMethodFail implements Action {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_FAIL;
  constructor(public payload: any) {}
}

export class SetDefaultUserPaymentMethodSuccess implements Action {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteUserPaymentMethod implements Action {
  readonly type = DELETE_USER_PAYMENT_METHOD;
  constructor(public payload: any) {}
}

export class DeleteUserPaymentMethodFail implements Action {
  readonly type = DELETE_USER_PAYMENT_METHOD_FAIL;
  constructor(public payload: any) {}
}

export class DeleteUserPaymentMethodSuccess implements Action {
  readonly type = DELETE_USER_PAYMENT_METHOD_SUCCESS;
  constructor(public payload: any) {}
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
