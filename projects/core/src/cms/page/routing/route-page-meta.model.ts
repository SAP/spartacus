import { Type } from '@angular/core';
import { ActivatedRouteSnapshot, Data, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumbMeta } from '../../model/page.model';

/**
 * Angular ActivatedRouteSnapshot extended with the custom configuration
 * of the page meta in the property `data.cxPageMeta`.
 */
export interface ActivatedRouteSnapshotWithPageMeta
  extends ActivatedRouteSnapshot {
  routeConfig:
    | (Route & {
        data?: Data & {
          cxPageMeta?: RoutePageMetaConfig;
        };
      })
    | null;
}

/**
 * Configuration of the breadcrumb for the Route.
 */
export interface RoutePageMetaConfig {
  breadcrumb?: string | RouteBreadcrumbConfig;

  /**
   * Optional resolver class implementing `RoutePageMetaResolver`.
   * The resolver instance will be implicitly inherited by all the
   * child routes of the route with defined resolver (unless some
   * child route defines its own resolver).
   */
  resolver?: Type<any>;
}

/**
 * Configuration of the breadcrumb for specific route
 */
export interface RouteBreadcrumbConfig {
  /**
   * Raw text for the breadcrumb label.
   */
  raw?: string;

  /**
   * Translation key for the breadcrumb label.
   * */
  i18n?: string;
}

/**
 * Params for the breadcrumb resolver of a single activated route.
 */
export interface RouteBreadcrumbResolverParams {
  url?: string;
  pageMetaConfig?: RoutePageMetaConfig;
  route?: ActivatedRouteSnapshot;
}

/**
 * Breadcrumb resolver interface for a single route
 */
export interface RouteBreadcrumbResolver {
  /**
   * Turns the route definition (with its breadcrumb config) into the resolved breadcrumb.
   *
   * @param url precalculated absolute link based on the route snapshot and its ancestors in the routes tree
   * @param pageMetaConfig page meta config for the route, including the breadcrumb config
   * @param route the route snapshot
   */
  resolveBreadcrumbs(
    params: RouteBreadcrumbResolverParams
  ): Observable<BreadcrumbMeta[]>;
}
