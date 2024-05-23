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
import { Observable } from 'rxjs';
import { OccEndpointsService, WindowRef } from '@spartacus/core';
import { OppsCouponCodesService } from '../opps-coupon-codes.service';
import { OppsConfig } from '../../config';

@Injectable({ providedIn: 'root' })
export class OccOppsCouponCodesInterceptor implements HttpInterceptor {
  private oppsCoupon?: string | null;
  private requestHeader?: string;
  protected config = inject(OppsConfig);
  protected occEndpoints = inject(OccEndpointsService);
  protected winRef = inject(WindowRef);
  protected service = inject(OppsCouponCodesService);

  constructor() {
    this.initialize();
  }

  protected initialize() {
    this.oppsCoupon = this.service.getCouponCodes();
    if (this.winRef.isBrowser()) {
      this.requestHeader =
        this.config.opps?.couponcodes?.httpHeaderName?.toLowerCase?.();
    }
  }

  /**
   * Adds a new request header 'opps' to the given HTTP request.
   * @param request The outgoing request object to handle.
   * @param next The next interceptor in the chain, or the backend
   * if no interceptors remain in the chain.
   * @returns An observable of the event stream.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.winRef.isBrowser() &&
      this.requestHeader &&
      this.oppsCoupon &&
      request.url.includes(this.occEndpoints.getBaseUrl())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.oppsCoupon,
        },
      });
    }
    return next.handle(request);
  }
}
