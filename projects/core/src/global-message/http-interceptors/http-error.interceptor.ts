import { Injectable, Inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpErrorHandler } from './handlers/http-error.handler';
import { HttpResponseStatus } from '../models/response-status.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(@Inject(HttpErrorHandler) private handlers: HttpErrorHandler[]) {}

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
  ) {
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
    const status = response.status;
    let handler = this.handlers.find(h => h.responseStatus === status);
    if (!handler) {
      handler = this.handlers.find(
        h => h.responseStatus === HttpResponseStatus.UNKNOWN
      );
    }
    return handler;
  }
}
