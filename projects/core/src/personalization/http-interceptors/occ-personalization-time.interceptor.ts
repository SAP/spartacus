import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PersonalizationConfig } from '../config/personalization-config';
import { WindowRef } from '../../window/window-ref';
import { isPlatformBrowser } from '@angular/common';

const PERSONALIZATION_TIME_KEY = 'personalization-time';

@Injectable()
export class OccPersonalizationTimeInterceptor implements HttpInterceptor {
  private timestamp: string;
  private requestHeader: string;
  private enabled = false;

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService,
    private winRef: WindowRef,
    @Inject(PLATFORM_ID) private platform: any
  ) {
    if (isPlatformBrowser(this.platform)) {
      this.enabled =
        (this.winRef.localStorage && this.config.personalization.enabled) ||
        false;

      if (this.enabled) {
        this.requestHeader = this.config.personalization.httpHeaderName.timestamp.toLowerCase();
        this.timestamp = this.winRef.localStorage.getItem(
          PERSONALIZATION_TIME_KEY
        );
      } else if (this.winRef.localStorage.getItem(PERSONALIZATION_TIME_KEY)) {
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
      this.timestamp &&
      request.url.includes(this.occEndpoints.getBaseEndpoint())
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.timestamp,
        },
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.headers.keys().includes(this.requestHeader)) {
            const receivedTimestamp = event.headers.get(this.requestHeader);
            if (this.timestamp !== receivedTimestamp) {
              this.timestamp = receivedTimestamp;
              this.winRef.localStorage.setItem(
                PERSONALIZATION_TIME_KEY,
                this.timestamp
              );
            }
          }
        }
      })
    );
  }
}
