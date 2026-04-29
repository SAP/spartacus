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
import { Injectable, inject } from '@angular/core';

import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * HTTP Interceptor for Gift Card payment flow.
 * Reloads cart whenever the payments/active-configurations API is called.
 * This ensures cart data is fresh when payment options are loaded.
 */
@Injectable()
export class OpfGiftCardPaymentApiInterceptor implements HttpInterceptor {
  protected activeCartService = inject(ActiveCartFacade);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Check if this is the payments API call & reload the cart
    if (request.url.includes('/payments')) {
      return next.handle(request).pipe(
        tap(() => {
          this.activeCartService.reloadActiveCart();
        })
      );
    }

    return next.handle(request);
  }
}
