/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CmsService, PageContext, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SmartEditLauncherService } from '../services/smart-edit-launcher.service';

@Injectable({ providedIn: 'root' })
export class CmsTicketInterceptor implements HttpInterceptor {
  constructor(
    private service: SmartEditLauncherService,
    protected cmsService: CmsService,
    protected routingService: RoutingService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cmsTicketId = this.service?.cmsTicketId;
    if (!cmsTicketId) {
      return next.handle(request);
    }
    if (request.url.includes('/productList')) {
      return this.setRequestForProductListPage(cmsTicketId, request, next);
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
    cmsTicketId: string,
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    return this.routingService.getPageContext().pipe(
      take(1),
      switchMap((pageContext: PageContext) => {
        request = request.clone(
          !!pageContext.id && !!pageContext.type
            ? {
                setParams: {
                  cmsTicketId,
                  pageType: pageContext.type,
                  code: pageContext.id,
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
