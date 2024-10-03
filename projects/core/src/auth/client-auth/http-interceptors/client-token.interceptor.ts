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
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  USE_CLIENT_TOKEN,
} from '../../../occ/utils/interceptor-util';
import { ClientToken } from '../models/client-token.model';
import { ClientErrorHandlingService } from '../services/client-error-handling.service';
import { ClientTokenService } from '../services/client-token.service';

/**
 * Interceptor for handling requests with `USE_CLIENT_TOKEN` header.
 * Provides `Authorization` header with client token and handles errors related to client auth.
 */
@Injectable({ providedIn: 'root' })
export class ClientTokenInterceptor implements HttpInterceptor {
  constructor(
    protected clientTokenService: ClientTokenService,
    protected clientErrorHandlingService: ClientErrorHandlingService,
    protected occEndpoints: OccEndpointsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isClientTokenRequest = this.isClientTokenRequest(request);
    if (isClientTokenRequest) {
      request = InterceptorUtil.removeHeader(USE_CLIENT_TOKEN, request);
    }

    return this.getClientToken(isClientTokenRequest).pipe(
      take(1),
      switchMap((token: ClientToken | undefined) => {
        if (
          token?.access_token &&
          request.url.includes(this.occEndpoints.getBaseUrl())
        ) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type || 'Bearer'} ${
                token.access_token
              }`,
            },
          });
        }

        return next.handle(request).pipe(
          catchError((errResponse: any) => {
            if (
              errResponse instanceof HttpErrorResponse &&
              errResponse.status === 401 &&
              isClientTokenRequest &&
              this.isExpiredToken(errResponse)
            ) {
              return this.clientErrorHandlingService.handleExpiredClientToken(
                request,
                next
              );
            }
            throw errResponse;
          })
        );
      })
    );
  }

  protected getClientToken(
    isClientTokenRequest: boolean
  ): Observable<ClientToken | undefined> {
    if (isClientTokenRequest) {
      return this.clientTokenService.getClientToken();
    }
    return of(undefined);
  }

  protected isClientTokenRequest(request: HttpRequest<any>): boolean {
    const isRequestMapping = InterceptorUtil.getInterceptorParam(
      USE_CLIENT_TOKEN,
      request.headers
    );
    return Boolean(isRequestMapping);
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
