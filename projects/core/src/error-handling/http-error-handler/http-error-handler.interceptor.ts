/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { HttpResponseStatus } from '../../global-message';
import { OccEndpointsService } from '../../occ';
import { WindowRef } from '../../window';
import {
  CmsPageNotFoundOutboundHttpError,
  OutboundHttpError,
} from './outbound-http-error';

/**
 * This interceptor forwards all HTTP errors (e.g. 5xx or 4xx status response from backend)
 * to Angular `ErrorHandler`.
 *
 * Thanks to this, in SSR, any HTTP error from backend can potentially mark the Server-Side Rendering
 * as an error and therefore allow for sending an appropriate error response to a final client of SSR.
 *
 * NOTE: It handles not only HTTP errors, but also any RxJs errors
 * (e.g., `TimeoutError` from `timeout()` operator) thrown in any subsequent interceptor.
 *
 * CAUTION: It MUST be provided as the first one in the application to be able to
 *          catch errors from all subsequent interceptors.
 */
@Injectable({ providedIn: 'root' })
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  protected errorHandler = inject(ErrorHandler);
  protected occEndpointsService = inject(OccEndpointsService);
  protected windowRef = inject(WindowRef);
  private featureService = inject(FeatureConfigService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (error: unknown) => {
          if (
            this.featureService.isEnabled(
              'ssrStrictErrorHandlingForHttpAndNgrx'
            ) &&
            this.shouldHandleError(error)
          ) {
            this.handleError(error);
          }
        },
      })
    );
  }

  /**
   * Determine if the error should be handled by the `ErrorHandler`.
   *
   * Be default, we avoid sending unpredictable errors to the browser's console, to prevent
   * possibly exposing there potentially confidential user's data.
   * This isn't an issue in SSR, where pages are rendered anonymously.
   * Moreover, in SSR we want to capture all app's errors, so we can potentially send
   * a HTTP error response (e.g. 500 error page) from SSR to a client.
   */
  protected shouldHandleError(_error: unknown): boolean {
    return !this.windowRef.isBrowser();
  }

  protected handleError(error: unknown): void {
    error = this.isCmsPageNotFoundHttpError(error)
      ? new CmsPageNotFoundOutboundHttpError(error)
      : new OutboundHttpError(error);
    this.errorHandler.handleError(error);
  }

  /**
   * Checks if the error corresponds to a CMS page not found HTTP error.
   *
   * @param error - The error object to check.
   * @returns `true` if the error corresponds to a CMS page not found HTTP error, `false` otherwise.
   */
  protected isCmsPageNotFoundHttpError(error: unknown): boolean {
    const expectedUrl = this.occEndpointsService.buildUrl('pages');
    return (
      error instanceof HttpErrorResponse &&
      error.status === HttpResponseStatus.NOT_FOUND &&
      (error.url ?? '').startsWith(expectedUrl)
    );
  }
}
