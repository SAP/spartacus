/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { DefaultRoutePageMetaResolver } from './default-route-page-meta.resolver';
import * as i0 from "@angular/core";
import * as i1 from "../../../routing/services/activated-routes.service";
/**
 * Resolves the page meta based on the Angular Activated Routes
 */
export class RoutingPageMetaResolver {
    constructor(activatedRoutesService, injector) {
        this.activatedRoutesService = activatedRoutesService;
        this.injector = injector;
        /**
         * Array of activated routes, excluding the special Angular `root` route.
         */
        this.routes$ = this.activatedRoutesService.routes$.pipe(
        // drop the first route - the special `root` route:
        map((routes) => (routes = routes.slice(1, routes.length))));
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
        this.routesWithExtras$ = this.routes$.pipe(map((routes) => routes.reduce((results, route) => {
            const parent = results.length
                ? results[results.length - 1]
                : {
                    route: null,
                    resolver: this.injector.get(DefaultRoutePageMetaResolver),
                    url: '',
                };
            const resolver = this.getResolver(route) ?? parent.resolver; // fallback to parent's resolver
            const urlPart = this.getUrlPart(route);
            const url = parent.url + (urlPart ? `/${urlPart}` : ''); // don't add slash for a route with path '', to avoid double slash ...//...
            return results.concat({ route, resolver, url });
        }, [])), shareReplay({ bufferSize: 1, refCount: true }));
    }
    /**
     * Array of breadcrumbs defined for all the activated routes (from the root route to the leaf route).
     * It emits on every completed routing navigation.
     */
    resolveBreadcrumbs(options) {
        return this.routesWithExtras$.pipe(map((routesWithExtras) => options?.includeCurrentRoute
            ? routesWithExtras
            : this.trimCurrentRoute(routesWithExtras)), switchMap((routesWithExtras) => routesWithExtras.length
            ? combineLatest(routesWithExtras.map((routeWithExtras) => this.resolveRouteBreadcrumb(routeWithExtras)))
            : of([])), map((breadcrumbArrays) => breadcrumbArrays.flat()));
    }
    /**
     * Returns the instance of the RoutePageMetaResolver configured for the given activated route.
     * Returns null in case there the resolver can't be injected or is undefined.
     *
     * @param route route to resolve
     */
    getResolver(route) {
        const pageMetaConfig = this.getPageMetaConfig(route);
        if (typeof pageMetaConfig !== 'string' && pageMetaConfig?.resolver) {
            return this.injector.get(pageMetaConfig.resolver, null);
        }
        return null;
    }
    /**
     * Resolvers breadcrumb for a specific route
     */
    resolveRouteBreadcrumb({ route, resolver, url, }) {
        const breadcrumbResolver = resolver;
        if (typeof breadcrumbResolver.resolveBreadcrumbs === 'function') {
            return breadcrumbResolver.resolveBreadcrumbs({
                route,
                url,
                pageMetaConfig: this.getPageMetaConfig(route),
            });
        }
        return of([]);
    }
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
    trimCurrentRoute(routesWithExtras) {
        // If the last route is '', we trim:
        // - the '' route
        // - all parent '' routes (until we meet route with non-empty path)
        let i = routesWithExtras.length - 1;
        while (routesWithExtras[i]?.route?.url.length === 0 && i >= 0) {
            i--;
        }
        // Finally we trim the last route (the one with non-empty path)
        return routesWithExtras.slice(0, i);
    }
    /**
     * Returns the URL path for the given activated route in a string format.
     * (ActivatedRouteSnapshot#url contains an array of `UrlSegment`s, not a string)
     */
    getUrlPart(route) {
        return route.url.map((urlSegment) => urlSegment.path).join('/');
    }
    /**
     * Returns the breadcrumb config placed in the route's `data` configuration.
     */
    getPageMetaConfig(route) {
        // Note: we use `route.routeConfig.data` (not `route.data`) to save us from
        // an edge case bug. In Angular, by design the `data` of ActivatedRoute is inherited
        // from the parent route, if only the child has an empty path ''.
        // But in any case we don't want the page meta configs to be inherited, so we
        // read data from the original `routeConfig` which is static.
        //
        // Note: we may inherit the parent's page meta resolver in case we don't define it,
        // but we don't want to inherit parent's page meta config!
        return route?.routeConfig?.data?.cxPageMeta;
    }
}
RoutingPageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingPageMetaResolver, deps: [{ token: i1.ActivatedRoutesService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
RoutingPageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingPageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RoutingPageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoutesService }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy1wYWdlLW1ldGEucmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9jbXMvcGFnZS9yb3V0aW5nL3JvdXRpbmctcGFnZS1tZXRhLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzdELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFxQmxGOztHQUVHO0FBRUgsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQyxZQUNZLHNCQUE4QyxFQUM5QyxRQUFrQjtRQURsQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLGFBQVEsR0FBUixRQUFRLENBQVU7UUFHOUI7O1dBRUc7UUFDZ0IsWUFBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsSUFBSTtRQUNuRSxtREFBbUQ7UUFDbkQsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUMzRCxDQUFDO1FBRUY7Ozs7Ozs7Ozs7O1dBV0c7UUFDZ0Isc0JBQWlCLEdBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNmLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQ2IsTUFBTSxDQUFDLE1BQU0sQ0FBb0IsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEQsTUFBTSxN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QUFnQixDQUN0QixnQkFBbUM7UUFFbkMsb0NBQW9DO1FBQ3BDLGlCQUFpQjtRQUNqQixtRUFBbUU7UUFFbkUsSUFBSSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQyxPQUFPLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdELENBQUMsRUFBRSxDQUFDO1NBQ0w7UUFFRCwrREFBK0Q7UUFDL0QsT0FBTyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxVQUFVLENBQUMsS0FBNkI7UUFDOUMsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7O09BRUc7SUFDTyxpQkFBaUIsQ0FDekIsS0FBeUM7UUFFekMsMkVBQTJFO1FBQzNFLG9GQUFvRjtRQUNwRixpRUFBaUU7UUFDakUsNkVBQTZFO1FBQzdFLDZEQUE2RDtRQUM3RCxFQUFFO1FBQ0YsbUZBQW1GO1FBQ25GLDBEQUEwRDtRQUMxRCxPQUFPLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQztJQUM5QyxDQUFDOztvSEFoS1UsdUJBQXVCO3dIQUF2Qix1QkFBdUIsY0FEVixNQUFNOzJGQUNuQix1QkFBdUI7a0JBRG5DLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2hhcmVSZXBsYXksIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlc1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL3NlcnZpY2VzL2FjdGl2YXRlZC1yb3V0ZXMuc2VydmljZSc7XG5pbXBvcnQgeyBCcmVhZGNydW1iTWV0YSB9IGZyb20gJy4uLy4uL21vZGVsL3BhZ2UubW9kZWwnO1xuaW1wb3J0IHsgRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlciB9IGZyb20gJy4vZGVmYXVsdC1yb3V0ZS1wYWdlLW1ldGEucmVzb2x2ZXInO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdFdpdGhQYWdlTWV0YSxcbiAgUm91dGVCcmVhZGNydW1iUmVzb2x2ZXIsXG4gIFJvdXRlUGFnZU1ldGFDb25maWcsXG59IGZyb20gJy4vcm91dGUtcGFnZS1tZXRhLm1vZGVsJztcblxuLy8gUFJJVkFURVxuZXhwb3J0IGludGVyZmFjZSBSb3V0ZVdpdGhFeHRyYXMge1xuICByb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFdpdGhQYWdlTWV0YTtcbiAgcmVzb2x2ZXI6IGFueTtcbiAgdXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm91dGluZ1Jlc29sdmVCcmVhZGNydW1ic09wdGlvbnMge1xuICAvKipcbiAgICogSW5jbHVkZXMgdGhlIGN1cnJlbnQgcm91dGUgaW4gdGhlIGJyZWFkY3J1bWJzLlxuICAgKi9cbiAgaW5jbHVkZUN1cnJlbnRSb3V0ZT86IGJvb2xlYW47XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIHBhZ2UgbWV0YSBiYXNlZCBvbiB0aGUgQW5ndWxhciBBY3RpdmF0ZWQgUm91dGVzXG4gKi9cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgUm91dGluZ1BhZ2VNZXRhUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGVzU2VydmljZTogQWN0aXZhdGVkUm91dGVzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yXG4gICkge31cblxuICAvKipcbiAgICogQXJyYXkgb2YgYWN0aXZhdGVkIHJvdXRlcywgZXhjbHVkaW5nIHRoZSBzcGVjaWFsIEFuZ3VsYXIgYHJvb3RgIHJvdXRlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHJvdXRlcyQgPSB0aGlzLmFjdGl2YXRlZFJvdXRlc1NlcnZpY2Uucm91dGVzJC5waXBlKFxuICAgIC8vIGRyb3AgdGhlIGZpcnN0IHJvdXRlIC0gdGhlIHNwZWNpYWwgYHJvb3RgIHJvdXRlOlxuICAgIG1hcCgocm91dGVzKSA9PiAocm91dGVzID0gcm91dGVzLnNsaWNlKDEsIHJvdXRlcy5sZW5ndGgpKSlcbiAgKTtcblxuICAvKipcbiAgICogQXJyYXkgb2YgYWN0aXZhdGVkIHJvdXRlcyB0b2dldGhlciB3aXRoIHByZWNhbGN1bGF0ZWQgZXh0cmFzOlxuICAgKlxuICAgKiAtIHJvdXRlJ3MgcGFnZSBtZXRhIHJlc29sdmVyXG4gICAqIC0gcm91dGUncyBhYnNvbHV0ZSBzdHJpbmcgVVJMXG4gICAqXG4gICAqIEluIGNhc2Ugd2hlbiB0aGVyZSBpcyBubyBwYWdlIG1ldGEgcmVzb2x2ZXIgY29uZmlndXJlZCBmb3IgYSBzcGVjaWZpYyByb3V0ZSxcbiAgICogaXQgaW5oZXJpdHMgaXRzIHBhcmVudCdzIHJlc29sdmVyLlxuICAgKlxuICAgKiBXaGVuIHRoZXJlIGlzIG5vIHBhZ2UgbWV0YSByZXNvbHZlciBjb25maWd1cmVkIGZvciB0aGUgaGlnaGVzdCBwYXJlbnQgaW4gdGhlIGhpZXJhcmNoeSxcbiAgICogaXQgdXNlcyB0aGUgYERlZmF1bHRSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXJgLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHJvdXRlc1dpdGhFeHRyYXMkOiBPYnNlcnZhYmxlPFJvdXRlV2l0aEV4dHJhc1tdPiA9XG4gICAgdGhpcy5yb3V0ZXMkLnBpcGUoXG4gICAgICBtYXAoKHJvdXRlcykgPT5cbiAgICAgICAgcm91dGVzLnJlZHVjZTxSb3V0ZVdpdGhFeHRyYXNbXT4oKHJlc3VsdHMsIHJvdXRlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFyZW50ID0gcmVzdWx0cy5sZW5ndGhcbiAgICAgICAgICAgID8gcmVzdWx0c1tyZXN1bHRzLmxlbmd0aCAtIDFdXG4gICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICByb3V0ZTogbnVsbCxcbiAgICAgICAgICAgICAgICByZXNvbHZlcjogdGhpcy5pbmplY3Rvci5nZXQoRGVmYXVsdFJvdXRlUGFnZU1ldGFSZXNvbHZlciksXG4gICAgICAgICAgICAgICAgdXJsOiAnJyxcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJlc29sdmVyID0gdGhpcy5nZXRSZXNvbHZlcihyb3V0ZSkgPz8gcGFyZW50LnJlc29sdmVyOyAvLyBmYWxsYmFjayB0byBwYXJlbnQncyByZXNvbHZlclxuXG4gICAgICAgICAgY29uc3QgdXJsUGFydCA9IHRoaXMuZ2V0VXJsUGFydChyb3V0ZSk7XG4gICAgICAgICAgY29uc3QgdXJsID0gcGFyZW50LnVybCArICh1cmxQYXJ0ID8gYC8ke3VybFBhcnR9YCA6ICcnKTsgLy8gZG9uJ3QgYWRkIHNsYXNoIGZvciBhIHJvdXRlIHdpdGggcGF0aCAnJywgdG8gYXZvaWQgZG91YmxlIHNsYXNoIC4uLi8vLi4uXG5cbiAgICAgICAgICByZXR1cm4gcmVzdWx0cy5jb25jYXQoeyByb3V0ZSwgcmVzb2x2ZXIsIHVybCB9KTtcbiAgICAgICAgfSwgW10pXG4gICAgICApLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogdHJ1ZSB9KVxuICAgICk7XG5cbiAgLyoqXG4gICAqIEFycmF5IG9mIGJyZWFkY3J1bWJzIGRlZmluZWQgZm9yIGFsbCB0aGUgYWN0aXZhdGVkIHJvdXRlcyAoZnJvbSB0aGUgcm9vdCByb3V0ZSB0byB0aGUgbGVhZiByb3V0ZSkuXG4gICAqIEl0IGVtaXRzIG9uIGV2ZXJ5IGNvbXBsZXRlZCByb3V0aW5nIG5hdmlnYXRpb24uXG4gICAqL1xuICByZXNvbHZlQnJlYWRjcnVtYnMoXG4gICAgb3B0aW9ucz86IFJvdXRpbmdSZXNvbHZlQnJlYWRjcnVtYnNPcHRpb25zXG4gICk6IE9ic2VydmFibGU8QnJlYWRjcnVtYk1ldGFbXT4ge1xuICAgIHJldHVybiB0aGlzLnJvdXRlc1dpdGhFeHRyYXMkLnBpcGUoXG4gICAgICBtYXAoKHJvdXRlc1dpdGhFeHRyYXMpID0+XG4gICAgICAgIG9wdGlvbnM/LmluY2x1ZGVDdXJyZW50Um91dGVcbiAgICAgICAgICA/IHJvdXRlc1dpdGhFeHRyYXNcbiAgICAgICAgICA6IHRoaXMudHJpbUN1cnJlbnRSb3V0ZShyb3V0ZXNXaXRoRXh0cmFzKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgocm91dGVzV2l0aEV4dHJhcykgPT5cbiAgICAgICAgcm91dGVzV2l0aEV4dHJhcy5sZW5ndGhcbiAgICAgICAgICA/IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgICAgIHJvdXRlc1dpdGhFeHRyYXMubWFwKChyb3V0ZVdpdGhFeHRyYXMpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlUm91dGVCcmVhZGNydW1iKHJvdXRlV2l0aEV4dHJhcylcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogb2YoW10pXG4gICAgICApLFxuICAgICAgbWFwKChicmVhZGNydW1iQXJyYXlzKSA9PiBicmVhZGNydW1iQXJyYXlzLmZsYXQoKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluc3RhbmNlIG9mIHRoZSBSb3V0ZVBhZ2VNZXRhUmVzb2x2ZXIgY29uZmlndXJlZCBmb3IgdGhlIGdpdmVuIGFjdGl2YXRlZCByb3V0ZS5cbiAgICogUmV0dXJucyBudWxsIGluIGNhc2UgdGhlcmUgdGhlIHJlc29sdmVyIGNhbid0IGJlIGluamVjdGVkIG9yIGlzIHVuZGVmaW5lZC5cbiAgICpcbiAgICogQHBhcmFtIHJvdXRlIHJvdXRlIHRvIHJlc29sdmVcbiAgICovXG4gIHByb3RlY3RlZCBnZXRSZXNvbHZlcihyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdFdpdGhQYWdlTWV0YSk6IGFueSB7XG4gICAgY29uc3QgcGFnZU1ldGFDb25maWcgPSB0aGlzLmdldFBhZ2VNZXRhQ29uZmlnKHJvdXRlKTtcblxuICAgIGlmICh0eXBlb2YgcGFnZU1ldGFDb25maWcgIT09ICdzdHJpbmcnICYmIHBhZ2VNZXRhQ29uZmlnPy5yZXNvbHZlcikge1xuICAgICAgcmV0dXJuIHRoaXMuaW5qZWN0b3IuZ2V0KHBhZ2VNZXRhQ29uZmlnLnJlc29sdmVyLCBudWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXJzIGJyZWFkY3J1bWIgZm9yIGEgc3BlY2lmaWMgcm91dGVcbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlUm91dGVCcmVhZGNydW1iKHtcbiAgICByb3V0ZSxcbiAgICByZXNvbHZlcixcbiAgICB1cmwsXG4gIH06IFJvdXRlV2l0aEV4dHJhcyk6IE9ic2VydmFibGU8QnJlYWRjcnVtYk1ldGFbXT4ge1xuICAgIGNvbnN0IGJyZWFkY3J1bWJSZXNvbHZlciA9IHJlc29sdmVyIGFzIFJvdXRlQnJlYWRjcnVtYlJlc29sdmVyO1xuXG4gICAgaWYgKHR5cGVvZiBicmVhZGNydW1iUmVzb2x2ZXIucmVzb2x2ZUJyZWFkY3J1bWJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gYnJlYWRjcnVtYlJlc29sdmVyLnJlc29sdmVCcmVhZGNydW1icyh7XG4gICAgICAgIHJvdXRlLFxuICAgICAgICB1cmwsXG4gICAgICAgIHBhZ2VNZXRhQ29uZmlnOiB0aGlzLmdldFBhZ2VNZXRhQ29uZmlnKHJvdXRlKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb2YoW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQgaW4gYnJlYWRjcnVtYnMgbGlzdCB3ZSBkb24ndCB3YW50IHRvIHNob3cgYSBsaW5rIHRvIHRoZSBjdXJyZW50IHBhZ2UsIHNvIHRoaXMgZnVuY3Rpb25cbiAgICogdHJpbXMgdGhlIGxhc3QgYnJlYWRjcnVtYiAodGhlIGJyZWFkY3J1bWIgb2YgdGhlIGN1cnJlbnQgcm91dGUpLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGFsc28gaGFuZGxlcyBzcGVjaWFsIGNhc2Ugd2hlbiB0aGUgY3VycmVudCByb3V0ZSBoYXMgYSBjb25maWd1cmVkIGVtcHR5IHBhdGggKCcnIHJvdXRlKS5cbiAgICogVGhlICcnIHJvdXRlcyBhcmUgb2Z0ZW4gYSBfdGVjaG5pY2FsXyByb3V0ZXMgdG8gb3JnYW5pemUgb3RoZXIgcm91dGVzLCBhc3NpZ24gY29tbW9uIGd1YXJkcyBmb3IgaXRzIGNoaWxkcmVuLCBldGMuXG4gICAqIEl0IHNob3VsZG4ndCBoYXBwZW4gdGhhdCAnJyByb3V0ZSBoYXMgYSBkZWZpbmVkIGJyZWFkY3J1bWIgY29uZmlnLlxuICAgKlxuICAgKiBJbiB0aGF0IGNhc2UsIHdlIHRyaW0gbm90IG9ubHkgdGhlIGxhc3Qgcm91dGUgKCcnIHJvdXRlKSwgYnV0IGFsc28gaXRzIHBhcmVudCByb3V0ZSB3aXRoIG5vbi1lbXB0eSBwYXRoXG4gICAqICh3aGljaCBsaWtlbHkgZGVmaW5lcyB0aGUgYnJlYWRjcnVtYiBjb25maWcpLlxuICAgKi9cbiAgcHJpdmF0ZSB0cmltQ3VycmVudFJvdXRlKFxuICAgIHJvdXRlc1dpdGhFeHRyYXM6IFJvdXRlV2l0aEV4dHJhc1tdXG4gICk6IFJvdXRlV2l0aEV4dHJhc1tdIHtcbiAgICAvLyBJZiB0aGUgbGFzdCByb3V0ZSBpcyAnJywgd2UgdHJpbTpcbiAgICAvLyAtIHRoZSAnJyByb3V0ZVxuICAgIC8vIC0gYWxsIHBhcmVudCAnJyByb3V0ZXMgKHVudGlsIHdlIG1lZXQgcm91dGUgd2l0aCBub24tZW1wdHkgcGF0aClcblxuICAgIGxldCBpID0gcm91dGVzV2l0aEV4dHJhcy5sZW5ndGggLSAxO1xuICAgIHdoaWxlIChyb3V0ZXNXaXRoRXh0cmFzW2ldPy5yb3V0ZT8udXJsLmxlbmd0aCA9PT0gMCAmJiBpID49IDApIHtcbiAgICAgIGktLTtcbiAgICB9XG5cbiAgICAvLyBGaW5hbGx5IHdlIHRyaW0gdGhlIGxhc3Qgcm91dGUgKHRoZSBvbmUgd2l0aCBub24tZW1wdHkgcGF0aClcbiAgICByZXR1cm4gcm91dGVzV2l0aEV4dHJhcy5zbGljZSgwLCBpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBVUkwgcGF0aCBmb3IgdGhlIGdpdmVuIGFjdGl2YXRlZCByb3V0ZSBpbiBhIHN0cmluZyBmb3JtYXQuXG4gICAqIChBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90I3VybCBjb250YWlucyBhbiBhcnJheSBvZiBgVXJsU2VnbWVudGBzLCBub3QgYSBzdHJpbmcpXG4gICAqL1xuICBwcml2YXRlIGdldFVybFBhcnQocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBzdHJpbmcge1xuICAgIHJldHVybiByb3V0ZS51cmwubWFwKCh1cmxTZWdtZW50KSA9PiB1cmxTZWdtZW50LnBhdGgpLmpvaW4oJy8nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBicmVhZGNydW1iIGNvbmZpZyBwbGFjZWQgaW4gdGhlIHJvdXRlJ3MgYGRhdGFgIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0UGFnZU1ldGFDb25maWcoXG4gICAgcm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3RXaXRoUGFnZU1ldGFcbiAgKTogUm91dGVQYWdlTWV0YUNvbmZpZyB8IHVuZGVmaW5lZCB7XG4gICAgLy8gTm90ZTogd2UgdXNlIGByb3V0ZS5yb3V0ZUNvbmZpZy5kYXRhYCAobm90IGByb3V0ZS5kYXRhYCkgdG8gc2F2ZSB1cyBmcm9tXG4gICAgLy8gYW4gZWRnZSBjYXNlIGJ1Zy4gSW4gQW5ndWxhciwgYnkgZGVzaWduIHRoZSBgZGF0YWAgb2YgQWN0aXZhdGVkUm91dGUgaXMgaW5oZXJpdGVkXG4gICAgLy8gZnJvbSB0aGUgcGFyZW50IHJvdXRlLCBpZiBvbmx5IHRoZSBjaGlsZCBoYXMgYW4gZW1wdHkgcGF0aCAnJy5cbiAgICAvLyBCdXQgaW4gYW55IGNhc2Ugd2UgZG9uJ3Qgd2FudCB0aGUgcGFnZSBtZXRhIGNvbmZpZ3MgdG8gYmUgaW5oZXJpdGVkLCBzbyB3ZVxuICAgIC8vIHJlYWQgZGF0YSBmcm9tIHRoZSBvcmlnaW5hbCBgcm91dGVDb25maWdgIHdoaWNoIGlzIHN0YXRpYy5cbiAgICAvL1xuICAgIC8vIE5vdGU6IHdlIG1heSBpbmhlcml0IHRoZSBwYXJlbnQncyBwYWdlIG1ldGEgcmVzb2x2ZXIgaW4gY2FzZSB3ZSBkb24ndCBkZWZpbmUgaXQsXG4gICAgLy8gYnV0IHdlIGRvbid0IHdhbnQgdG8gaW5oZXJpdCBwYXJlbnQncyBwYWdlIG1ldGEgY29uZmlnIVxuICAgIHJldHVybiByb3V0ZT8ucm91dGVDb25maWc/LmRhdGE/LmN4UGFnZU1ldGE7XG4gIH1cbn1cbiJdfQ==