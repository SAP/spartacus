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
  // private consentReference: string;
  constructor(private profileTagTracker: ProfileTagInjector) {
    // this.loadConsentReference();
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(
      `interceptor consentReference: ${this.profileTagTracker.consentReference}`
    );
    if (!this.profileTagTracker.consentReference) {
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Consent-Reference',
      this.profileTagTracker.consentReference
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
    // return this.profileTagTracker.consentReference$.pipe(
    //   switchMap(consentReference => {
    //     console.log(`consentReference: ${consentReference}`);
    //     const cdsHeaders = request.headers.set(
    //       'X-Consent-Reference',
    //       consentReference
    //     );
    //     const cdsRequest = request.clone({ headers: cdsHeaders });
    //     return consentReference
    //       ? next.handle(cdsRequest)
    //       : next.handle(request);
    //   })
    // );
  }

  // loadConsentReference() {
  //   this.profileTagTracker.consentReference$
  //     .pipe(
  //       tap(cr => console.log(`pipe consentReference: ${cr}`)),
  //       tap((cr: string) => (this.consentReference = cr))
  //     )
  //     .subscribe();
  // }
}
