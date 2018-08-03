import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as fromStore from '../store';
import { ConfigService } from '../../../../config.service';

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<fromStore.SiteContextState>,
    private configService: ConfigService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let activeLang = this.configService.site.language;
    this.store
      .select(fromStore.getActiveLanguage)
      .pipe(filter(lang => lang != null))
      .subscribe(data => (activeLang = data));

    let activeCurr = this.configService.site.currency;
    this.store
      .select(fromStore.getActiveCurrency)
      .pipe(filter(curr => curr != null))
      .subscribe(data => (activeCurr = data));

    const baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;

    if (request.url.indexOf(baseReqString) > -1) {
      request = request.clone({
        setParams: {
          lang: activeLang,
          curr: activeCurr
        }
      });
    }

    return next.handle(request);
  }
}
