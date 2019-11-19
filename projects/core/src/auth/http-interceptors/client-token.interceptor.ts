import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { AuthService } from '../facade/auth.service';
import {
  USE_CLIENT_TOKEN,
  InterceptorUtil,
} from '../../occ/utils/interceptor-util';
import { ClientToken } from '../models/token-types.model';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

@Injectable({ providedIn: 'root' })
export class ClientTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private occEndpoints: OccEndpointsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getClientToken(request).pipe(
      take(1),
      switchMap((token: ClientToken) => {
        if (
          token &&
          request.url.includes(this.occEndpoints.getBaseEndpoint())
        ) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type} ${token.access_token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }

  private getClientToken(request: HttpRequest<any>): Observable<ClientToken> {
    if (
      InterceptorUtil.getInterceptorParam(USE_CLIENT_TOKEN, request.headers)
    ) {
      return this.authService.getClientToken();
    }
    return of(null);
  }
}
