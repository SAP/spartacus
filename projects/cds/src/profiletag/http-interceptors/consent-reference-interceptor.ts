import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { OccEndpointsService } from '@spartacus/core';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../services/index';

@Injectable({ providedIn: 'root' })
export class ConsentReferenceInterceptor implements HttpInterceptor {
<<<<<<< HEAD
  constructor(private profileTagInjector: ProfileTagInjector) {}
=======
  constructor(
    private profileTagInjector: ProfileTagInjector,
    private occEndpoints: OccEndpointsService
  ) {}
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
<<<<<<< HEAD
    if (!this.profileTagInjector.consentReference) {
=======
    if (
      !this.profileTagInjector.consentReference ||
      !this.isOccUrl(request.url)
    ) {
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Consent-Reference',
      this.profileTagInjector.consentReference
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }
<<<<<<< HEAD
=======

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
}
