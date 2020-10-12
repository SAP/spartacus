import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OccEndpointsService } from '../../../occ/services/occ-endpoints.service';
import { CxOAuthService } from '../facade/cx-oauth-service';
import { AuthHeaderService } from '../services/auth-header/auth-header.service';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

// TODO: Rethink the current naming of this one (different responsibilities)
@Injectable({ providedIn: 'root' })
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(
    private occEndpoints: OccEndpointsService,
    protected oAuthService: CxOAuthService,
    protected authHeaderService: AuthHeaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const hasAuthorizationHeader = this.authHeaderService.getAuthorizationHeader(
      request
    );

    let isUserTokenRequest = false;

    if (!hasAuthorizationHeader && this.isOccUrl(request.url)) {
      isUserTokenRequest = true;
      request = request.clone({
        setHeaders: {
          ...this.authHeaderService.createAuthorizationHeader(),
        },
      });
    }

    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          switch (errResponse.status) {
            case 401: // Unauthorized
              if (isUserTokenRequest) {
                if (this.isExpiredToken(errResponse)) {
                  return this.authHeaderService.handleExpiredAccessToken(
                    request,
                    next
                  );
                } else if (
                  // Refresh expired token
                  // Check that the OAUTH endpoint was called and the error is for refresh token is expired
                  errResponse.url.includes(OAUTH_ENDPOINT) &&
                  errResponse.error.error === 'invalid_token'
                ) {
                  this.authHeaderService.handleExpiredRefreshToken();
                  return of<HttpEvent<any>>();
                }
              }
              break;
            case 400: // Bad Request
              if (
                errResponse.url.includes(OAUTH_ENDPOINT) &&
                errResponse.error.error === 'invalid_grant'
              ) {
                if (request.body.get('grant_type') === 'refresh_token') {
                  // refresh token fail, force user logout
                  this.authHeaderService.handleExpiredRefreshToken();
                }
              }
              break;
          }
        }
        return throwError(errResponse);
      })
    );
  }

  protected isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
