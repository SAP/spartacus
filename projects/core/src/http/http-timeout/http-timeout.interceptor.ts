/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
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
import { Injectable, inject } from '@angular/core';
import { NEVER, Observable, TimeoutError, of } from 'rxjs';
import { catchError, startWith, switchMap, timeout } from 'rxjs/operators';
import { LoggerService } from '../../logger';
import { OccConfig } from '../../occ/config/occ-config';
import { WindowRef } from '../../window/window-ref';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';

/**
 * It throws an error when a request takes longer than the specified time.
 */
@Injectable({ providedIn: 'root' })
export class HttpTimeoutInterceptor implements HttpInterceptor {
  protected logger = inject(LoggerService);

  constructor(protected windowRef: WindowRef, protected config: OccConfig) {}

  /**
   * It throws an error when a request takes longer than the specified time.
   *
   * It starts counting time for timeout only after the request is sent.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const timeoutValue = this.getTimeoutValue(request);
    if (typeof timeoutValue === 'undefined') {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      switchMap((event) => {
        // When event `HttpEventType.Sent` happens, let's start counting time for timeout.
        // But when event `HttpEventType.Response` is received, `switchMap` will unsubscribe from the following timeout observable.
        if (event.type === HttpEventType.Sent) {
          return NEVER.pipe(startWith(event), timeout(timeoutValue));
        }
        return of(event);
      }),
      catchError((error) => {
        throw this.convertTimeoutToHttpErrorResponse({
          error,
          request,
          timeoutValue,
        });
      })
    );
  }

  /**
   * Returns the configured timeout value for the given request.
   *
   * The timeout can be configured specifically for a certain request
   * via HttpContextToken `HTTP_TIMEOUT_CONFIG`. When it's not available,
   * the value is taken from the global config `config.backend.timeout`.
   *
   * Depending on the platform (browser or server), the configured timeout value can be different.
   */
  protected getTimeoutValue(request: HttpRequest<unknown>): number | undefined {
    const localTimeoutConfig = request.context.get(HTTP_TIMEOUT_CONFIG);
    const globalTimeoutConfig = this.config?.backend?.timeout;
    const timeoutConfig = localTimeoutConfig ?? globalTimeoutConfig ?? {};
    return this.windowRef.isBrowser()
      ? timeoutConfig?.browser
      : timeoutConfig?.server;
  }

  /**
   * It converts an RxJs `TimeoutError` (caused by the `timeout()` operator),
   * to a manually crafted `HttpErrorResponse` object.
   *
   * If the error is not an RxJs `TimeoutError`, it just returns the original error.
   */
  protected convertTimeoutToHttpErrorResponse({
    error,
    request,
    timeoutValue,
  }: {
    error: unknown;
    request: HttpRequest<unknown>;
    timeoutValue: number;
  }): unknown | HttpErrorResponse {
    if (error instanceof TimeoutError) {
      // create a new Error here, to record the current stacktrace (which is not present in RxJs TimeoutError)
      const cxHttpTimeoutError = this.buildError(request, timeoutValue);

      return new HttpErrorResponse({
        url: request.url,
        error: cxHttpTimeoutError,
      });
    }
    return error;
  }

  protected buildError(
    request: HttpRequest<unknown>,
    timeoutValue: number
  ): Error {
    const message = `Request to URL '${request.url}' exceeded expected time of ${timeoutValue}ms and was aborted.`;

    // If an HTTP call times out, it is considered an unexpected error.
    // To assist with troubleshooting, the error is logged to the console.
    this.logger.warn(message);

    return new Error(message);
  }
}
