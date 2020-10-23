import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthConfigService } from '../services/auth-config.service';
import { AuthStorageService } from '../services/auth-storage.service';

/**
 * This interceptor is dedicated for Hybris OAuth server which requires `Authorization` header for revoke token calls.
 */
@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  constructor(
    protected authStorageService: AuthStorageService,
    protected authConfigService: AuthConfigService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isTokenRevocationRequest = this.isTokenRevocationRequest(request);
    if (isTokenRevocationRequest) {
      let token;
      this.authStorageService
        .getToken()
        .subscribe((tok) => (token = tok))
        .unsubscribe();
      request = request.clone({
        setHeaders: {
          Authorization: `${token.token_type || 'Bearer'} ${
            token.access_token
          }`,
        },
      });
    }

    return next.handle(request);
  }

  protected isTokenRevocationRequest(request: HttpRequest<any>): boolean {
    return request.url === this.authConfigService.getRevokeEndpoint();
  }
}
