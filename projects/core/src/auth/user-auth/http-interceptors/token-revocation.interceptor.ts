/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from '../services/auth-storage.service';

/**
 * This interceptor is dedicated for Hybris OAuth server which requires `Authorization` header for revoke token calls.
 */
@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  protected authStorageService = inject(AuthStorageService);
  protected authConfigService = inject(AuthConfigService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isEnabled = this.authConfigService.sendAuthHeaderOnRevoke();
    if (!isEnabled) {
      return next.handle(request);
    }

    const isTokenRevocationRequest = this.isTokenRevocationRequest(request);
    return this.authStorageService.getToken().pipe(
      take(1),
      switchMap((token) => {
        if (isTokenRevocationRequest) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type || 'Bearer'} ${
                token.access_token
              }`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }

  protected isTokenRevocationRequest(request: HttpRequest<any>): boolean {
    return request.url === this.authConfigService.getRevokeEndpoint();
  }
}
