import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PersonalizationConfig } from '../config/personalization-config';

@Injectable()
export class OccPersonalizationIdInterceptor implements HttpInterceptor {
  private personalizationId: string;
  private requestHeader: string;

  constructor(
    private config: PersonalizationConfig,
    private occEndpoints: OccEndpointsService
  ) {
    this.requestHeader = this.config.personalization.requestHeader.toLocaleLowerCase();
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
      map(event => {
        if (
          this.personalizationId === undefined &&
          event instanceof HttpResponse
        ) {
          if (event.headers.keys().indexOf(this.requestHeader) > -1) {
            this.personalizationId = event.headers.get(this.requestHeader);
          }
        }
        return event;
      })
    );
  }
}
