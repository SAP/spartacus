import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthConfig } from '../config/auth-config';
import { AuthService } from '../facade/auth.service';
import { UserToken } from '../../auth/models/token-types.model';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  userToken: UserToken;
  baseReqString =
    (this.config.server.baseUrl || '') +
    this.config.server.occPrefix +
    this.config.site.baseSite;

  constructor(private config: AuthConfig, private authService: AuthService) {
    this.authService.userToken$.subscribe((token: UserToken) => {
      this.userToken = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.userToken &&
      request.url.indexOf(this.baseReqString) > -1 &&
      !request.headers.get('Authorization')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.userToken.token_type} ${
            this.userToken.access_token
          }`
        }
      });
    }

    return next.handle(request);
  }
}
