import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../facade/auth.service';
import { UserToken } from '../../auth/models/token-types.model';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  userToken: UserToken;

  constructor(
    private authService: AuthService,
    private occEndpoints: OccEndpointsService
  ) {
    this.authService.getUserToken().subscribe((token: UserToken) => {
      this.userToken = token;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.userToken &&
      this.isOccUrl(request.url) &&
      !request.headers.get('Authorization')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.userToken.token_type} ${
            this.userToken.access_token
          }`,
        },
      });
    }

    return next.handle(request);
  }

  private isOccUrl(url: string): boolean {
    return url.indexOf(this.occEndpoints.getBaseEndpoint()) > -1;
  }
}
