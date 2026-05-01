/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
import { Injectable, inject } from '@angular/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * HTTP Interceptor for Gift Card payment flow in split payment scenarios.
 *
 * Reloads cart ONLY when placePaymentAuthorizedOrder API fails.
 * When payment auth fails, the backend automatically removes the gift card.
 * Cart is reloaded to reflect the updated state with gift card removed.
 *
 * Intercepts: POST /orders/paymentAuthorizedOrderPlacement
 */
@Injectable()
export class OpfGiftCardPaymentApiInterceptor implements HttpInterceptor {
  protected activeCartService = inject(ActiveCartFacade);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only intercept placePaymentAuthorizedOrder API calls
    if (!request.url.includes('/orders/paymentAuthorizedOrderPlacement')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      // Reload cart only on placePaymentAuthorizedOrder failure
      catchError((error: HttpErrorResponse) => {
        this.activeCartService.reloadActiveCart();
        return throwError(() => error);
      })
    );
  }
}
