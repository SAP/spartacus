//import { WindowRef } from '../../window/window-ref';
import { isPlatformServer } from '@angular/common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BaseSiteService, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { CdsConfig } from '../config/config.model';

@Injectable()
export class CdsConsentReferenceInterceptor implements HttpInterceptor {
  constructor(
    private config: CdsConfig,
    private occEndpoints: OccEndpointsService,
    private baseSiteService: BaseSiteService,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (isPlatformServer(this.platform)) {
      return next.handle(request);
    }

    if (this.requiresIntercepting(request.url)) {
      return this.baseSiteService.getActive().pipe(
        filter(Boolean),
        switchMap(site => next.handle(this.handleConsentRef(request, site)))
      );
    } else {
      return next.handle(request);
    }
  }

  private handleConsentRef(
    request: HttpRequest<any>,
    baseSite: string
  ): HttpRequest<any> {
    const consentRefId = this.getCookie(`${baseSite}-consentReference`);
    if (consentRefId) {
      request = request.clone({
        setHeaders: {
          [this.config.cds.httpHeaderName.id]: consentRefId,
        },
      });
    }
    return request;
  }

  private getCookie(cookieName: string): string {
    const searchRegex = new RegExp(
      '(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$'
    );
    const cookieValue = decodeURI(document.cookie.replace(searchRegex, '$1'));
    return cookieValue;
  }

  private requiresIntercepting(url): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }
}
