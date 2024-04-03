/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthConfigService, AuthService, OAuthFlow } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { filter, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';

/**
 * Guards the _login_ route.
 *
 * Takes care of routing the user to a auth server login page (if implicit or code flow is used).
 * In case of Resource Owner Password Flow just renders the page as normal CMS page.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(
    protected authService: AuthService,
    protected authConfigService: AuthConfigService,
    protected cmsPageGuard: CmsPageGuard
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.codeOrTokenLoginInProgress$.pipe(
      filter((loginInProgress) => !loginInProgress),
      withLatestFrom(this.authService.isUserLoggedIn()),
      take(1),
      switchMap(([_, isUserLoggedIn]) => {
        if (this.isResourceOwnerPasswordFlowOrUserLoggedIn(isUserLoggedIn)) {
          return this.cmsPageGuard.canActivate(route, state);
        } else {
          // This method can trigger redirect to OAuth server that's why we don't return anything in this case
          const redirected = this.authService.loginWithRedirect();
          if (!redirected) {
            return of(false);
          }
          return EMPTY;
        }
      })
    );
  }

  protected isResourceOwnerPasswordFlowOrUserLoggedIn(
    isUserLoggedIn: boolean
  ): boolean {
    const isResourceOwnerPasswordFlow =
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow;
    return isResourceOwnerPasswordFlow || isUserLoggedIn;
  }
}
