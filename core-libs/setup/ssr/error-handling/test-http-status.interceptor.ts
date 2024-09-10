/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TestQueryParamsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { RESPONSE } from '../tokens/express.tokens';

@Injectable({
  providedIn: 'root',
})
export class TestHttpStatusInterceptor implements HttpInterceptor {
  private response = inject(RESPONSE, { optional: true });
  private testQueryParamsService = inject(TestQueryParamsService);
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.testQueryParamsService.queryParams.customResponseStatus) {
      this.response?.status(203);
      this.response?.set('x-custom-status', '203');
    }
    return next.handle(req);
  }
}
