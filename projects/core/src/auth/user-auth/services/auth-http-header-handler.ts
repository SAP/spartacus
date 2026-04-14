/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Handler for expired refresh token scenarios.
 * Example use case: when a punchout session is active, this handler can use
 * `handleExpiredRefreshTokenIfApplicable` to take over
 * `handleExpiredRefreshToken()` behavior, for example by ending the punchout
 * session.
 */
export interface ExpiredRefreshTokenHandler {
  handleExpiredRefreshTokenIfApplicable?(): Observable<boolean>;
}

export const EXPIRED_REFRESH_TOKEN_HANDLERS = new InjectionToken<
  ExpiredRefreshTokenHandler[]
>('EXPIRED_REFRESH_TOKEN_HANDLERS');
