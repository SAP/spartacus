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
  HttpResponse,
} from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { SegmentRefsConfig } from '../config/segment-refs-config';

@Injectable({ providedIn: 'root' })
export class OccSegmentRefsInterceptor implements HttpInterceptor {
  private segmentRefs?: string | null;
  private requestHeader?: string;
  private enabled = false;
  protected readonly SEGMENT_REFS_KEY = 'segment-refs';

  protected logger = inject(LoggerService);

  constructor(
    private config: SegmentRefsConfig,
    private occEndpoints: OccEndpointsService,
    private winRef: WindowRef
  ) {
    if (this.winRef.isBrowser()) {
      if (this.winRef.localStorage) {
        this.enabled = true;
      }

      if (this.enabled) {
        if (!this.config.segmentRefs?.httpHeaderName && isDevMode()) {
          this.logger.warn(`There is no httpHeaderName configured in Segment`);
        }
        this.requestHeader =
          this.config.segmentRefs?.httpHeaderName?.id.toLowerCase();
        this.segmentRefs = this.winRef.localStorage?.getItem(
          this.SEGMENT_REFS_KEY
        );
      } else if (this.winRef.localStorage?.getItem(this.SEGMENT_REFS_KEY)) {
        this.winRef.localStorage.removeItem(this.SEGMENT_REFS_KEY);
      }
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.enabled) {
      return next.handle(request);
    }

    if (
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

    return next.handle(request).pipe(
      tap((event) => {
        // if(event instanceof HttpResponse)
        //   console.log(event.headers.keys());
        if (
          event instanceof HttpResponse &&
          this.requestHeader &&
          event.headers.keys().includes(this.requestHeader)
        ) {
          const receivedId = event.headers.get(this.requestHeader);
          if (this.segmentRefs !== receivedId) {
            this.segmentRefs = receivedId;
            if (this.segmentRefs) {
              this.winRef.localStorage?.setItem(
                this.SEGMENT_REFS_KEY,
                this.segmentRefs
              );
            }
          }
        }
      })
    );
  }
}
