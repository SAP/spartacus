import { Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ActivatedRoutesService } from '../../../routing/services/activated-routes.service';
import { BreadcrumbMeta } from '../../model/page.model';
import { ActivatedRouteSnapshotWithPageMeta, RoutePageMetaConfig } from './route-page-meta.model';
import * as i0 from "@angular/core";
export interface RouteWithExtras {
    route: ActivatedRouteSnapshotWithPageMeta;
    resolver: any;
    url: string;
}
export interface RoutingResolveBreadcrumbsOptions {
    /**
     * Includes the current route in the breadcrumbs.
     */
    includeCurrentRoute?: boolean;
}
/**
 * Resolves the page meta based on the Angular Activated Routes
 */
export declare class RoutingPageMetaResolver {
    protected activatedRoutesService: ActivatedRoutesService;
    protected injector: Injector;
    constructor(activatedRoutesService: ActivatedRoutesService, injector: Injector);
    /**
     * Array of activated routes, excluding the special Angular `root` route.
     */
    protected readonly routes$: Observable<ActivatedRouteSnapshot[]>;
    /**
     * Array of activated routes together with precalculated extras:
     *
     * - route's page meta resolver
     * - route's absolute string URL
     *
     * In case when there is no page meta resolver configured for a specific route,
     * it inherits its parent's resolver.
     *
     * When there is no page meta resolver configured for the highest parent in the hierarchy,
     * it uses the `DefaultRoutePageMetaResolver`.
     */
    protected readonly routesWithExtras$: Observable<RouteWithExtras[]>;
    /**
     * Array of breadcrumbs defined for all the activated routes (from the root route to the leaf route).
     * It emits on every completed routing navigation.
     */
    resolveBreadcrumbs(options?: RoutingResolveBreadcrumbsOptions): Observable<BreadcrumbMeta[]>;
    /**
     * Returns the instance of the RoutePageMetaResolver configured for the given activated route.
     * Returns null in case there the resolver can't be injected or is undefined.
     *
     * @param route route to resolve
     */
    protected getResolver(route: ActivatedRouteSnapshotWithPageMeta): any;
    /**
     * Resolvers breadcrumb for a specific route
     */
    protected resolveRouteBreadcrumb({ route, resolver, url, }: RouteWithExtras): Observable<BreadcrumbMeta[]>;
    /**
     * By default in breadcrumbs list we don't want to show a link to the current page, so this function
     * trims the last breadcrumb (the breadcrumb of the current route).
     *
     * This function also handles special case when the current route has a configured empty path ('' route).
     * The '' routes are often a _technical_ routes to organize other routes, assign common guards for its children, etc.
     * It shouldn't happen that '' route has a defined breadcrumb config.
     *
     * In that case, we trim not only the last route ('' route), but also its parent route with non-empty path
     * (which likely defines the breadcrumb config).
     */
    private trimCurrentRoute;
    /**
     * Returns the URL path for the given activated route in a string format.
     * (ActivatedRouteSnapshot#url contains an array of `UrlSegment`s, not a string)
     */
    private getUrlPart;
    /**
     * Returns the breadcrumb config placed in the route's `data` configuration.
     */
    protected getPageMetaConfig(route: ActivatedRouteSnapshotWithPageMeta): RoutePageMetaConfig | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<RoutingPageMetaResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RoutingPageMetaResolver>;
}
