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

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  activeLang: string;
  activeCurr: string;

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private occEndpoints: OccEndpointsService,
    private config: SiteContextConfig
  ) {
    const ctxParams = this.config.context && this.config.context.parameters;
    this.activeLang =
      ctxParams && ctxParams.language && ctxParams.language.default;
    this.activeCurr =
      ctxParams && ctxParams.currency && ctxParams.currency.default;

    this.languageService
      .getActive()
      .subscribe(data => (this.activeLang = data));

    this.currencyService
      .getActive()
      .subscribe(data => (this.activeCurr = data));
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes(this.occEndpoints.getBaseEndpoint())) {
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
