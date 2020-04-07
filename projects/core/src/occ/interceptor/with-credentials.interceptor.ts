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
   * Indicates whether this is an OCC request.
   */
  protected requiresWithCredentials(request: HttpRequest<any>): boolean {
    return (
      /**
       * This `occConfig?.useWithCredentials` flag has only been introduced in
       * version 2.0. Customers must provide this interceptors manually in their
       * app to opt-in to use this feature, as we don't backport the configuration.
       */
      // this.occConfig?.useWithCredentials &&
      request.url.indexOf(this.occConfig.prefix) > -1
    );
  }

  private get occConfig() {
    return this.config && this.config.backend && this.config.backend.occ
      ? this.config.backend.occ
      : {};
  }
}
