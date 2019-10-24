import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import { switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import {
  ANONYMOUS_CONSENTS_FEATURE,
  isFeatureEnabled,
} from '../../features-config/index';
import { AnonymousConsent, ANONYMOUS_CONSENT_STATUS } from '../../model/index';
import { OccEndpointsService } from '../../occ/index';
import { AnonymousConsentsConfig } from '../config/anonymous-consents-config';
import { AnonymousConsentsService } from '../facade/anonymous-consents.service';

export const ANONYMOUS_CONSENTS_HEADER = 'X-Anonymous-Consents';

@Injectable()
export class AnonymousConsentsInterceptor implements HttpInterceptor {
  constructor(
    private anonymousConsentsService: AnonymousConsentsService,
    private authService: AuthService,
    private occEndpoints: OccEndpointsService,
    private config: AnonymousConsentsConfig
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return iif(
      () => isFeatureEnabled(this.config, ANONYMOUS_CONSENTS_FEATURE),
      this.anonymousConsentsService.getConsents().pipe(
        take(1),
        withLatestFrom(this.authService.isUserLoggedIn()),
        switchMap(([consents, isUserLoggedIn]) => {
          if (!this.isOccUrl(request.url)) {
            return next.handle(request);
          }

          const clonedRequest = this.handleRequest(consents, request);
          return next.handle(clonedRequest).pipe(
            tap(event => {
              if (event instanceof HttpResponse) {
                this.handleResponse(
                  isUserLoggedIn,
                  event.headers.get(ANONYMOUS_CONSENTS_HEADER),
                  consents
                );
              }
            })
          );
        })
      ),
      next.handle(request)
    );
  }

  private handleResponse(
    isUserLoggedIn: boolean,
    newRawConsents: string,
    previousConsents: AnonymousConsent[]
  ): void {
    if (!isUserLoggedIn && newRawConsents) {
      let newConsents: AnonymousConsent[] = [];
      newConsents = this.decodeAndDeserialize(newRawConsents);
      newConsents = this.giveRequiredConsents(newConsents);

      if (this.consentsUpdated(newConsents, previousConsents)) {
        this.anonymousConsentsService.setConsents(newConsents);
      }
    }
  }

  private decodeAndDeserialize(rawConsents: string): AnonymousConsent[] {
    const decoded = decodeURIComponent(rawConsents);
    const unserialized = JSON.parse(decoded) as AnonymousConsent[];
    return unserialized;
  }

  private handleRequest(
    consents: AnonymousConsent[],
    request: HttpRequest<any>
  ): HttpRequest<any> {
    if (!consents) {
      return request;
    }

    const rawConsents = this.serializeAndEncode(consents);
    return request.clone({
      setHeaders: {
        [ANONYMOUS_CONSENTS_HEADER]: rawConsents,
      },
    });
  }

  private serializeAndEncode(consents: AnonymousConsent[]): string {
    if (!consents) {
      return '';
    }
    const serialized = JSON.stringify(consents);
    const encoded = encodeURIComponent(serialized);
    return encoded;
  }

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }

  private giveRequiredConsents(
    consents: AnonymousConsent[]
  ): AnonymousConsent[] {
    const givenConsents = [...consents];

    if (
      Boolean(this.config.anonymousConsents) &&
      Boolean(this.config.anonymousConsents.requiredConsents)
    ) {
      for (const consent of givenConsents) {
        if (
          this.config.anonymousConsents.requiredConsents.includes(
            consent.templateCode
          )
        ) {
          consent.consentState = ANONYMOUS_CONSENT_STATUS.GIVEN;
        }
      }
    }
    return givenConsents;
  }

  private consentsUpdated(
    newConsents: AnonymousConsent[],
    previousConsents: AnonymousConsent[]
  ): boolean {
    const newRawConsents = this.serializeAndEncode(newConsents);
    const previousRawConsents = this.serializeAndEncode(previousConsents);
    return newRawConsents !== previousRawConsents;
  }
}
