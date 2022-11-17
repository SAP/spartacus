/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerErrorCollector } from './server-error.collector';

/**
 * When running in platform server, it collects all http errors.
 *
 * It needs to be provided as the first interceptor in the chain,
 * to be able to also collect errors thrown explicitly from other http interceptors.
 */
@Injectable({ providedIn: 'root' })
export class ServerHttpErrorInterceptor
  implements HttpInterceptor, ServerErrorCollector<unknown>
{
  constructor(protected windowRef: WindowRef) {}

  /**
   * Errors collected during the rendering on the platform server.
   */
  protected readonly errors: unknown[] = [];

  /**
   * When running in platform server, it collects all http errors.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.windowRef.isBrowser()) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        this.collectError(error);
        return throwError(error);
      })
    );
  }

  /**
   * Adds an error to the collection.
   */
  protected collectError(error: unknown) {
    this.errors.push(error);
  }

  /**
   * Returns all the collected errors.
   */
  public getErrors() {
    return this.errors;
  }
}
