import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { inject, Injectable, Provider } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QueryParamsService } from './query-params.service';
import { STRESS_TEST_URL } from './stress-test-backend.provider';

/**
 * Logs HTTP requests and responses.
 */
@Injectable({ providedIn: 'root' })
export class HttpLoggerInterceptor implements HttpInterceptor {
  logger = inject(LoggerService);
  loggerInterceptor = Boolean(
    inject(QueryParamsService).queryParams?.loggerInterceptor
  );
  STRESS_TEST_URL = inject(STRESS_TEST_URL);

  log(message: string, url: string, error?: { error: Error }) {
    if (
      // enabled by default
      !this.loggerInterceptor ||
      // OR it's stress test URL and stressOnly is enabled
      (typeof this.loggerInterceptor === 'string' &&
        this.loggerInterceptor === 'stressOnly' &&
        url === this.STRESS_TEST_URL)
    ) {
      if (error) {
        this.logger.debug(`${message}: ${url}`, error, 'ERROR');
      } else {
        this.logger.debug(`${message}: ${url}`);
      }
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.log(`HttpLoggerInterceptor START`, request.url);
    return next.handle(request).pipe(
      // log response or error:
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.log(`HttpLoggerInterceptor END SUCCESS`, request.url);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.log(`HttpLoggerInterceptor END ERROR`, request.url, {
            error,
          });
        },
      })
    );
  }
}

export const HttpLoggerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpLoggerInterceptor,
  multi: true,
};
