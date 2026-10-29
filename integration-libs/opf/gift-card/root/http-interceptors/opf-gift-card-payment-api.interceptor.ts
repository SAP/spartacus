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
import { OpfMetadataStoreService } from '@spartacus/opf/base/root';
import { OpfPaymentEventsService } from '@spartacus/opf/payment/root';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OPF_GIFT_CARD_AUTH_ERROR_TYPE } from '../config/constants';

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
  protected opfMetadataStoreService = inject(OpfMetadataStoreService);
  protected opfPaymentEventsService = inject(OpfPaymentEventsService);

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

        // Gift card authorization failed during place order; clear the payment session
        // so the user can apply a valid gift card and re-initiate payment.
        if (error.error?.errors?.[0]?.type === OPF_GIFT_CARD_AUTH_ERROR_TYPE) {
          this.opfMetadataStoreService.updateOpfMetadata({
            opfPaymentSessionId: undefined,
            opfPaymentSessionConfigurationId: undefined,
          });
          this.opfPaymentEventsService.emitReinitiatePaymentEvent();
        }

        return throwError(() => error);
      })
    );
  }
}
