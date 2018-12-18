import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CurrencyService } from '../facade/currency.service';
import { LanguageService } from '../facade/language.service';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  baseReqString: string;
  activeLang: string = this.config.site.language;
  activeCurr: string = this.config.site.currency;

  constructor(
    private languageService: LanguageService,
    private currencyService: CurrencyService,
    private config: OccConfig
  ) {
    this.baseReqString =
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite;

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
    if (request.url.indexOf(this.baseReqString) > -1) {
      request = request.clone({
        setParams: {
          lang: this.activeLang,
          curr: this.activeCurr
        }
      });
    }

    return next.handle(request);
  }
}
