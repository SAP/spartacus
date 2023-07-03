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
  // HttpResponse,
} from '@angular/common/http';
import { Injectable, inject, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { SegmentRefsConfig } from '../config/segment-refs-config';

@Injectable({ providedIn: 'root' })
export class OccSegmentRefsInterceptor implements HttpInterceptor {
  private segmentRefs?: string | null;
  private requestHeader?: string;
  protected readonly SEGMENT_REFS_KEY = 'segment-refs';

  protected logger = inject(LoggerService);

  constructor(
    protected config: SegmentRefsConfig,
    protected occEndpoints: OccEndpointsService,
    protected winRef: WindowRef
  ) {
    const url = this.winRef.location.href ?? '';
    const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
    const segmentRef: string = queryParams.get('segmentrefs') ?? '';
    // if (segmentRef !== '') {
    //   this.winRef.localStorage?.setItem(this.SEGMENT_REFS_KEY, segmentRef);
    // } else {
    //   this.winRef.localStorage?.removeItem(this.SEGMENT_REFS_KEY);
    // }
    if (this.winRef.isBrowser()) {
      if (!this.config.segmentRefs?.httpHeaderName && isDevMode()) {
        this.logger.warn(`There is no httpHeaderName configured in Segment`);
      }
      this.requestHeader =
        this.config.segmentRefs?.httpHeaderName?.toLowerCase();
      this.segmentRefs = segmentRef;
      // = this.winRef.localStorage?.getItem(
      //   this.SEGMENT_REFS_KEY
      // );
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
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
    return next.handle(request);
    //.pipe(
    //   tap((event) => {
    //     if (
    //       event instanceof HttpResponse &&
    //       this.requestHeader &&
    //       event.headers.keys().includes(this.requestHeader)
    //     ) {
    //       const receivedId = event.headers.get(this.requestHeader);
    //       if (this.segmentRefs !== receivedId) {
    //         this.segmentRefs = receivedId;
    //         if (this.segmentRefs) {
    //           this.winRef.localStorage?.setItem(
    //             this.SEGMENT_REFS_KEY,
    //             this.segmentRefs
    //           );
    //         }
    //       }
    //     }
    //   })
    // );
  }
}
