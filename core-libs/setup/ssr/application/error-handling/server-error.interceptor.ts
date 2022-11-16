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
 * In SSR, it collects http errors and them and exposes as a `ServerErrorCollector`.
 */
@Injectable({ providedIn: 'root' })
export class ServerErrorInterceptor
  implements HttpInterceptor, ServerErrorCollector<unknown>
{
  constructor(protected windowRef: WindowRef) {}

  /**
   * Errors collected during the server side rendering.
   */
  protected readonly errors: unknown[] = [];

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

  protected collectError(error: unknown) {
    this.errors.push(error);
  }

  public getErrors() {
    return this.errors;
  }
}
