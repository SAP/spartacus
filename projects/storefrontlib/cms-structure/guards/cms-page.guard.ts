/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { GuardResult, RouterStateSnapshot } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  ProtectedRoutesGuard,
  RouteLoadStrategy,
  RoutingConfigService,
  RoutingService,
  isNotUndefined,
} from '@spartacus/core';
import { Observable, of, tap } from 'rxjs';
import { filter, first, switchMap, take } from 'rxjs/operators';
import { BeforeCmsPageGuardService } from './before-cms-page-guard.service';
import { CmsPageGuardService } from './cms-page-guard.service';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CmsPageGuard {
  static guardName = 'CmsPageGuard';
  protected platformId = inject(PLATFORM_ID);

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
  ): Observable<GuardResult> {
    if (isPlatformServer(this.platformId)) {
      console.log(`[CmsPageGuard] SSR - canActivate called for: ${state.url}`);
    }
    return this.beforeCmsPageGuardService.canActivate(route, state).pipe(
      tap((canActivate) => {
        if (isPlatformServer(this.platformId)) {
          console.log(`[CmsPageGuard] SSR - beforeGuard result: ${canActivate}`);
        }
      }),
      switchMap((canActivate) =>
        canActivate === true
          ? this.routingService.getNextPageContext().pipe(
            tap(() => {
              if (isPlatformServer(this.platformId)) {
                console.log(`[CmsPageGuard] SSR - getting page context...`);
              }
            }),
            filter(isNotUndefined),
            tap((pageContext) => {
              if (isPlatformServer(this.platformId)) {
                console.log(`[CmsPageGuard] SSR - page context received: ${JSON.stringify(pageContext)}`);
              }
            }),
            take(1),
            switchMap((pageContext) => {
              if (isPlatformServer(this.platformId)) {
                console.log(`[CmsPageGuard] SSR - loading CMS page...`);
              }
              return this.cmsService.getPage(pageContext, this.shouldReload()).pipe(
                tap((page) => {
                  if (isPlatformServer(this.platformId)) {
                    console.log(`[CmsPageGuard] SSR - CMS page loaded: ${!!page}`);
                  }
                }),
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
                ),
                tap((result) => {
                  if (isPlatformServer(this.platformId)) {
                    console.log(`[CmsPageGuard] SSR - final result: ${result}`);
                  }
                })
              );
            })
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
