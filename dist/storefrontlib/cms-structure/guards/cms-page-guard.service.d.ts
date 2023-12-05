import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot, CmsService, Page, PageContext, RoutingService, SemanticPathService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentsService } from '../services/cms-components.service';
import { CmsGuardsService } from '../services/cms-guards.service';
import { CmsI18nService } from '../services/cms-i18n.service';
import { CmsRoutesService } from '../services/cms-routes.service';
import * as i0 from "@angular/core";
/**
 * Helper service for `CmsPageGuard`
 */
export declare class CmsPageGuardService {
    protected semanticPathService: SemanticPathService;
    protected cmsService: CmsService;
    protected cmsRoutes: CmsRoutesService;
    protected cmsI18n: CmsI18nService;
    protected cmsGuards: CmsGuardsService;
    protected cmsComponentsService: CmsComponentsService;
    protected routing: RoutingService;
    constructor(semanticPathService: SemanticPathService, cmsService: CmsService, cmsRoutes: CmsRoutesService, cmsI18n: CmsI18nService, cmsGuards: CmsGuardsService, cmsComponentsService: CmsComponentsService, routing: RoutingService);
    /**
     * Takes CMS components types in the current CMS page, triggers (configurable) side effects and returns a boolean - whether the route can be activated.
     *
     * Based on `cmsComponents` config for the components in the page:
     * - Evaluates components' guards; if one of them emits false or UrlTree - the route cannot be activated or redirects to the given UrlTree, respectively.
     * - If all components' guards emitted true, then the route can be activated
     * - Then we trigger loading of configured i18n chunks in parallel
     * - And we register the configured children routes of cms components
     *
     * @param pageContext current cms page context
     * @param pageData cms page data
     * @param route activated route snapshot
     * @param state router state snapshot
     *
     * @returns boolean observable - whether the route can be activated
     */
    canActivatePage(pageContext: PageContext, pageData: Page, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    /**
     * Activates the "NOT FOUND" cms page.
     *
     * It loads cms page data for the "NOT FOUND" page and puts it in the state of the the requested page label.
     * Then it processes its CMS components with the method `canActivatePage()` of this service. For more, see its docs.
     */
    canActivateNotFoundPage(pageContext: PageContext, route: CmsActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsPageGuardService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsPageGuardService>;
}
