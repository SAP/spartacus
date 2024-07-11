/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Action } from '@ngrx/store';
import { ErrorAction } from '@spartacus/core';

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
  error: any;
  initialActionPayload: LoadUserTokenPayload;
}

export class LoadCdcUserTokenFail implements ErrorAction {
  public error: any;
  readonly type = LOAD_CDC_USER_TOKEN_FAIL;

  constructor(public payload: LoadUserTokenFailurePayload) {
    this.error = payload.error;
  }
}

export class LoadCdcUserToken implements Action {
  readonly type = LOAD_CDC_USER_TOKEN;

  constructor(public payload: LoadUserTokenPayload) {}
}

export type CdcUserTokenAction = LoadCdcUserToken | LoadCdcUserTokenFail;
