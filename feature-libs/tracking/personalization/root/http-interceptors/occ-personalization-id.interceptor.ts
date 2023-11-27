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
export class OccPersonalizationIdInterceptor implements HttpInterceptor {
  private personalizationId?: string | null;
  private requestHeader?: string;
  private enabled = false;
  protected readonly PERSONALIZATION_ID_KEY = 'personalization-id';

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
          this.config.personalization?.httpHeaderName?.id.toLowerCase();
        this.personalizationId = this.winRef.localStorage?.getItem(
          this.PERSONALIZATION_ID_KEY
        );
      } else if (
        this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY)
      ) {
        this.winRef.localStorage.removeItem(this.PERSONALIZATION_ID_KEY);
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
      this.personalizationId &&
      request.url.includes(this.occEndpoints.getBaseUrl())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.personalizationId,
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
          const receivedId = event.headers.get(this.requestHeader);
          if (this.personalizationId !== receivedId) {
            this.personalizationId = receivedId;
            if (this.personalizationId) {
              this.winRef.localStorage?.setItem(
                this.PERSONALIZATION_ID_KEY,
                this.personalizationId
              );
            }
          }
        }
      })
    );
  }
}
