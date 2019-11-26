import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../services/index';

@Injectable({ providedIn: 'root' })
export class ConsentReferenceInterceptor implements HttpInterceptor {
  constructor(
    private profileTagInjector: ProfileTagInjector,
    private occEndpoints: OccEndpointsService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !this.profileTagInjector.consentReference ||
      !this.isOccUrl(request.url)
    ) {
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Consent-Reference',
      this.profileTagInjector.consentReference
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }
}
