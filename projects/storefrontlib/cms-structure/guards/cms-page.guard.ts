/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  ProtectedRoutesGuard,
  RouteLoadStrategy,
  RoutingConfigService,
  RoutingService,
  isNotUndefined,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { filter, first, switchMap, take } from 'rxjs/operators';
import { BeforeCmsPageGuardService } from './before-cms-page-guard.service';
import { CmsPageGuardService } from './cms-page-guard.service';

@Injectable({
  providedIn: 'root',
})
export class CmsPageGuard {
  static guardName = 'CmsPageGuard';

  constructor(
    protected routingService: RoutingService,
    protected cmsService: CmsService,
    /** since 2211.24 not used anymore, but called indirectly via {@link BeforeCmsPageGuardService} */
    protected protectedRoutesGuard: ProtectedRoutesGuard,
    protected service: CmsPageGuardService,
    protected routingConfig: RoutingConfigService
  ) {}

  protected beforeCmsPageGuardService = inject(BeforeCmsPageGuardService);

  /**
   * Tries to load the CMS page data for the anticipated route and returns:
   * - `true` - if it can be activated
   * - `false` - if it cannot be activated
   * - `UrlTree` - if user should be redirected to a given `UrlTree`
   *
   * If the route can be activated, it fires additional calculations on the CMS components present on this CMS page,
   * based on their configuration (`cmsComponents` config).
   *
   * For more, see docs of the `CmsPageGuardService.canActivatePage`.
   */
  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.beforeCmsPageGuardService.canActivate(route, state).pipe(
      switchMap((canActivate) =>
        canActivate === true
          ? this.routingService.getNextPageContext().pipe(
              filter(isNotUndefined),
              take(1),
              switchMap((pageContext) =>
                this.cmsService.getPage(pageContext, this.shouldReload()).pipe(
                  first(),
                  switchMap((pageData) =>
                    pageData
                      ? this.service.canActivatePage(
                          pageContext,
                          pageData,
                          route,
                          state
                        )
                      : this.service.canActivateNotFoundPage(
                          pageContext,
                          route,
                          state
                        )
                  )
                )
              )
            )
          : of(canActivate)
      )
    );
  }

  /**
   * Returns whether we should reload the CMS page data, even when it was loaded before.
   */
  private shouldReload(): boolean {
    return this.routingConfig.getLoadStrategy() !== RouteLoadStrategy.ONCE;
  }
}
