/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {
  AuthConfigService,
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  SemanticPathService,
  // StorageSyncType,
  WindowRef,
} from '@spartacus/core';
import { catchError, EMPTY, Observable, of, tap } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import {
  // getStorage,
  persistToStorage,
  readFromStorage,
} from '@spartacus/core/src/state/utils/browser-storage';

const MISSING_JSESSIONID_CODE = 403;
const STORAGE_KEY = 'login_redirect_count';
const timeout = 15_000;
const totalRetries = 2;
interface FlagMeta {
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
  authRedirectService = inject(AuthRedirectService);
  router = inject(Router);
  semanticPathService = inject(SemanticPathService);
  windowRef = inject(WindowRef);
  globalMessageService = inject(GlobalMessageService);
  storage = this.windowRef.localStorage;

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
          return this.canActivateCsrf().pipe(
            switchMap(() => {
              const redirected = this.authService.loginWithRedirect();
              if (!redirected) {
                return of(false);
              }
              return EMPTY;
            })
          );
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

  canActivateCsrf(): Observable<GuardResult> {
    return this.authService.getCsrfToken().pipe(
      tap(() => this.clearRedirectCount()),
      map(() => true),
      catchError((error) => {
        const currentCount = this.getRedirectCount();
        if (currentCount > totalRetries) {
          this.clearRedirectCount();
          this.globalMessageService.add(
            'Login config error', // TODO: replace with translation key
            GlobalMessageType.MSG_TYPE_ERROR
          );

          const redirect = this.router.parseUrl(
            this.semanticPathService.get('home') ?? ''
          );
          return of(redirect);
        }
        this.setRedirectCount(currentCount + 1);

        switch (error.status) {
          case MISSING_JSESSIONID_CODE: {
            console.log('MISSING_JSESSIONID_CODE');
            // Redirect to restart the flow if an attempt was made to manually obtain a custom form
            const redirect = this.router.parseUrl(
              this.semanticPathService.get('login') ?? ''
            );
            return of(redirect);
          }
          default: {
            console.log('DEFAULT');
            const redirect = this.router.parseUrl(
              this.semanticPathService.get('login') ?? ''
            );
            return of(redirect);
          }
        }
      })
    );
  }

  getRedirectCount() {
    const countMeta = readFromStorage(this.storage as Storage, STORAGE_KEY) as
      | FlagMeta
      | undefined;
    if (countMeta) {
      if (Date.now() - countMeta.t < timeout) {
        return countMeta.c;
      }
    }
    return 1;
  }

  setRedirectCount(count: number) {
    return persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: count } satisfies FlagMeta,
      this.storage as Storage
    );
  }

  clearRedirectCount() {
    persistToStorage(
      STORAGE_KEY,
      { t: Date.now(), c: 1 } satisfies FlagMeta,
      this.storage as Storage
    );
  }
}
