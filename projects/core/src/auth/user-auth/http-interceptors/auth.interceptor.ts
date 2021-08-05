import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthToken } from '../models/auth-token.model';
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

    // request = this.authHttpHeaderService.alterRequest(request);
    const shouldHandle = this.authHttpHeaderService.shouldHandleRequest(
      request
    );

    // getToken will emit sync or async if there is refresh or logout in progress
    return of(shouldHandle).pipe(
      switchMap((shouldHandle) =>
        !shouldHandle
          ? of(undefined)
          : this.authHttpHeaderService.getTokenTake1()
      ),
      map((token: AuthToken | undefined) => ({
        token,
        request: this.authHttpHeaderService.alterRequest(request, token),
      })),
      switchMap(({ request, token }) =>
        next.handle(request).pipe(
          catchError((errResponse: any) => {
            if (errResponse instanceof HttpErrorResponse) {
              switch (errResponse.status) {
                case 401: // Unauthorized
                  if (this.isExpiredToken(errResponse) && shouldCatchError) {
                    // request failed because of the expired access token
                    // we should get refresh the token and retry the request, or logout if the refresh is missing / expired
                    return this.authHttpHeaderService.handleExpiredAccessToken(
                      request,
                      next,
                      token
                    );
                  } else if (
                    // Refresh the expired token
                    // Check if the OAuth endpoint was called and the error is because the refresh token expired
                    errResponse.url?.includes(
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
                    errResponse.url?.includes(
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
        )
      )
    );
  }

  protected isExpiredToken(resp: HttpErrorResponse): boolean {
    return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
  }
}
