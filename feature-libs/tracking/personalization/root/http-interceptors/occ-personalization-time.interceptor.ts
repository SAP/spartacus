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
import { LoggerService, OccEndpointsService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PersonalizationConfig } from '../config/personalization-config';

@Injectable({ providedIn: 'root' })
export class OccPersonalizationTimeInterceptor implements HttpInterceptor {
  private timestamp?: string | null;
  private requestHeader?: string;
  private enabled = false;
  protected readonly PERSONALIZATION_TIME_KEY = 'personalization-time';

  protected logger = inject(LoggerService);

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService,
    private winRef: WindowRef
  ) {
    if (this.winRef.isBrowser()) {
      this.enabled =
        (this.winRef.localStorage && this.config.personalization?.enabled) ||
        false;

      if (this.enabled) {
        if (!this.config.personalization?.httpHeaderName && isDevMode()) {
          this.logger.warn(
            `There is no httpHeaderName configured in Personalization`
          );
        }
        this.requestHeader =
          this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
        this.timestamp = this.winRef.localStorage?.getItem(
          this.PERSONALIZATION_TIME_KEY
        );
      } else if (
        this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY)
      ) {
        this.winRef.localStorage.removeItem(this.PERSONALIZATION_TIME_KEY);
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
      this.timestamp &&
      request.url.includes(this.occEndpoints.getBaseUrl())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.timestamp,
        },
      });
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          this.requestHeader &&
          event.headers.keys().includes(this.requestHeader)
        ) {
          const receivedTimestamp = event.headers.get(this.requestHeader);
          if (this.timestamp !== receivedTimestamp) {
            this.timestamp = receivedTimestamp;
            if (this.timestamp) {
              this.winRef.localStorage?.setItem(
                this.PERSONALIZATION_TIME_KEY,
                this.timestamp
              );
            }
          }
        }
      })
    );
  }
}

// CHECK SONAR
