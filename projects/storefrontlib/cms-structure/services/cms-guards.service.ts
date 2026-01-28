/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { GuardResult, RouterStateSnapshot } from '@angular/router';
import {
  CmsActivatedRouteSnapshot,
  FeatureConfigService,
  getLastValueSync,
  UnifiedInjector,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CmsComponentsService } from './cms-components.service';
import { CanActivate, GuardsComposer } from './guards-composer';
import { isCanActivate } from './utils';

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
}
