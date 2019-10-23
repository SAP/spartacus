import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import {
  InterceptorUtil,
  TOKEN_REVOCATION,
} from '../../occ/utils/interceptor-util';
import { AuthService } from '../facade/auth.service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private occEndpoints: OccEndpointsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.isTokenRevocationRequest(request)) {
      console.log('UserTokenInterceptor, request: ', request);
    }
    return this.authService.getUserToken().pipe(
      take(1),
      switchMap(token => {
        if (
          token &&
          this.isAuthorizationRequiredForRequest(request) &&
          !request.headers.get('Authorization')
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

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }

  private isTokenRevocationRequest(request: HttpRequest<any>) {
    return !!InterceptorUtil.getInterceptorParam(
      TOKEN_REVOCATION,
      request.headers
    );
  }

  private isAuthorizationRequiredForRequest(request: HttpRequest<any>) {
    return this.isTokenRevocationRequest(request) || this.isOccUrl(request.url);
  }
}
