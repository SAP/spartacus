/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mock_pdp_block } from './mock_pdp';
import { mock_list, s1, s2 } from './mock_list';

@Injectable()
export class MockResponseInterceptor implements HttpInterceptor {
  //http://localhost:4200/electronics-spa/en/USD/product/898503/1v
  //http://localhost:4200/powertools-spa/en/USD/product/Mobile_2020_Plan_cpq
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if the request URL matches the pattern and contains required query parameters
    if (
      req.url.includes('Mobile_2020_Plan_cpq') &&
      req.url.includes('sapPricePlan,sapSubscriptionTerm')
    ) {
      const mockResponse = mock_pdp_block;

      // Return the mocked response
      return of(new HttpResponse({ status: 200, body: mockResponse }));
    } else if (req.url.includes('subscriptions/00000001')) {
      return of(new HttpResponse({ status: 200, body: s1 }));
    } else if (req.url.includes('subscriptions/00000002')) {
      return of(new HttpResponse({ status: 200, body: s2 }));
    } else if (req.url.includes('/subscriptions')) {
      const mockResponse = mock_list;

      // Return the mocked response
      return of(new HttpResponse({ status: 200, body: mockResponse }));
    }

    // If conditions don't match, proceed with the original request
    return next.handle(req);
  }
}
