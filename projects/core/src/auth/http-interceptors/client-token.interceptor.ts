import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../facade/auth.service';
import { AuthenticationToken } from '../models/token-types.model';
import {
  USE_CLIENT_TOKEN,
  InterceptorUtil
} from '../../occ/utils/interceptor-util';
import { AuthConfig } from '../config/auth-config';

@Injectable()
export class ClientTokenInterceptor implements HttpInterceptor {
  baseReqString =
    (this.config.server.baseUrl || '') +
    this.config.server.occPrefix +
    this.config.site.baseSite;

  constructor(private config: AuthConfig, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getClientToken(request).pipe(
      switchMap((token: AuthenticationToken) => {
        if (token && request.url.indexOf(this.baseReqString) > -1) {
          request = request.clone({
            setHeaders: {
              Authorization: `${token.token_type} ${token.access_token}`
            }
          });
        }
        return next.handle(request);
      })
    );
  }

  private getClientToken(
    request: HttpRequest<any>
  ): Observable<AuthenticationToken> {
    if (
      InterceptorUtil.getInterceptorParam(USE_CLIENT_TOKEN, request.headers)
    ) {
      return this.authService.clientToken$;
    }
    return of(null);
  }
}
