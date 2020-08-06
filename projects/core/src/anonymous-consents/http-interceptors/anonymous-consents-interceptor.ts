import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENTS_HEADER,
  ANONYMOUS_CONSENT_STATUS,
} from '../../model/index';
import { OccEndpointsService } from '../../occ/index';
import { AnonymousConsentsConfig } from '../config/anonymous-consents-config';
import { AnonymousConsentsService } from '../facade/anonymous-consents.service';

@Injectable({ providedIn: 'root' })
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
    return this.anonymousConsentsService.getConsents().pipe(
      take(1),
      withLatestFrom(this.authService.isUserLoggedIn()),
      switchMap(([consents, isUserLoggedIn]) => {
        if (!this.isOccUrl(request.url)) {
          return next.handle(request);
        }

        const clonedRequest = this.handleRequest(consents, request);
        return next.handle(clonedRequest).pipe(
          tap((event) => {
            if (
              event instanceof HttpResponse &&
              event.url.startsWith(
                this.occEndpoints.getUrl('anonymousConsentTemplates')
              )
            ) {
              this.handleResponse(
                isUserLoggedIn,
                event.headers.get(ANONYMOUS_CONSENTS_HEADER),
                consents
              );
            }
          })
        );
      })
    );
  }

  private handleResponse(
    isUserLoggedIn: boolean,
    newRawConsents: string,
    previousConsents: AnonymousConsent[]
  ): void {
    if (!isUserLoggedIn && newRawConsents) {
      let newConsents: AnonymousConsent[] = [];
      newConsents = this.anonymousConsentsService.decodeAndDeserialize(
        newRawConsents
      );
      newConsents = this.giveRequiredConsents(newConsents);

      if (
        this.anonymousConsentsService.consentsUpdated(
          newConsents,
          previousConsents
        )
      ) {
        this.anonymousConsentsService.setConsents(newConsents);
      }
    }
  }

  private handleRequest(
    consents: AnonymousConsent[],
    request: HttpRequest<any>
  ): HttpRequest<any> {
    if (!consents) {
      return request;
    }

    const rawConsents = this.anonymousConsentsService.serializeAndEncode(
      consents
    );
    return request.clone({
      setHeaders: {
        [ANONYMOUS_CONSENTS_HEADER]: rawConsents,
      },
    });
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
}
