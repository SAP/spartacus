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
import { HttpResponseStatus } from '../../global-message';
import { OccEndpointsService } from '../../occ';
import { WindowRef } from '../../window';

/**
 * Represents an HTTP error response for a CMS page not found.
 */
export type CmsPageNotFoundHttpErrorResponse = HttpErrorResponse & {
  cxCmsPageNotFound: boolean;
};

/**
 * This interceptor forwards all HTTP errors (e.g. 5xx or 4xx status response from backend)
 * to Angular `ErrorHandler`.
 *
 * Thanks to this, in SSR, any HTTP error from backend can potentially mark the Server-Side Rendering
 * as an error and therefore allow for sending an appropriate error response to a final client of SSR.
 */
@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  protected errorHandler = inject(ErrorHandler);
  protected occEndpointsService = inject(OccEndpointsService);
  protected windowRef = inject(WindowRef);
  private featureService = inject(FeatureConfigService);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (error) => {
          if (
            this.featureService.isEnabled(
              'ssrStrictErrorHandlingForHttpAndNgrx'
            ) &&
            // We avoid sending unpredictable errors to the browser's console, to prevent
            // possibly exposing there potentially confidential user's data.
            // This isn't an issue in SSR, where pages are rendered anonymously.
            // Moreover, in SSR we want to capture all app's errors, so we can potentially send
            // a HTTP error response (e.g. 500 error page) from SSR to a client.
            !this.windowRef.isBrowser()
          ) {
            this.handleError(
              this.isCmsPageNotFound(error)
                ? {
                    ...error,
                    cxCmsPageNotFound: true,
                  }
                : error
            );
          }
        },
      })
    );
  }

  protected handleError(error: HttpErrorResponse): void {
    this.errorHandler.handleError(error);
  }

  /**
   * Checks if the error corresponds to a CMS page not found.
   *
   * @param error - The error object to check.
   * @returns `true` if the error corresponds to a CMS page not found, `false` otherwise.
   */
  protected isCmsPageNotFound(error: unknown): boolean {
    const expectedUrl = this.occEndpointsService.buildUrl('pages');
    return (
      error instanceof HttpErrorResponse &&
      error.status === HttpResponseStatus.NOT_FOUND &&
      (error.url ?? '').startsWith(expectedUrl)
    );
  }
}
