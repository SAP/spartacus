/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Extension point for feature-specific auth request handling.
 */
export interface AuthHttpHeaderContributor {
  handleExpiredRefreshTokenIfApplicable?(): Observable<boolean>;
}

export const AUTH_HTTP_HEADER_CONTRIBUTORS = new InjectionToken<
  AuthHttpHeaderContributor[]
>('AUTH_HTTP_HEADER_CONTRIBUTORS');
