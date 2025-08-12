/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  RouterStateSnapshot,
} from '@angular/router';
import {
  AuthConfigService,
  AuthService,
  OAuthFlow,
  StateUtils,
  StorageSyncType,
  WindowRef,
} from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';

const STORAGE_KEY = 'login_redirect_count';
const timeout = 15_000;
// const totalRetries = 1;

interface CustomLoginGuardMetadata {
  /** Add timeout to recover from stale/interrupted state */
  t: number;
  /** Redirect count */
  c: number;
}
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
  windowRef = inject(WindowRef);
  storage = StateUtils.getStorage(
    StorageSyncType.LOCAL_STORAGE,
    this.windowRef
  );

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
          const currentCount = this.getRedirectCount();
          console.log('currentCount', currentCount);
          if (currentCount === 0) {
            this.setRedirectCount(1);
            const redirected = this.authService.loginWithRedirect();
            if (!redirected) {
              return of(false);
            }
            return EMPTY;
          }
          this.setRedirectCount(0);
          return of(true);
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

  getRedirectCount() {
    const countMeta = StateUtils.readFromStorage<CustomLoginGuardMetadata>(
      this.storage as Storage,
      STORAGE_KEY
    );
    if (countMeta && Date.now() - countMeta.t < timeout) {
      return countMeta.c;
    }
    return 0;
  }

  setRedirectCount(count: number) {
    StateUtils.persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: count } satisfies CustomLoginGuardMetadata,
      this.storage as Storage
    );
  }
}
