import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  map,
  skipWhile,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../auth/index';
import { AnonymousConsent, DELETE_ME } from '../../model/index';
import { OccEndpointsService } from '../../occ/index';
import { AnonymousConsentsService } from '../facade/anonymous-consents.service';

export const ANONYMOUS_CONSENTS_HEADER = 'X-Anonymous-Consents';

@Injectable()
export class AnonymousConsentsInterceptor implements HttpInterceptor {
  constructor(
    private anonymousConsentsService: AnonymousConsentsService,
    private authService: AuthService,
    private occEndpoints: OccEndpointsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.anonymousConsentsService.getAnonymousConsents().pipe(
      take(1),
      withLatestFrom(this.authService.isUserLoggedIn()),
      skipWhile(([_consents, isUserLoggedIn]) => DELETE_ME && isUserLoggedIn),
      map(([consents, _isUserLoggedIn]) => consents),
      switchMap(consents => {
        if (!this.isOccUrl(request.url)) {
          return next.handle(request);
        }

        const clonedRequest = this.handleRequest(consents, request);
        return next.handle(clonedRequest).pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              this.handleResponse(event.headers.get(ANONYMOUS_CONSENTS_HEADER));
            }
          })
        );
      })
    );
  }

  private handleResponse(rawConsents: string): void {
    if (rawConsents) {
      const consents = this.decodeAndDeserialize(rawConsents);
      this.anonymousConsentsService.setAnonymousConsents(consents);
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
}
