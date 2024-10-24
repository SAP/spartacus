/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthHttpHeaderService } from '../services/auth-http-header.service';

/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    protected authHttpHeaderService: AuthHttpHeaderService,
    protected authConfigService: AuthConfigService
  ) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldCatchError =
      this.authHttpHeaderService.shouldCatchError(httpRequest);
    const shouldAddAuthorizationHeader =
      this.authHttpHeaderService.shouldAddAuthorizationHeader(httpRequest);

    const token$ = shouldAddAuthorizationHeader
      ? // emits sync, unless there is refresh or logout in progress, in which case it emits async
        this.authHttpHeaderService.getStableToken().pipe(take(1))
      : of(undefined);
    const requestAndToken$ = token$.pipe(
      map((token) => ({
        token,
        request: this.authHttpHeaderService.alterRequest(httpRequest, token),
      }))
    );

    return requestAndToken$.pipe(
      switchMap(({ request, token }) =>
        next.handle(request).pipe(
          catchError((errResponse: any) => {
            switch (errResponse.status) {
              case 401: // Unauthorized
                if (this.isExpiredToken(errResponse) && shouldCatchError) {
                  // request failed because of the expired access token
                  // we should get refresh the token and retry the request, or logout if the refresh is missing / expired
                  return this.authHttpHeaderService.handleExpiredAccessToken(
                    request,
                    next,
                    token
                  );
                } else if (
                  // Refresh the expired token
                  // Check if the OAuth endpoint was called and the error is because the refresh token expired
                  this.errorIsInvalidToken(errResponse)
                ) {
                  this.authHttpHeaderService.handleExpiredRefreshToken();
                  return EMPTY;
                }
                break;
              case 400: // Bad Request
                if (
                  this.errorIsInvalidGrant(errResponse) &&
                  request.body.get('grant_type') === 'refresh_token'
                ) {
                  this.authHttpHeaderService.handleExpiredRefreshToken();
                }
                break;
            }
            throw errResponse;
          })
        )
      )
    );
  }

  protected errorIsInvalidToken(errResponse: HttpErrorResponse): boolean {
    const authHeader = errResponse.headers.get('www-authenticate');
    if (!this.authConfigService.getOAuthLibConfig().disablePKCE && authHeader) {
      const parts = authHeader.split(',').map((part) => part.trim());
      const errorPart = parts.find((part) => part.startsWith('Bearer error='));
      const errorDetails = errorPart
        ? errorPart.split('=')[1].replace(/"/g, '')
        : '';

      return errorDetails === 'invalid_token' ?? false;
    } else {
      return (
        (errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
          errResponse.error.error === 'invalid_token') ??
        false
      );
    }
  }

  protected errorIsInvalidGrant(errResponse: HttpErrorResponse): boolean {
    return (
      (errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
        errResponse.error.error === 'invalid_grant') ??
      false
    );
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    const isLogoutProcess =
      resp.error?.errors?.[0]?.message === 'Access is denied';
    if (
      !this.authConfigService.getOAuthLibConfig().disablePKCE &&
      !isLogoutProcess
    ) {
      return resp.error?.errors?.[0]?.type === 'AccessDeniedError';
    }
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
