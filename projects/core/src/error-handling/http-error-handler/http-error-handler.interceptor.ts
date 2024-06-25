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
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeatureConfigService } from '../../features-config';
import { WindowRef } from '../../window';

/**
 * This interceptor forwards all HTTP errors (e.g. 5xx or 4xx status response from backend)
 * to Angular `ErrorHandler`.
 *
 * Thanks to this, in SSR, any HTTP error from backend can potentially mark the Server-Side Rendering
 * as an error and therefore allow for sending an appropriate error response to a final client of SSR.
 */
@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  errorHandler = inject(ErrorHandler);
  featureService = inject(FeatureConfigService);
  windowRef = inject(WindowRef);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (error) => {
          if (
            this.featureService.isEnabled('strictHttpAndNgrxErrorHandling') &&
            !this.windowRef.isBrowser() // handle only in SSR
          ) {
            this.handleError(error);
          }
        },
      })
    );
  }

  protected handleError(error: HttpErrorResponse): void {
    this.errorHandler.handleError(error);
  }
}
