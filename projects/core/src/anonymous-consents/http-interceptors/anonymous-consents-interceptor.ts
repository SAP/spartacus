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
import { isFeatureLevel } from '../../features-config/index';
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
      () => isFeatureLevel(this.config, '1.2'),
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
                  event.headers.get(ANONYMOUS_CONSENTS_HEADER),
                  isUserLoggedIn
                );
              }
            })
          );
        })
      ),
      next.handle(request)
    );
  }

  private handleResponse(rawConsents: string, isUserLoggedIn: boolean): void {
    if (rawConsents && !isUserLoggedIn) {
      const consents = this.decodeAndDeserialize(rawConsents);
      this.giveRequiredConsents(consents);
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

  private giveRequiredConsents(consents: AnonymousConsent[]): void {
    if (
      Boolean(this.config.anonymousConsents) &&
      Boolean(this.config.anonymousConsents.requiredConsents)
    ) {
      for (const consent of consents) {
        if (
          this.config.anonymousConsents.requiredConsents.includes(
            consent.templateCode
          )
        ) {
          consent.consentState = ANONYMOUS_CONSENT_STATUS.GIVEN;
        }
      }
    }

    this.anonymousConsentsService.setConsents(consents);
  }
}
