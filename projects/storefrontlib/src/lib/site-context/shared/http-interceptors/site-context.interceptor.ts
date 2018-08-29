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
import { ConfigService } from '../../config.service';

@Injectable()
export class SiteContextInterceptor implements HttpInterceptor {
  baseReqString: string;
  activeLang = this.configService.site.language;
  activeCurr = this.configService.site.currency;

  constructor(
    private store: Store<fromStore.SiteContextState>,
    private configService: ConfigService
  ) {
    this.baseReqString =
      this.configService.server.baseUrl +
      this.configService.server.occPrefix +
      this.configService.site.baseSite;

    this.store
      .select(fromStore.getActiveLanguage)
      .pipe(filter(lang => lang != null))
      .subscribe(data => (this.activeLang = data));

    this.store
      .select(fromStore.getActiveCurrency)
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
