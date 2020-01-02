import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, mergeMap, startWith } from 'rxjs/operators';
import { CdsConfig } from '../config';
import { ProfileTagEventService } from './../profiletag/services/profiletag-event.service';

@Injectable({ providedIn: 'root' })
export class CdsConsentReferenceInterceptor implements HttpInterceptor {
  consentReference$ = this.profileTagEventService.getConsentReference().pipe(
    startWith(''),
    distinctUntilChanged()
  );

  constructor(
    private profileTagEventService: ProfileTagEventService,
    private cdsConfig: CdsConfig
  ) {
    console.log('****DEBUG - CdsConsentReferenceInterceptor - constructor');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.consentReference$.pipe(
      /* This results in two requests, the first one without the consent-reference, then the second one with the consent-reference */
      mergeMap((consentReference: string) => {
        // exhaustMap((consentReference: string) => {
        if (this.isCdsMerchandisingUrl(request.url) && consentReference) {
          console.log(
            'CdsConsentReferenceInterceptor - intercept - consent-reference - ',
            consentReference
          );

          const cdsRequest = request.clone({
            setHeaders: {
              'consent-reference': `${consentReference}`,
            },
          });
          return next.handle(cdsRequest);
        }
        return next.handle(request);
      })
    );
  }

  private isCdsMerchandisingUrl(url: string): boolean {
    return url.includes(this.cdsConfig.cds.baseUrl);
  }

  // private getConsentReference(): Observable<string> {
  //   return this.profileTagEventService.getConsentReference().pipe(
  //     startWith(''),
  //     distinctUntilChanged()
  //   );
  // }
}
