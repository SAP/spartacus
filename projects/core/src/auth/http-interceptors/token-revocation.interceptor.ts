import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  InterceptorUtil,
  TOKEN_REVOCATION,
} from '../../occ/utils/interceptor-util';

@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isInterceptingTokenRevocationRequest = this.isTokenRevocationRequest(
      request
    );
    if (isInterceptingTokenRevocationRequest) {
      request = InterceptorUtil.removeHeader(TOKEN_REVOCATION, request);
    }

    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          if (isInterceptingTokenRevocationRequest) {
            return EMPTY;
          }
        }
        return throwError(response);
      })
    );
  }

  private isTokenRevocationRequest(request: HttpRequest<any>): boolean {
    const isTokenRevocationHeaderPresent = InterceptorUtil.getInterceptorParam<
      string
    >(TOKEN_REVOCATION, request.headers);
    return Boolean(isTokenRevocationHeaderPresent);
  }
}
