/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
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
import { FileReaderService } from 'projects/storefrontlib/shared/services/file/file-reader.service';
import { Observable, of, throwError } from 'rxjs';
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
    protected authConfigService: AuthConfigService,
    protected fileReaderService: FileReaderService
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
          catchError((errResponse: any) => this.handleBlobErrors(errResponse)),
          catchError((errResponse: any) => {
            if (errResponse instanceof HttpErrorResponse) {
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
                    errResponse.url?.includes(
                      this.authConfigService.getTokenEndpoint()
                    ) &&
                    errResponse.error.error === 'invalid_token'
                  ) {
                    this.authHttpHeaderService.handleExpiredRefreshToken();
                    return of<HttpEvent<any>>();
                  }

                  break;
                case 400: // Bad Request
                  if (
                    errResponse.url?.includes(
                      this.authConfigService.getTokenEndpoint()
                    ) &&
                    errResponse.error.error === 'invalid_grant'
                  ) {
                    if (request.body.get('grant_type') === 'refresh_token') {
                      this.authHttpHeaderService.handleExpiredRefreshToken();
                    }
                  }
                  break;
              }
            }
            return throwError(errResponse);
          })
        )
      )
    );
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }

  // If the response error is a blob of type HttpErrorResonse: extract the error from blob to JSON
  // Otherwise: rethrow the error
  protected handleBlobErrors(errResponse: any): Observable<never> {
    if (
      errResponse instanceof HttpErrorResponse &&
      errResponse?.error instanceof Blob
    ) {
      const blob = new Blob([errResponse.error]) as File;
      return this.fileReaderService.loadTextFile(blob).pipe(
        switchMap((unparsedError: any) => {
          const error = JSON.parse(unparsedError);
          return throwError(
            new HttpErrorResponse({
              ...errResponse,
              error,
              url: errResponse.url ?? undefined,
            })
          );
        })
      );
    } else {
      return throwError(errResponse);
    }
  }
}
