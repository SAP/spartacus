import { CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot, CmsService, ProtectedRoutesGuard, RoutingConfigService, RoutingService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsPageGuardService } from './cms-page-guard.service';
import * as i0 from "@angular/core";
export declare class CmsPageGuard implements CanActivate {
    protected routingService: RoutingService;
    protected cmsService: CmsService;
    protected protectedRoutesGuard: ProtectedRoutesGuard;
    protected service: CmsPageGuardService;
    protected routingConfig: RoutingConfigService;
    static guardName: string;
    constructor(routingService: RoutingService, cmsService: CmsService, protectedRoutesGuard: ProtectedRoutesGuard, service: CmsPageGuardService, routingConfig: RoutingConfigService);
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
    canActivate(route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    /**
     * Returns whether we should reload the CMS page data, even when it was loaded before.
     */
    private shouldReload;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsPageGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsPageGuard>;
}
