/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, UrlTree } from '@angular/router';
import { CmsActivatedRouteSnapshot } from '@spartacus/core';
import { Observable } from 'rxjs';
import { GuardsComposer } from '../services/guards-composer';
import { BEFORE_CMS_PAGE_GUARD } from './before-cms-page-guard.token';

/**
 * Service that executes guards provided via the injection token `BEFORE_CMS_PAGE_GUARD`.
 */
@Injectable({ providedIn: 'root' })
export class BeforeCmsPageGuardService {
  protected guards = inject(BEFORE_CMS_PAGE_GUARD);
  protected guardsComposer = inject(GuardsComposer);

  /**
   * Executes guards from `BEFORE_CMS_PAGE_GUARD` token, returning an Observable that:
   * - emits `true` if all those guards pass (emit `true`)
   * - emits `false` or `UrlTree` immediately if any those guards fails (returns `false` or `UrlTree`)
   */
  canActivate(
    route: CmsActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.guardsComposer.canActivate(this.guards, route, state);
  }
}
