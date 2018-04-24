import { Action } from '@ngrx/store';

export const LOAD_USER_PAYMENT_METHODS = '[User] Load User Payment Methods';
export const LOAD_USER_PAYMENT_METHODS_FAIL =
  '[User] Load User Payment Methods Fail';
export const LOAD_USER_PAYMENT_METHODS_SUCCESS =
  '[User] Load User Payment Methods Success';

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
  constructor(public payload: any) {}
}

// action types
export type UserPaymentMethodsAction =
  | LoadUserPaymentMethods
  | LoadUserPaymentMethodsFail
  | LoadUserPaymentMethodsSuccess;
