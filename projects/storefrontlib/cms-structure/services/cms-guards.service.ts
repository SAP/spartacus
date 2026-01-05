/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  CanActivateFn,
  GuardResult,
  RouterStateSnapshot,
} from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  FeatureConfigService,
  getLastValueSync,
  UnifiedInjector,
  wrapIntoObservable,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CmsComponentsService } from './cms-components.service';
import { CanActivate, GuardsComposer } from './guards-composer';

@Injectable({
  providedIn: 'root',
})
export class CmsGuardsService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    // TODO:#checkout - handle breaking changes in schematics
    protected unifiedInjector: UnifiedInjector
  ) {}

  /**
   * @deprecated since 2211.41 - not needed anymore
   */
  protected featureConfigService = inject(FeatureConfigService);
  protected guardsComposer = inject(GuardsComposer);

  /**
   * Executes all guards for the given `componentTypes` and returns an Observable that:
   * - emits `true` if all those guards pass (emit `true`)
   * - emits `false` or `UrlTree` immediately if any those guards fails (returns `false` or `UrlTree`)
   */
  cmsPageCanActivate(
    componentTypes: string[],
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    const guards = this.cmsComponentsService.getGuards(componentTypes);
    const guardsInstances: CanActivate[] = guards
      .map((guardClass) =>
        getLastValueSync(this.unifiedInjector.get<CanActivate>(guardClass))
      )
      .filter(isCanActivate);
    return this.guardsComposer.canActivate(guardsInstances, route, state);
  }

  /**
   * Executes a guard's `canActivate` method with `route` and `state`,
   * returning its result as an Observable.
   *
   * Converts non-Observable results (Promise or static value) into Observable.
   *
   * NOTE: It injects the guard on demand from the {@link UnifiedInjector}
   *
   * @deprecated since 2211.24 - instead use the util {@link GuardsComposer}
   */
  canActivateGuard(
    guardClass: any,
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    const guard = getLastValueSync(
      this.unifiedInjector.get<{
        canActivate: CanActivateFn;
      }>(guardClass)
    );
    if (isCanActivate(guard)) {
      return wrapIntoObservable(guard.canActivate(route, state)).pipe(first());
    } else {
      throw new Error('Invalid CanActivate guard in cmsMapping');
    }
  }
}

function isCanActivate(guard: any): guard is CanActivate {
  return guard && typeof guard.canActivate === 'function';
}
