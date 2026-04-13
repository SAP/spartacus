/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpRequest } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from '../models/auth-token.model';

/**
 * Extension point for feature-specific auth request handling.
 */
export interface AuthHttpHeaderContributor {
  shouldCatchError?(request: HttpRequest<any>): boolean;
  shouldAddAuthorizationHeader?(request: HttpRequest<any>): boolean;
  alterRequest?(request: HttpRequest<any>, token?: AuthToken): HttpRequest<any>;
  handleExpiredRefreshTokenIfApplicable?():
    | boolean
    | Promise<boolean>
    | Observable<boolean>;
}

export const AUTH_HTTP_HEADER_CONTRIBUTORS = new InjectionToken<
  AuthHttpHeaderContributor[]
>('AUTH_HTTP_HEADER_CONTRIBUTORS');
