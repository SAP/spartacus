import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserErrorHandlingService } from '../../user/services/user-error-handling.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private userErrorHandlingService: UserErrorHandlingService) {}

  // Handling for other communication errors will be provided in SPA-83
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              return this.userErrorHandlingService.handleExpiredUserToken(
                request,
                next
              );
            case 400:
              if (
                error.url.indexOf('authorizationserver/oauth/token') !== -1 &&
                error.error.error === 'invalid_grant'
              ) {
                this.userErrorHandlingService.handleInvalidRefreshToken();
              }
              break;
          }
        } else {
          console.warn('An unknown error occured', error);
        }
        return throwError(error);
      })
    );
  }
}
