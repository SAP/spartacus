import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { SSR_REQUEST_LOGGING } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestLoggingService } from './request-logging.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    @Optional()
    @Inject(SSR_REQUEST_LOGGING)
    private logger: RequestLoggingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(tap((_event) => this.logger?.log(request.url)));
  }
}
