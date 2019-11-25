import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileTagInjector } from '../services/index';

@Injectable({ providedIn: 'root' })
export class DebugInterceptor implements HttpInterceptor {
  constructor(private profileTagTracker: ProfileTagInjector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cdsHeaders = request.headers.set(
      'X-Profile-Tag-Debug',
      this.profileTagTracker.profileTagDebug.toString()
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }
}
