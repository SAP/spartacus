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
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { OppsConfig } from '../config/opps-config';

@Injectable({ providedIn: 'root' })
export class OccOppsCouponInterceptor implements HttpInterceptor {
  private oppsCoupon?: string | null;
  private requestHeader?: string;
  protected readonly OPPS_COUPON_KEY = 'opps';
  protected readonly OPPS_COUPON_QUERY_PARAM = 'opps';

  protected logger = inject(LoggerService);

  constructor(
    protected config: OppsConfig,
    protected occEndpoints: OccEndpointsService,
    protected winRef: WindowRef
  ) {
    this.initialize();
  }

  /**
   * Fetched the OPPS ID from URL query parameter and saves it into
   * browser local storage
   */
  protected initialize() {
    const url = this.winRef.location.href ?? '';
    const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
    this.oppsCoupon = queryParams.get(this.OPPS_COUPON_QUERY_PARAM);
    if (this.oppsCoupon) {
      this.winRef.localStorage?.setItem(this.OPPS_COUPON_KEY, this.oppsCoupon);
    } else {
      this.oppsCoupon = this.winRef.localStorage?.getItem(this.OPPS_COUPON_KEY);
    }
    if (this.winRef.isBrowser()) {
      if (!this.config.opps?.coupon?.httpHeaderName && isDevMode()) {
        this.logger.warn(`There is no httpHeaderName configured in OPPS Coupon`);
      }
      this.requestHeader = this.config.opps?.coupon?.httpHeaderName?.toLowerCase?.();
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
