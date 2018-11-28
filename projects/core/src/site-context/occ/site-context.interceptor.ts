import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LanguageService } from '../facade/language.service';
import { CurrencyService } from '../facade/currency.service';
import { OccConfig } from '../../occ/config/occ-config';

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  baseReqString: string;
  activeLang = this.config.site.language;
  activeCurr = this.config.site.currency;

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
      .pipe(filter(lang => lang != null))
      .subscribe(data => (this.activeLang = data));

    this.currencyService.activeCurrency$
      .pipe(filter(curr => curr != null))
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
