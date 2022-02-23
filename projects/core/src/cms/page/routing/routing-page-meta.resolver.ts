import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { ActivatedRoutesService } from '../../../routing/services/activated-routes.service';
import { BreadcrumbMeta } from '../../model/page.model';
import { DefaultRoutePageMetaResolver } from './default-route-page-meta.resolver';
import {
  ActivatedRouteSnapshotWithPageMeta,
  RouteBreadcrumbResolver,
  RoutePageMetaConfig,
} from './route-page-meta.model';

// PRIVATE
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
@Injectable({ providedIn: 'root' })
export class RoutingPageMetaResolver {
  constructor(
    protected activatedRoutesService: ActivatedRoutesService,
    protected injector: Injector
  ) {}

  /**
   * Array of activated routes, excluding the special Angular `root` route.
   */
  protected readonly routes$ = this.activatedRoutesService.routes$.pipe(
    // drop the first route - the special `root` route:
    map((routes) => (routes = routes.slice(1, routes.length)))
  );

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
  protected readonly routesWithExtras$: Observable<RouteWithExtras[]> =
    this.routes$.pipe(
      map((routes) =>
        routes.reduce<RouteWithExtras[]>((results, route) => {
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
        }, [])
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  /**
   * Array of breadcrumbs defined for all the activated routes (from the root route to the leaf route).
   * It emits on every completed routing navigation.
   */
  resolveBreadcrumbs(
    options?: RoutingResolveBreadcrumbsOptions
  ): Observable<BreadcrumbMeta[]> {
    return this.routesWithExtras$.pipe(
      map((routesWithExtras) =>
        options?.includeCurrentRoute
          ? routesWithExtras
          : this.trimCurrentRoute(routesWithExtras)
      ),
      switchMap((routesWithExtras) =>
        routesWithExtras.length
          ? combineLatest(
              routesWithExtras.map((routeWithExtras) =>
                this.resolveRouteBreadcrumb(routeWithExtras)
              )
            )
          : of([])
      ),
      map((breadcrumbArrays) => breadcrumbArrays.flat())
    );
  }

  /**
   * Returns the instance of the RoutePageMetaResolver configured for the given activated route.
   * Returns null in case there the resolver can't be injected or is undefined.
   *
   * @param route route to resolve
   */
  protected getResolver(route: ActivatedRouteSnapshotWithPageMeta): any {
    const pageMetaConfig = this.getPageMetaConfig(route);

    if (typeof pageMetaConfig !== 'string' && pageMetaConfig?.resolver) {
      return this.injector.get(pageMetaConfig.resolver, null);
    }
    return null;
  }

  /**
   * Resolvers breadcrumb for a specific route
   */
  protected resolveRouteBreadcrumb({
    route,
    resolver,
    url,
  }: RouteWithExtras): Observable<BreadcrumbMeta[]> {
    const breadcrumbResolver = resolver as RouteBreadcrumbResolver;

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
  private trimCurrentRoute(
    routesWithExtras: RouteWithExtras[]
  ): RouteWithExtras[] {
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
  private getUrlPart(route: ActivatedRouteSnapshot): string {
    return route.url.map((urlSegment) => urlSegment.path).join('/');
  }

  /**
   * Returns the breadcrumb config placed in the route's `data` configuration.
   */
  protected getPageMetaConfig(
    route: ActivatedRouteSnapshotWithPageMeta
  ): RoutePageMetaConfig {
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
