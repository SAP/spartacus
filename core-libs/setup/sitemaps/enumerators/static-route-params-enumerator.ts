/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  RouteParamsEnumerator,
  RouteParamsEnumeratorContext,
  RouteParamsEnumeratorResult,
} from '../model/route-params-enumerator';

/**
 * Route parameter enumerator for static routes without parameters.
 *
 * This enumerator handles routes like 'home', 'termsAndConditions', 'contact'
 * that don't require any dynamic parameters.
 *
 * Returns a single empty params object, which tells the discovery service
 * that this route has exactly one URL (the static path itself).
 *
 * ## Usage
 *
 * This enumerator is registered automatically for all routes that:
 * - Have no path parameters (`:param`)
 * - Are not authFlow routes (unless configured)
 * - Are not protected (unless configured)
 *
 * ## Multiple routes
 *
 * Unlike ProductRouteParamsEnumerator which handles a single route ('product'),
 * this enumerator can handle multiple static routes. The `cxRoute` property
 * returns '*' to indicate it's a fallback for any route without a specific enumerator.
 */
@Injectable()
export class StaticRouteParamsEnumerator extends RouteParamsEnumerator {
  /**
   * Special value indicating this enumerator handles routes
   * that don't have a specific enumerator registered.
   */
  readonly cxRoute = '*';

  override readonly languageDependent = false;

  async enumerate(
    _context: RouteParamsEnumeratorContext
  ): Promise<RouteParamsEnumeratorResult> {
    // Static routes need no parameters - return single empty object
    return {
      params: [{}],
    };
  }
}

