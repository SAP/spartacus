/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Optional } from '@angular/core';
import {
  GuardResult,
  Router,
  UrlTree
} from '@angular/router';
import {
  AuthService,
  CmsService,
  FeatureToggles,
  PageType,
  ProtectedRoutesService,
  SemanticPathService,
} from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LogoutConfig } from './config/logout-config';

/**
 * Guards the _logout_ route.
 *
 * Takes care of routing the user to a logout page (if available) or redirects to
 * the homepage. If the homepage is protected, the user is redirected
 * to the login route instead.
 */
@Injectable({
  providedIn: 'root',
})
export class LogoutGuard {
  protected config = inject(LogoutConfig);
  private featureToggles = inject(FeatureToggles);

  constructor(
    protected auth: AuthService,
    /** @deprecated since 221121.20 - only used in the legacy code path when {@link FeatureToggles.useConfigurableLogoutRedirect} is disabled.
     *  Will be removed in the major release of 2028. */
    @Optional() protected cms: CmsService | null,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
  ) {}

  canActivate(): Observable<GuardResult> {
    if (!this.featureToggles.useConfigurableLogoutRedirect) {
      const cms = this.cms;
      if (!cms) {
        return of(this.getRedirectUrl());
      }
      return from(this.logout()).pipe(
        switchMap(() =>
          cms.hasPage({
            id: this.semanticPathService.get('logout') ?? '',
            type: PageType.CONTENT_PAGE,
          }).pipe(
            map((hasPage) => {
              if (!hasPage) {
                return this.getRedirectUrl();
              }
              // TODO(#9385): Use CMS page guard here.
              return hasPage;
            })
          )
        )
      );
    }

    return from(this.logout()).pipe(
      map(() => {
        const redirectUrl = this.getRedirectUrl();
        const logoutUrl = this.router.parseUrl(
          this.semanticPathService.get('logout') ?? '/logout');
        // If the configured redirect destination is the logout page itself, keep the user on the current route so the CMS logout page renders.
        if (redirectUrl.toString() === logoutUrl.toString()) {
          // TODO(#9385): Use CMS page guard here.
          return true;
        }
        return redirectUrl;
      })
    );
  }

  protected logout(): Promise<any> {
    return this.auth.coreLogout();
  }

  /**
   * Returns the URL to redirect to after a successful logout.
   *
   * Priority order:
   * 1. Login page — when the storefront is protected (closed shop).
   * 2. Configured `logout.redirectRoute`.
   * 3. Home page — default fallback.
   */
  protected getRedirectUrl(): UrlTree {
    if (this.protectedRoutes.shouldProtect) {
      return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
    }
    if (this.featureToggles.useConfigurableLogoutRedirect) {
      const redirectRoute = this.config.logout?.redirectRoute ?? 'home';       
      return this.router.parseUrl( this.semanticPathService.get(redirectRoute) ?? redirectRoute);   
    }
    return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
  }
}
