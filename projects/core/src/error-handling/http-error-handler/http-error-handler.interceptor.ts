/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * This interceptor forwards all HTTP errors (e.g. 5xx or 4xx status response from backend)
 * to Angular `ErrorHandler`.
 *
 * Thanks to this, in SSR, any HTTP error from backend can potentially mark the Server-Side Rendering
 * as an error and therefore allow for sending an appropriate error response to a final client of SSR.
 */
@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {
  private blockedRequests: string[] = [
    'product',
    // 'review'
    // 'references'
    //   'search'
  ];

  constructor(protected errorHandler: ErrorHandler) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {
          if (this.isRequestBlocked(request.url)) {
            // const errorMessage = 'This request is blocked';
            // const error = new HttpErrorResponse({
            //   error: errorMessage,
            //   status: 400,
            //   statusText: errorMessage,
            //   url: request.url,
            // });
            const error = new Error('NgRx test error')
            throw error;
          }
        }
        //   {
        //   error: (error) => {
        //     this.handleError(error);
        //   },
        // }
      )
    );
  }

  protected handleError(error: HttpErrorResponse): void {
    this.errorHandler.handleError(error);
  }

  private isRequestBlocked(url: string): boolean {
    return this.blockedRequests.some((blockedUrl) => url.includes(blockedUrl));
  }
}
