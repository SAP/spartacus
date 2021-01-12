import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SmartEditLauncherService } from '@spartacus/smartedit/root';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CmsTicketInterceptor implements HttpInterceptor {
  constructor(private service: SmartEditLauncherService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('/cms/') && this.service.cmsTicketId) {
      request = request.clone({
        setParams: {
          cmsTicketId: this.service.cmsTicketId,
        },
      });
    }

    return next.handle(request);
  }
}
