import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AnonymousConsent } from '../../model/index';
import { AnonymousConsentsService } from '../facade/anonymous-consents.service';

export const ANONYMOUS_CONSENTS_HEADER = 'X-Anonymous-Consents';

// TODO:#3896 - test
@Injectable()
export class AnonymousConsentsInterceptor implements HttpInterceptor {
  constructor(private anonymousConsentsService: AnonymousConsentsService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.anonymousConsentsService.getAnonymousConsents().pipe(
      take(1),
      switchMap(consents => {
        if (request instanceof HttpResponse) {
          this.handleResponse(request.headers.get(ANONYMOUS_CONSENTS_HEADER));
        } else {
          request = this.handleRequest(consents, request);
        }

        return next.handle(request);
      })
    );
  }

  private handleResponse(rawConsents: string): void {
    const consents = this.decodeAndDeserialize(rawConsents);
    this.anonymousConsentsService.setAnonymousConsents(consents);
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
    const rawConsents = this.serializeAndEncode(consents);
    return request.clone({
      setHeaders: {
        ANONYMOUS_CONSENTS_HEADER: rawConsents,
      },
    });
  }

  private serializeAndEncode(consents: AnonymousConsent[]): string {
    const serialized = JSON.stringify(consents);
    const encoded = encodeURIComponent(serialized);
    return encoded;
  }
}
