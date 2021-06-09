import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CurrencyService } from '../../../site-context/facade/currency.service';
import { LanguageService } from '../../../site-context/facade/language.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { SiteContextConfig } from '../../../site-context/config/site-context-config';
import { getContextParameterDefault } from '../../../site-context/config/context-config-utils';
import {
  CURRENCY_CONTEXT_ID,
  LANGUAGE_CONTEXT_ID,
} from '../../../site-context/providers/context-ids';

@Injectable({ providedIn: 'root' })
export class SiteContextInterceptor implements HttpInterceptor {
  activeLang: string;
  activeCurr: string;

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private occEndpoints: OccEndpointsService,
    private config: SiteContextConfig
  ) {
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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(this.occEndpoints.getBaseUrl())) {
      request = request.clone({
        setParams: {
          lang: this.activeLang,
          curr: this.activeCurr,
        },
      });
    }

    return next.handle(request);
  }
}
