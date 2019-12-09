import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SmartEditService } from '../services/smart-edit.service';

@Injectable({ providedIn: 'root' })
export class CmsTicketInterceptor implements HttpInterceptor {
  constructor(private service: SmartEditService) {}

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
