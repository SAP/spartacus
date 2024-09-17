/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorModel } from '../model/misc.model';

/**
 * A helper function for detecting JaloObjectNoLongerValidError errors
 */
export function isJaloError(err: HttpErrorModel): boolean {
  return err.details?.[0]?.type === 'JaloObjectNoLongerValidError';
}

/**
 * A helper function for detecting server (500 and above) code errors
 */
export function isServerError(err: HttpErrorModel): boolean {
  return !!err?.status && err.status >= 500 && err.status <= 511;
}

/**
 * A helper function for detecting 401 code errors
 */
export function isAuthorizationError(err: HttpErrorModel): boolean {
  return !!err?.status && err.status === 401;
}

export const DEFAULT_SERVER_ERROR_RETRIES_COUNT = 2;
export const DEFAULT_AUTHORIZATION_ERROR_RETRIES_COUNT = 2;
