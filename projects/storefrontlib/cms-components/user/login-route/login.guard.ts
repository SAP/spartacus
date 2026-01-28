/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthConfigService, AuthService, OAuthFlow } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
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
  ): Observable<GuardResult> {
    return this.shouldRenderCMSPage().pipe(
      take(1),
      switchMap((shouldRenderCMSPage) => {
        if (shouldRenderCMSPage) {
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

  protected shouldRenderCMSPage(): Observable<boolean> {
    return this.authService.isUserLoggedIn().pipe(
      take(1),
      map((isUserLoggedIn) => {
        return (
          this.authConfigService.getOAuthFlow() ===
            OAuthFlow.ResourceOwnerPasswordFlow || isUserLoggedIn
        );
      })
    );
  }
}
