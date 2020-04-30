import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccConfig } from '../config/occ-config';

/**
 * Http interceptor to add cookies to all cross-site requests.
 */
@Injectable({ providedIn: 'root' })
export class WithCredentialsInterceptor implements HttpInterceptor {
  constructor(protected config: OccConfig) {}

  /**
   * Intercepts each request and adds the `withCredential` flag to it
   * if it hasn't been added already.
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.requiresWithCredentials(request)) {
      request = request.clone({
        withCredentials: true,
      });
    }
    return next.handle(request);
  }

  /**
   * indicates whether the request should use the WithCredentials flag.
   */
  protected requiresWithCredentials(request: HttpRequest<any>): boolean {
    return (
      this.occConfig?.useWithCredentials &&
      request.url.indexOf(this.occConfig?.prefix) > -1
    );
  }

  private get occConfig() {
    return this.config.backend.occ;
  }
}
