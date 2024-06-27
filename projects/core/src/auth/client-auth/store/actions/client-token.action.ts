/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionErrorProperty } from '@spartacus/core';
import { StateUtils } from '../../../../state/utils/index';
import { ClientToken } from '../../models/client-token.model';
import { CLIENT_TOKEN_DATA } from '../client-auth-state';

export const LOAD_CLIENT_TOKEN = '[Token] Load Client Token';
export const LOAD_CLIENT_TOKEN_FAIL = '[Token] Load Client Token Fail';
export const LOAD_CLIENT_TOKEN_SUCCESS = '[Token] Load Client Token Success';

export class LoadClientToken extends StateUtils.LoaderLoadAction {
  readonly type = LOAD_CLIENT_TOKEN;

  constructor() {
    super(CLIENT_TOKEN_DATA);
  }
}

export class LoadClientTokenFail extends StateUtils.LoaderFailAction {
  readonly type = LOAD_CLIENT_TOKEN_FAIL;

  /**
   * @deprecated Please use `error` parameter other than `null` or `undefined`.
   *
   *             Note: Allowing for `null` or `undefined` will be removed in future versions
   *             together with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   **/
  constructor(error: null | undefined);
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- for distinguishing non-deprecated constructor
    error: ActionErrorProperty
  );
  constructor(public error: any) {
    super(CLIENT_TOKEN_DATA, error);
  }
}

export class LoadClientTokenSuccess extends StateUtils.LoaderSuccessAction {
  readonly type = LOAD_CLIENT_TOKEN_SUCCESS;

  constructor(public payload: ClientToken) {
    super(CLIENT_TOKEN_DATA);
  }
}

export type ClientTokenAction =
  | LoadClientToken
  | LoadClientTokenFail
  | LoadClientTokenSuccess;
