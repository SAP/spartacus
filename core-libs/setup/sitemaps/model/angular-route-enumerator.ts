/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { InjectionToken } from '@angular/core';
import { RouteParamsEnumeratorContext } from './route-params-enumerator';

export interface AngularRouteEnumeratorResult {
  /** Concrete resolved paths (no :params remaining) */
  paths: string[];
}

export abstract class AngularRouteEnumerator {
  /** The Angular route path pattern this handles, e.g. 'help/:topicId' */
  abstract readonly routePath: string;

  abstract enumerate(
    context: RouteParamsEnumeratorContext
  ): Promise<AngularRouteEnumeratorResult>;
}

export const ANGULAR_ROUTE_ENUMERATOR = new InjectionToken<
  AngularRouteEnumerator[]
>('ANGULAR_ROUTE_ENUMERATOR');
