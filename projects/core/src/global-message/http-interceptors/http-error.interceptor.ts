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

import { GlobalMessageService } from '../facade/global-message.service';
import { HttpErrorHandler } from './handlers/http-error.handler';
import { HttpResponseStatus } from '../models/response-status.model';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(HttpErrorHandler) private handlers: HttpErrorHandler[],
    protected globalMessageService: GlobalMessageService
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
  ) {
    const handler = this.getResponseHandler(response);
    if (handler) {
      handler.handleError(request, response);
    }
  }

  /**
   * return the title resolver with the best match
   * title resovers can by default match on PageType and page template
   * but custom match comparisors can be implemented.
   */
  protected getResponseHandler(response: HttpErrorResponse): HttpErrorHandler {
    const status = response.status || HttpResponseStatus.UNKNOWN;
    return this.handlers.find(h => h.responseStatus === status);
  }
}
