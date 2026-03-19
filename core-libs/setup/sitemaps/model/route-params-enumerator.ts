/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';

/**
 * Context passed to route params enumerators.
 * Contains site context information that may affect parameter values.
 */
export interface RouteParamsEnumeratorContext {
  /** Base site UID (e.g., 'electronics-spa') */
  baseSiteId: string;
  /** Current language (e.g., 'en') - may affect product names, etc. */
  language: string;
  /** Current currency (e.g., 'USD') */
  currency: string;
  /** OCC backend base URL */
  occBaseUrl: string;
}

/**
 * Result from a route params enumerator.
 * Contains parameter objects that can be passed to SemanticPathService.
 */
export interface RouteParamsEnumeratorResult {
  /**
   * Array of parameter objects for the route.
   * Each object contains the params needed for SemanticPathService.transform().
   *
   * Example for 'product' route:
   * [
   *   { code: '123', name: 'Camera' },
   *   { code: '456', name: 'Lens' },
   * ]
   */
  params: Record<string, unknown>[];
}

/**
 * Abstract base class for route parameter enumerators.
 *
 * An enumerator is responsible for providing all possible parameter
 * combinations for a specific semantic route. For example:
 * - ProductRouteParamsEnumerator provides {code, name} for all products
 * - CategoryRouteParamsEnumerator provides {categoryCode} for all categories
 *
 * The enumerator does NOT build URLs - it only provides parameters.
 * URL building is delegated to SemanticPathService.
 *
 * ## Creating a custom enumerator
 *
 * ```typescript
 * @Injectable()
 * export class CategoryRouteParamsEnumerator extends RouteParamsEnumerator {
 *   readonly cxRoute = 'category';
 *
 *   async enumerate(context: RouteParamsEnumeratorContext): Promise<RouteParamsEnumeratorResult> {
 *     const categories = await this.fetchCategories(context);
 *     return {
 *       params: categories.map(c => ({ categoryCode: c.code })),
 *     };
 *   }
 * }
 * ```
 *
 * ## Registering an enumerator
 *
 * ```typescript
 * providers: [
 *   { provide: ROUTE_PARAMS_ENUMERATOR, useClass: CategoryRouteParamsEnumerator, multi: true },
 * ]
 * ```
 */
export abstract class RouteParamsEnumerator {
  /**
   * The semantic route name this enumerator handles.
   * Must match a key in RoutingConfig.routing.routes.
   *
   * Examples: 'product', 'category', 'brand'
   */
  abstract readonly cxRoute: string;

  /**
   * Whether this enumerator's results depend on the language.
   * If true, the enumerator will be called for each language.
   * If false, results are assumed to be language-independent.
   *
   * Default: false
   *
   * Example: Product names may vary by language, so ProductRouteParamsEnumerator
   * should set this to true if product names are included in URLs.
   */
  readonly languageDependent: boolean = false;

  /**
   * Enumerates all possible parameter combinations for the route.
   *
   * @param context - Site context (language, currency, etc.)
   * @returns Promise resolving to parameter objects array
   */
  abstract enumerate(
    context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult>;
}

/**
 * Multi-provider injection token for route parameter enumerators.
 *
 * Register custom enumerators:
 * ```typescript
 * { provide: ROUTE_PARAMS_ENUMERATOR, useClass: MyEnumerator, multi: true }
 * ```
 */
export const ROUTE_PARAMS_ENUMERATOR = new InjectionToken<
  RouteParamsEnumerator[]
>('ROUTE_PARAMS_ENUMERATOR');

