/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorModel } from '@spartacus/core';

export function isHttp500Error(err: HttpErrorModel): boolean {
  return !!err?.status && err.status >= 500;
}

export function isAuthorizationError(err: HttpErrorModel): boolean {
  return !!err?.status && err.status === 401;
}

export const opfHttp500ErrorRetry = 2;
export const opfAuthorizationErrorRetry = 2;
