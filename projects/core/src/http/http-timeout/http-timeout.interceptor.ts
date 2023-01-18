/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { Injectable } from '@angular/core';
import { NEVER, Observable, of, TimeoutError } from 'rxjs';
import { catchError, startWith, switchMap, timeout } from 'rxjs/operators';
import { OccConfig } from '../../occ/config/occ-config';
import { WindowRef } from '../../window/window-ref';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';

/**
 * It throws an error when a request takes longer than the specified time.
 */
@Injectable({ providedIn: 'root' })
export class HttpTimeoutInterceptor implements HttpInterceptor {
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
      const httpErrorResponse = new HttpErrorResponse({
        url: request.url,
        statusText: this.getHttpErrorMessage(timeoutValue),
        error,
      });
      return httpErrorResponse;
    }
    return error;
  }

  /**
   * Returns the error message to be used in the `HttpErrorResponse` object, in case of timeout.
   */
  protected getHttpErrorMessage(timeoutValue: number): string {
    return `[Spartacus] Timeout: Request exceeded time ${timeoutValue}ms and was terminated`;
  }
}
