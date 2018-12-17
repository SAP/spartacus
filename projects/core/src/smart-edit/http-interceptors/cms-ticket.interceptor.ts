import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { SmartEditService } from '../services/smart-edit.service';

@Injectable()
export class CmsTicketInterceptor implements HttpInterceptor {
  constructor(private service: SmartEditService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf('/cms/') > -1 && this.service.cmsTicketId) {
      request = request.clone({
        setParams: {
          cmsTicketId: this.service.cmsTicketId
        }
      });
    }

    return next.handle(request);
  }
}
