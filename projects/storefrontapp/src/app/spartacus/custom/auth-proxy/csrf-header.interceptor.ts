import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { ClassProvider, inject, Injectable } from '@angular/core';
import { OccConfig } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthProxyCsrfHeaderInterceptor implements HttpInterceptor {
  config = inject(OccConfig);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.config.backend?.occ?.baseUrl as string)) {
      return next.handle(
        req.clone({ setHeaders: { 'x-auth-proxy-required': '1' } })
      );
    }
    return next.handle(req);
  }
}

export function provideCsrfHeaderInterceptor(): ClassProvider {
  return {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthProxyCsrfHeaderInterceptor,
    multi: true,
  };
}
