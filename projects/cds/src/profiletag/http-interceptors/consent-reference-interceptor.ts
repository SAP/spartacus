import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProfileTagInjector } from '../profile-tag.injector';

@Injectable({ providedIn: 'root' })
export class ConsentReferenceInterceptor implements HttpInterceptor {
  constructor(private profileTagTracker: ProfileTagInjector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.profileTagTracker.consentReference$.pipe(
      switchMap(consentReference => {
        const cdsHeaders = request.headers.set(
          'X-Consent-Reference',
          consentReference
        );
        const cdsRequest = request.clone({ headers: cdsHeaders });
        return consentReference
          ? next.handle(cdsRequest)
          : next.handle(request);
      })
    );
  }
}
