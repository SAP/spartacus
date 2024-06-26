/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionErrorProperty } from '../../../model/index';
import { PaymentDetails } from '../../../model/payment.model';
import { StateUtils } from '../../../state/utils/index';
import { USER_PAYMENT_METHODS } from '../user-state';

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

export class LoadUserPaymentMethods extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_USER_PAYMENT_METHODS;

  constructor(public payload: string) {
    super(USER_PAYMENT_METHODS);
  }
}

export class LoadUserPaymentMethodsFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_USER_PAYMENT_METHODS_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {
    super(USER_PAYMENT_METHODS, error);
  }
}

export class LoadUserPaymentMethodsSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_USER_PAYMENT_METHODS_SUCCESS;

  constructor(public payload: PaymentDetails[]) {
    super(USER_PAYMENT_METHODS);
  }
}

export class SetDefaultUserPaymentMethod extends StateUtils.LoaderLoadAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD;

  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class SetDefaultUserPaymentMethodFail extends StateUtils.LoaderFailAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {
    super(USER_PAYMENT_METHODS, error);
  }
}

export class SetDefaultUserPaymentMethodSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = SET_DEFAULT_USER_PAYMENT_METHOD_SUCCESS;

  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class DeleteUserPaymentMethod extends StateUtils.LoaderLoadAction {
  readonly type = DELETE_USER_PAYMENT_METHOD;

  constructor(public payload: any) {
    super(USER_PAYMENT_METHODS);
  }
}

export class DeleteUserPaymentMethodFail extends StateUtils.LoaderFailAction {
  readonly type = DELETE_USER_PAYMENT_METHOD_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {
    super(USER_PAYMENT_METHODS, error);
  }
}

export class DeleteUserPaymentMethodSuccess extends StateUtils.LoaderSuccessAction {
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
