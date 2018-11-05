import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromStore from '../store/index';
import { SiteContextConfig } from '../config/config';
import { StateWithSiteContext } from '../store/state';
import { getActiveLanguage } from '../store/index';

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  baseReqString: string;
  activeLang = this.config.site.language;
  activeCurr = this.config.site.currency;

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: SiteContextConfig
  ) {
    this.baseReqString =
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite;

    this.store
      .pipe(
        select(getActiveLanguage),
        filter(lang => lang != null)
      )
      .subscribe(data => (this.activeLang = data));

    this.store
      .pipe(
        select(fromStore.getActiveCurrency),
        filter(curr => curr != null)
      )
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
