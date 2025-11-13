/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  CURRENCY_CONTEXT_ID,
  CurrencyService,
  LANGUAGE_CONTEXT_ID,
  LanguageService,
  OccEndpointsService,
  SiteContextConfig,
  getContextParameterDefault,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SiteContextInterceptor implements HttpInterceptor {
  private languageService = inject(LanguageService);
  private currencyService = inject(CurrencyService);
  private occEndpoints = inject(OccEndpointsService);
  private config = inject(SiteContextConfig);

  activeLang: string | undefined;
  activeCurr: string | undefined;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.activeLang = getContextParameterDefault(
      this.config,
      LANGUAGE_CONTEXT_ID
    );
    this.activeCurr = getContextParameterDefault(
      this.config,
      CURRENCY_CONTEXT_ID
    );

    this.languageService
      .getActive()
      .subscribe((data) => (this.activeLang = data));

    this.currencyService.getActive().subscribe((data) => {
      this.activeCurr = data;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.includes(
        this.occEndpoints.getBaseUrl({ prefix: false, baseSite: false })
      ) &&
      request.url.includes('/assistedservicewebservices/')
    ) {
      request = request.clone({
        setParams: {
          lang: this.activeLang ?? '',
          curr: this.activeCurr ?? '',
        },
      });
    }
    return next.handle(request);
  }
}
