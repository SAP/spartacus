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

export class LoadCdcUserTokenFail implements ErrorAction {
  error: ErrorModel | HttpErrorModel | Error = this.payload.error;
  readonly type = LOAD_CDC_USER_TOKEN_FAIL;

  constructor(payload: {
    error: ActionErrorProperty;
    initialActionPayload: LoadUserTokenPayload;
  });
  /**
   * @deprecated Please use the `error` parameter with a non-null, non-undefined value.
   *             Support for `null` or `undefined` will be removed in future versions,
   *             along with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing deprecated constructor
    payload: {
      error: any;
      initialActionPayload: LoadUserTokenPayload;
    }
  );
  constructor(
    public payload: {
      error: any;
      initialActionPayload: LoadUserTokenPayload;
    }
  ) {}
}

export class LoadCdcUserToken implements Action {
  readonly type = LOAD_CDC_USER_TOKEN;

  constructor(public payload: LoadUserTokenPayload) {}
}

export type CdcUserTokenAction = LoadCdcUserToken | LoadCdcUserTokenFail;
