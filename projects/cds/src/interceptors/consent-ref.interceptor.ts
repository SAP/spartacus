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

  /** maintain cookie values locally to not do a lot of interaction with cookie */
  cookieValues = {};

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
    const consentRefId = this.getCookieForSite(baseSite);
    if (consentRefId) {
      request = request.clone({
        setHeaders: {
          [this.config.cds.httpHeaderName.id]: consentRefId,
        },
      });
    }
    return request;
  }

  /**
   *
   * Reads the cookie for the given base site.
   */
  private getCookieForSite(baseSite: string): string {
    if (!this.cookieValues[baseSite]) {
      const searchRegex = new RegExp(
        '(?:(?:^|.*;\\s*)' +
          `${baseSite}-consentReference` +
          '\\s*\\=\\s*([^;]*).*$)|^.*$'
      );
      this.cookieValues[baseSite] = decodeURI(
        document.cookie.replace(searchRegex, '$1')
      );
      console.log('load from cookie', this.cookieValues[baseSite]);
    }
    return this.cookieValues[baseSite];
  }

  private requiresIntercepting(url): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }
}
