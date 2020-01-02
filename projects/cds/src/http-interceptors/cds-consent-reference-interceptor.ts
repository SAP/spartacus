import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CdsConfig } from '../config';
import { ProfileTagEventService } from './../profiletag/services/profiletag-event.service';

@Injectable({ providedIn: 'root' })
export class CdsConsentReferenceInterceptor implements HttpInterceptor {
  constructor(
    private profileTagEventService: ProfileTagEventService,
    private cdsConfig: CdsConfig
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this.profileTagEventService.latestConsentReference ||
      !this.isCdsMerchandisingUrl(request.url)
    ) {
      return next.handle(request);
    }
    const cdsRequest = request.clone({
      setHeaders: {
        'consent-reference': `${this.profileTagEventService.latestConsentReference}`,
      },
    });
    return next.handle(cdsRequest);
  }

  private isCdsMerchandisingUrl(url: string): boolean {
    return url.includes(this.cdsConfig.cds.baseUrl);
  }
}
