import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonalizationConfig } from '../config/personalization-config';

@Injectable()
export class OccPersonalizationIdInterceptor implements HttpInterceptor {
  private personalizationId: string = '9739a8b5-ba9c-4431-8da5-28ee1410d7ca';
  constructor(private config: PersonalizationConfig) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('here');
    if (this.personalizationId) {
      request = request.clone({
        setHeaders: {
          [this.config.personalization.requestHeader]: this.personalizationId,
        },
      });
    }

    return next.handle(request);
  }
}
