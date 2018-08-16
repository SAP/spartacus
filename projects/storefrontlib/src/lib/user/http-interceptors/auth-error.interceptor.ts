import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromUser from '../store';

import { UserErrorHandlingService } from '../../user/services/user-error-handling.service';

const OAUTH_ENDPOINT = '/authorizationserver/oauth/token';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  constructor(
    private userErrorHandlingService: UserErrorHandlingService,
    private store: Store<fromUser.UserState>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((errResponse: any) => {
        if (errResponse instanceof HttpErrorResponse) {
          switch (errResponse.status) {
            case 401: // Unauthorized
              if (this.isExpiredToken(errResponse)) {
                return this.userErrorHandlingService.handleExpiredUserToken(
                  request,
                  next
                );
              } else if (
                // Refresh expired token
                // Check that the OAUTH endpoint was called and the error is for refresh token is expired
                errResponse.url.indexOf(OAUTH_ENDPOINT) !== -1 &&
                errResponse.error.error === 'invalid_token'
              ) {
                return of(
                  this.userErrorHandlingService.handleExpiredRefreshToken()
                );
              }
              break;
            case 400: // Bad Request
              if (
                errResponse.url.indexOf(OAUTH_ENDPOINT) !== -1 &&
                errResponse.error.error === 'invalid_grant'
              ) {
                const params = request.body.split('&');
                if (params.indexOf('grant_type=refresh_token')) {
                  // refresh token fail, force user logout
                  this.store.dispatch(new fromUser.Logout());
                }
              }
              break;
          }
        }
        return throwError(errResponse);
      })
    );
  }

  private isExpiredToken(resp: HttpErrorResponse): boolean {
    if (
      resp.error &&
      resp.error.errors &&
      resp.error.errors instanceof Array &&
      resp.error.errors[0]
    ) {
      return resp.error.errors[0].type === 'InvalidTokenError';
    }
    return false;
  }
}
