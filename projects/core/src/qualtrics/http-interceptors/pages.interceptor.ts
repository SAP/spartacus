import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
import { WindowRef } from '../../window';

@Injectable()
export class PagesInteceptor implements HttpInterceptor {
  constructor(
    private featureConfigService: FeatureConfigService,
    private winRef: WindowRef
  ) {
    console.log('hi bye');
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('req', request);
    if (
      request.url.includes('/cms/pages') &&
      this.featureConfigService.isEnabled('qualtrics')
    ) {
      console.log('in');
      this.winRef.nativeWindow['QSI'].API.unload();
    }

    return next.handle(request);
  }
}
