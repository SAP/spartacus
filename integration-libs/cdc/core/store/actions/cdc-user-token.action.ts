/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import {
  ActionErrorProperty,
  ErrorAction,
  ErrorModel,
  HttpErrorModel,
} from '@spartacus/core';

export const LOAD_CDC_USER_TOKEN = '[Auth] Load CDC User Token';
export const LOAD_CDC_USER_TOKEN_FAIL = '[Auth] Load CDC User Token Fail';

interface LoadUserTokenPayload {
  UID: string;
  UIDSignature: string;
  signatureTimestamp: string;
  idToken: string;
  baseSite: string;
}

interface LoadUserTokenFailurePayload {
  error: ActionErrorProperty;
  initialActionPayload: LoadUserTokenPayload;
}

interface DeprecatedLoadUserTokenFailurePayload
  extends Omit<LoadUserTokenFailurePayload, 'error'> {
  error: null | undefined;
}

export class LoadCdcUserTokenFail implements ErrorAction {
  error: ErrorModel | HttpErrorModel | Error = this.payload.error;
  readonly type = LOAD_CDC_USER_TOKEN_FAIL;

  constructor(error: LoadUserTokenFailurePayload);
  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing deprecated constructor
    payload: any
  );
  constructor(public payload: LoadUserTokenFailurePayload & { error: any }) {}
}

export class LoadCdcUserToken implements Action {
  readonly type = LOAD_CDC_USER_TOKEN;

  constructor(public payload: LoadUserTokenPayload) {}
}

export type CdcUserTokenAction = LoadCdcUserToken | LoadCdcUserTokenFail;
