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
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { UnifiedInjector } from '../../lazy-loading/unified-injector';
import { resolveApplicable } from '../../util/applicable';
import { getLastValueSync } from '../../util/rxjs/get-last-value-sync';
import { HttpErrorHandler } from './handlers/http-error.handler';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(protected unifiedInjector: UnifiedInjector) {}

  protected handlers$: Observable<HttpErrorHandler[]> = this.unifiedInjector
    .getMulti(HttpErrorHandler)
    .pipe(shareReplay(1));

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (response: any) => {
          if (response instanceof HttpErrorResponse) {
            this.handleErrorResponse(request, response);
          }
        },
      })
    );
  }

  protected handleErrorResponse(
    request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    const handler = this.getResponseHandler(response);
    if (handler) {
      handler.handleError(request, response);
    }
  }

  /**
   * return the error handler that matches the `HttpResponseStatus` code.
   * If no handler is available, the UNKNOWN handler is returned.
   */
  protected getResponseHandler(
    response: HttpErrorResponse
  ): HttpErrorHandler | undefined {
    return resolveApplicable(getLastValueSync(this.handlers$) ?? [], [
      response,
    ]);
  }
}
