import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProfileTagInjector } from '../profile-tag.injector';

@Injectable({ providedIn: 'root' })
export class DebugInterceptor implements HttpInterceptor {
  constructor(private profileTagTracker: ProfileTagInjector) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.profileTagTracker.profileTagDebug$.pipe(
      switchMap(profileTagDebug => {
        const cdsHeaders = request.headers.set(
          'X-Profile-Tag-Debug',
          profileTagDebug.toString()
        );
        const cdsRequest = request.clone({ headers: cdsHeaders });
        console.log(`debug is ${profileTagDebug}`);
        return next.handle(cdsRequest);
      })
    );
  }
}
