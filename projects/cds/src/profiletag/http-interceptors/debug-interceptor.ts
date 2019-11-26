import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
=======
import { OccEndpointsService } from '@spartacus/core';
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../services/index';

@Injectable({ providedIn: 'root' })
export class DebugInterceptor implements HttpInterceptor {
<<<<<<< HEAD
  constructor(private profileTagTracker: ProfileTagInjector) {}
=======
  constructor(
    private profileTagTracker: ProfileTagInjector,
    private occEndpoints: OccEndpointsService
  ) {}
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
<<<<<<< HEAD
=======
    if (!this.isOccUrl(request.url)) {
      return next.handle(request);
    }
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
    const cdsHeaders = request.headers.set(
      'X-Profile-Tag-Debug',
      this.profileTagTracker.profileTagDebug.toString()
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }
<<<<<<< HEAD
=======

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseEndpoint());
  }
>>>>>>> 694183b38093ce67c68f5e2243029636716e76c0
}
