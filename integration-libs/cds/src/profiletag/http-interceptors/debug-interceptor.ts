import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ProfileTagEventService } from '../services/profiletag-event.service';

@Injectable({ providedIn: 'root' })
export class DebugInterceptor implements HttpInterceptor {
  constructor(
    private profileTagEventTracker: ProfileTagEventService,
    private occEndpoints: OccEndpointsService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isOccUrl(request.url)) {
      return next.handle(request);
    }
    const cdsHeaders = request.headers.set(
      'X-Profile-Tag-Debug',
      this.profileTagEventTracker.profileTagDebug.toString()
    );
    const cdsRequest = request.clone({ headers: cdsHeaders });
    return next.handle(cdsRequest);
  }

  private isOccUrl(url: string): boolean {
    return url.includes(this.occEndpoints.getBaseUrl());
  }
}
