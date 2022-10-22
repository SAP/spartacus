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

// SPIKE: RETHINK THE NAME
@Injectable({ providedIn: 'root' })
export class SsrHttpErrorsInterceptor implements HttpInterceptor {
  constructor(protected windowRef: WindowRef) {}

  public readonly errors: any[] = [];

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
}
