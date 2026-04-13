/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { Observable } from 'rxjs';

/**
 * Removes `users/current` and `users/anonymous` segments from OCC CMS page and
 * component request URLs, so that CMS content is fetched without a user context.
 *
 * e.g.
 *   .../users/current/cms/pages?...    →  .../cms/pages?...
 *   .../users/anonymous/cms/components →  .../cms/components
 */
@Injectable({ providedIn: 'root' })
export class OccCmsUserIdInterceptor implements HttpInterceptor {
  private readonly CMS_USER_PATH =
    /\/users\/(current|anonymous)(\/cms\/(?:pages|components))/;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.CMS_USER_PATH.test(request.url)) {
      request = request.clone({
        url: request.url.replace(this.CMS_USER_PATH, '$2'),
      });
    }
    return next.handle(request);
  }
}
