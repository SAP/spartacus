import {
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
  TOKEN_REVOCATION_HEADER,
} from '../../occ/utils/interceptor-util';

@Injectable({ providedIn: 'root' })
export class TokenRevocationInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isTokenRevocationRequest = this.isTokenRevocationRequest(request);
    if (isTokenRevocationRequest) {
      request = InterceptorUtil.removeHeader(TOKEN_REVOCATION_HEADER, request);
    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (isTokenRevocationRequest) {
          return EMPTY;
        }
        return throwError(error);
      })
    );
  }

  protected isTokenRevocationRequest(request: HttpRequest<any>): boolean {
    const isTokenRevocationHeaderPresent = InterceptorUtil.getInterceptorParam<
      string
    >(TOKEN_REVOCATION_HEADER, request.headers);
    return Boolean(isTokenRevocationHeaderPresent);
  }
}
