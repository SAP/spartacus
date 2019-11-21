import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../profile-tag.injector';

@Injectable({ providedIn: 'root' })
export class ConsentReferenceInterceptor implements HttpInterceptor {
  constructor(private profileTagInjector: ProfileTagInjector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.profileTagInjector.consentReference) {
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Consent-Reference',
      this.profileTagInjector.consentReference
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }
}
