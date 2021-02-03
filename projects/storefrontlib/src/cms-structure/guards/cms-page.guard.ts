import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  CmsService,
  ProtectedRoutesGuard,
  RouteLoadStrategy,
  RoutingConfigService,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { first, switchMap, take } from 'rxjs/operators';
import { CmsPageGuardService } from './cms-page-guard.service';

@Injectable({
  providedIn: 'root',
})
export class CmsPageGuard implements CanActivate {
  static guardName = 'CmsPageGuard';

  constructor(
    protected routingService: RoutingService,
    protected cmsService: CmsService,
    protected protectedRoutesGuard: ProtectedRoutesGuard,
    protected service: CmsPageGuardService,
    protected routingConfig: RoutingConfigService
  ) {}

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
    return this.protectedRoutesGuard.canActivate(route).pipe(
      switchMap((canActivate) =>
        canActivate === true
          ? this.routingService.getNextPageContext().pipe(
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
