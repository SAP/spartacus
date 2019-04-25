import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OccPersonalizationIdInterceptor implements HttpInterceptor {
  private personalizationId: string = '295f424f-803e-4097-bd0a-bcd172a619b8';

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.personalizationId) {
      request = request.clone({
        setHeaders: {
          'Occ-Personalization-Id': this.personalizationId,
        },
      });
    }

    return next.handle(request);
  }
}
