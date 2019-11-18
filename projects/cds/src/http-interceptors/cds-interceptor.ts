import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileTagInjector } from '../profiletag/profile-tag.injector';

@Injectable({ providedIn: 'root' })
export class CDSInterceptor implements HttpInterceptor {
  private consentReference: string = undefined;
  constructor(private profileTagTracker: ProfileTagInjector) {
    this.loadConsentReference();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.consentReference) {
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Consent-Reference',
      this.consentReference
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest).pipe();
  }

  private loadConsentReference() {
    this.profileTagTracker.consentReference$
      .pipe(
        tap(consentReference => {
          this.consentReference = consentReference;
        })
      )
      .subscribe();
  }
}
