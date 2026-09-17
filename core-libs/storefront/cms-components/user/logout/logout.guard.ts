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
import { from, Observable } from 'rxjs';
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
    /** @deprecated since 2611 - only used in the legacy code path when {@link FeatureToggles.useConfigurableLogoutRedirect} is disabled. */
    @Optional() protected cms: CmsService | null,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
  ) {}

  canActivate(): Observable<GuardResult> {
    if (!this.featureToggles.useConfigurableLogoutRedirect) {
      return from(this.logout()).pipe(
        switchMap(() =>
          this.cms!
            .hasPage({
              id: this.semanticPathService.get('logout') ?? '',
              type: PageType.CONTENT_PAGE,
            })
            .pipe(
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
          return true
        }
        return redirectUrl;
      })
    );
  }

  protected logout(): Promise<any> {
    return this.auth.coreLogout();
  }

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
