/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageContext, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SmartEditLauncherService } from '../services/smart-edit-launcher.service';

@Injectable({ providedIn: 'root' })
export class CmsTicketInterceptor implements HttpInterceptor {
  routingService = inject(RoutingService);

  constructor(protected service: SmartEditLauncherService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cmsTicketId = this.service.cmsTicketId;
    if (!cmsTicketId) {
      return next.handle(request);
    }
    if (request.url.includes('/productList')) {
      return this.setRequestForProductListPage(request, next, cmsTicketId);
    }
    if (request.url.includes('/cms/') || request.url.includes('/products/')) {
      request = request.clone({
        setParams: {
          cmsTicketId,
        },
      });
    }

    return next.handle(request);
  }

  protected setRequestForProductListPage(
    request: HttpRequest<any>,
    next: HttpHandler,
    cmsTicketId: string
  ) {
    return this.routingService.getPageContext().pipe(
      take(1),
      switchMap((pageContext: PageContext) => {
        request = request.clone(
          !!pageContext.id
            ? {
                setParams: {
                  cmsTicketId,
                  categoryCode: pageContext.id,
                },
              }
            : {
                setParams: {
                  cmsTicketId,
                },
              }
        );
        return next.handle(request);
      })
    );
  }
}
