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
import { AuthConfigService } from '../services/auth-config.service';
import { AuthHttpHeaderService } from '../services/auth-http-header.service';

/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    protected authHttpHeaderService: AuthHttpHeaderService,
    protected authConfigService: AuthConfigService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldCatchError = this.authHttpHeaderService.shouldCatchError(
      request
    );

    request = this.authHttpHeaderService.alterRequest(request);

    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          switch (errResponse.status) {
            case 401: // Unauthorized
              if (this.isExpiredToken(errResponse) && shouldCatchError) {
                return this.authHttpHeaderService.handleExpiredAccessToken(
                  request,
                  next
                );
              } else if (
                // Refresh expired token
                // Check that the OAUTH endpoint was called and the error is for refresh token is expired
                errResponse.url.includes(
                  this.authConfigService.getTokenEndpoint()
                ) &&
                errResponse.error.error === 'invalid_token'
              ) {
                this.authHttpHeaderService.handleExpiredRefreshToken();
                return of<HttpEvent<any>>();
              }

              break;
            case 400: // Bad Request
              if (
                errResponse.url.includes(
                  this.authConfigService.getTokenEndpoint()
                ) &&
                errResponse.error.error === 'invalid_grant'
              ) {
                if (request.body.get('grant_type') === 'refresh_token') {
                  this.authHttpHeaderService.handleExpiredRefreshToken();
                }
              }
              break;
          }
        }
        return throwError(errResponse);
      })
    );
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
