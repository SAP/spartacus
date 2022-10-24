/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { NEVER, Observable, of, throwError, TimeoutError } from 'rxjs';
import { catchError, startWith, switchMap, timeout } from 'rxjs/operators';
import { SSR_BACKEND_REQUEST_TIMEOUT_CONFIG } from './ssr-backend-request-timeout.config';

// SPIKE TODO: add ability to pass custom value via HttpContextToken

@Injectable({ providedIn: 'root' })
export class SsrBackendRequestTimeoutInterceptor implements HttpInterceptor {
  constructor(protected windowRef: WindowRef) {}

  /**
   * Configurable timeout time in milliseconds, for backend requests.
   */
  protected readonly TIMEOUT = inject(SSR_BACKEND_REQUEST_TIMEOUT_CONFIG);

  /**
   * The error message to be used in the `HttpErrorResponse` object, in case of timeout.
   */
  protected readonly HTTP_ERROR_MESSAGE =
    '[Spartacus] timeout backend request in SSR';

  /**
   * The HTTP status code to be used in the `HttpErrorResponse` object, in case of timeout.
   */
  protected readonly HTTP_STATUS = 504;

  /**
   * In SSR, it timeouts requests that take longer than the specified timeout.
   * In client, it does nothing.
   *
   * We need to manually manually timeout backend requests in SSR,
   * because (in contrast to browsers), NodeJS process doesn't timeout requests automatically.
   *
   * It starts counting time for timeout only after the request is sent.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // SPIKE TODO - UNCOMMENT IT:
    // if (this.windowRef.isBrowser()) {
    //   return next.handle(request);
    // }

    // Note: A naive implementation would be just `next.handle(request).pipe(timeout(xxx))`.
    //       But then it would start counting time immediately, which might be too early. We don't want to count
    //       the time spent before the request is actually sent, e.g. time of executing other HTTP_INTERCEPTORS in the chain.
    return next.handle(request).pipe(
      switchMap((event) => {
        // When event `Sent` happens, let's start counting time for timeout.
        // But when event `Response` is received, switchMap will unsubscribe from the following timeout observable.
        if (event.type === HttpEventType.Sent) {
          return NEVER.pipe(startWith(event), timeout(this.TIMEOUT));
        }
        return of(event);
      }),
      catchError((error) =>
        this.convertTimeoutToHttpErrorResponse(error, request)
      )
    );
  }

  /**
   * In case of the RxJs `TimeoutError` (caused by the `timeout()` operator),
   * it converts it to a manually crafted `HttpErrorResponse` object.
   *
   * Otherwise, it just rethrows the error.
   */
  protected convertTimeoutToHttpErrorResponse(
    error: any,
    request: HttpRequest<any>
  ): Observable<any> {
    if (error instanceof TimeoutError) {
      const httpErrorResponse = new HttpErrorResponse({
        url: request.url,
        status: this.HTTP_STATUS,
        error: this.HTTP_ERROR_MESSAGE,
      });

      console.error(httpErrorResponse); // SPIKE TODO REMOVE

      return throwError(httpErrorResponse);
    }
    return throwError(error);
  }
}
