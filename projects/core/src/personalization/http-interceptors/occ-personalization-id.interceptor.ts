import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PersonalizationConfig } from '../config/personalization-config';
import { WindowRef } from '../../window/window-ref';

const PERSONALIZATION_KEY = 'personalization-id';

@Injectable()
export class OccPersonalizationIdInterceptor implements HttpInterceptor {
  private personalizationId: string;
  private requestHeader: string;

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService,
    private winRef: WindowRef
  ) {
    this.requestHeader = this.config.personalization.requestHeader.toLowerCase();
    this.personalizationId = this.winRef.localStorage.getItem(
      PERSONALIZATION_KEY
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.personalizationId &&
      request.url.indexOf(this.occEndpoints.getBaseEndpoint()) > -1
    ) {
      request = request.clone({
        setHeaders: {
          [this.requestHeader]: this.personalizationId,
        },
      });
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.headers.keys().indexOf(this.requestHeader) > -1) {
            const receivedId = event.headers.get(this.requestHeader);
            if (this.personalizationId !== receivedId) {
              this.personalizationId = receivedId;
              this.winRef.localStorage.setItem(
                PERSONALIZATION_KEY,
                this.personalizationId
              );
            }
          }
        }
      })
    );
  }
}
