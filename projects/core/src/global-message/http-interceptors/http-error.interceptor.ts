import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { resolveApplicable } from '../../util/applicable';
import { HttpErrorHandler } from './handlers/http-error.handler';

@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(HttpErrorHandler) protected handlers: HttpErrorHandler[]
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          this.handleErrorResponse(request, response);
          return throwError(response);
        }
      })
    );
  }

  protected handleErrorResponse(
    request: HttpRequest<any>,
    response: HttpErrorResponse
  ): void {
    const handler = this.getResponseHandler(response);
    if (handler) {
      handler.handleError(request, response);
    }
  }

  /**
   * return the error handler that matches the `HttpResponseStatus` code.
   * If no handler is available, the UNKNOWN handler is returned.
   */
  protected getResponseHandler(response: HttpErrorResponse): HttpErrorHandler {
    return resolveApplicable(this.handlers, [response]);
  }
}
