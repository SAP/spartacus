import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerErrorCollector } from './server-error-collector';

/**
 * In SSR, it catches errors from backend requests, collects them and exposes (as being a `ServerErrorCollector`).
 */
@Injectable({ providedIn: 'root' })
export class ServerHttpErrorInterceptor
  implements HttpInterceptor, ServerErrorCollector<any>
{
  constructor(protected windowRef: WindowRef) {}

  /**
   * Errors collected during the server side rendering.
   */
  protected readonly errors: any[] = [];

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // SPIKE TODO - UNCOMMENT IT:
    // if (this.windowRef.isBrowser()) {
    //   return next.handle(request);
    // }

    return next.handle(request).pipe(
      catchError((error) => {
        this.collectError(error);
        throw error;
      })
    );
  }

  protected collectError(error: any) {
    this.errors.push(error);
  }

  public getErrors() {
    return this.errors;
  }
}
