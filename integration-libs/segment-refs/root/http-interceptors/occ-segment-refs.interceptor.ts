/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { SegmentRefsConfig } from '../config/segment-refs-config';

@Injectable({ providedIn: 'root' })
export class OccSegmentRefsInterceptor implements HttpInterceptor {
  private segmentRefs?: string | null;
  private requestHeader?: string;
  protected readonly SEGMENT_REFS_KEY = 'segment-refs';
  protected readonly SEGMENT_REFS_QUERY_PARAM = 'segmentrefs';

  protected logger = inject(LoggerService);

  constructor(
    protected config: SegmentRefsConfig,
    protected occEndpoints: OccEndpointsService,
    protected winRef: WindowRef
  ) {
    this.initialize();
  }

  /**
   * Fetched the segment reference ID from URL query parameter and saves it into
   * browser local storage
   */
  protected initialize() {
    const url = this.winRef.location.href ?? '';
    const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
    this.segmentRefs = queryParams.get(this.SEGMENT_REFS_QUERY_PARAM);
    if (this.segmentRefs) {
      this.winRef.localStorage?.setItem(
        this.SEGMENT_REFS_KEY,
        this.segmentRefs
      );
    } else {
      this.segmentRefs = this.winRef.localStorage?.getItem(
        this.SEGMENT_REFS_KEY
      );
    }
    if (this.winRef.isBrowser()) {
      if (!this.config.segmentRefs?.httpHeaderName && isDevMode()) {
        this.logger.warn(`There is no httpHeaderName configured in Segment`);
      }
      this.requestHeader =
        this.config.segmentRefs?.httpHeaderName?.toLowerCase?.();
    }
  }

  /**
   * Adds a new request header 'Segmentrefs' to the given HTTP request.
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
      this.segmentRefs &&
      request.url.includes(this.occEndpoints.getBaseUrl())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.segmentRefs,
        },
      });
    }
    return next.handle(request);
  }
}
