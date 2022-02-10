import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { OccEndpointsService, WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PersonalizationConfig } from '../config/personalization-config';

const PERSONALIZATION_TIME_KEY = 'personalization-time';

@Injectable({ providedIn: 'root' })
export class OccPersonalizationTimeInterceptor implements HttpInterceptor {
  private timestamp?: string | null;
  private requestHeader?: string;
  private enabled = false;

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService,
    private winRef: WindowRef
  ) {
    if (this.winRef.isBrowser()) {
      this.enabled =
        (this.winRef.localStorage && this.config.personalization?.enabled) ||
        false;

      if (this.enabled) {
        if (!this.config.personalization?.httpHeaderName && isDevMode()) {
          console.warn(
            `There is no httpHeaderName configured in Personalization`
          );
        }
        this.requestHeader =
          this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
        this.timestamp = this.winRef.localStorage?.getItem(
          PERSONALIZATION_TIME_KEY
        );
      } else if (this.winRef.localStorage?.getItem(PERSONALIZATION_TIME_KEY)) {
        this.winRef.localStorage.removeItem(PERSONALIZATION_TIME_KEY);
      }
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.enabled) {
      return next.handle(request);
    }

    if (
      this.requestHeader &&
      this.timestamp &&
      request.url.includes(this.occEndpoints.getBaseUrl())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.timestamp,
        },
      });
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (
            this.requestHeader &&
            event.headers.keys().includes(this.requestHeader)
          ) {
            const receivedTimestamp = event.headers.get(this.requestHeader);
            if (this.timestamp !== receivedTimestamp) {
              this.timestamp = receivedTimestamp;
              if (this.timestamp) {
                this.winRef.localStorage?.setItem(
                  PERSONALIZATION_TIME_KEY,
                  this.timestamp
                );
              }
            }
          }
        }
      })
    );
  }
}
