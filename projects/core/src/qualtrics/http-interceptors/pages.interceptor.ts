import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeatureConfigService } from '../../features-config/services/feature-config.service';
import { WindowRef } from '../../window';

@Injectable()
export class PagesInteceptor implements HttpInterceptor {
  constructor(
    private featureConfigService: FeatureConfigService,
    private winRef: WindowRef
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.winRef.nativeWindow['QSI']) {
      this.winRef.nativeWindow['QSI'].API.unload();
    }

    return next.handle(request).pipe(
      // take(1),
      tap(event => {
        if (event instanceof HttpResponse) {
          if (
            request.url.includes('pageLabelOrId=' + 'homepage') &&
            this.featureConfigService.isEnabled('qualtrics') &&
            this.winRef.nativeWindow['QSI']
          ) {
            this.reloadQualtricsCreative();
          }

          return event;
        }
      })
    );
  }

  protected reloadQualtricsCreative() {
    this.winRef.nativeWindow['QSI'].API.unload();
    this.winRef.nativeWindow['QSI'].API.load();
  }
}
