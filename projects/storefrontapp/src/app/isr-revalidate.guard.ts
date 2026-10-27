/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PageType, RoutingService, isNotUndefined } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

export const ISR_REVALIDATE_SECONDS = 60;

const ISR_PAGE_TYPES = new Set([
  PageType.PRODUCT_PAGE,
  PageType.CATEGORY_PAGE,
  PageType.CONTENT_PAGE,
]);

@Injectable({ providedIn: 'root' })
export class IsrRevalidateGuard {
  protected routingService = inject(RoutingService);

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.routingService.getNextPageContext().pipe(
      filter(isNotUndefined),
      take(1),
      map((ctx) => {
        if (ctx.type && ISR_PAGE_TYPES.has(ctx.type)) {
          route.data = { ...route.data, revalidate: ISR_REVALIDATE_SECONDS };
        }
        return true;
      })
    );
  }
}
