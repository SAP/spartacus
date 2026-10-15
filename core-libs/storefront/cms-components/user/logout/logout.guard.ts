/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Optional } from '@angular/core';
import { GuardResult, Router, UrlTree } from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  SemanticPathService,
} from '@spartacus/core';
import { LogoutConfig } from './logout-config';
import { from, Observable, of } from 'rxjs';

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

  constructor(
    protected auth: AuthService,
    /** @deprecated */
    @Optional() protected cms: CmsService | null,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
  ) {}

  canActivate(): Observable<GuardResult> {
    const redirectUrl = this.getRedirectUrl();
    const logoutUrl = this.router.parseUrl(
      this.semanticPathService.get('logout') ?? '/logout'
    );
    const redirectsToLogout = redirectUrl.toString() === logoutUrl.toString();

    /**
     * Only needed when redirecting back to the logout path to avoid an
     * infinite loop: second pass lets CmsPageGuard render the logout page.
     */
    if (
      redirectsToLogout &&
      this.router.getCurrentNavigation()?.extras?.state?.['postLogout']
    ) {
      return of(true);
    }

    from(this.logout()).subscribe(() => {
      this.router.navigateByUrl(redirectUrl, {
        state: redirectsToLogout ? { postLogout: true } : {},
      });
    });
    return of(false);
  }

  protected logout(): Promise<any> {
    return this.auth.coreLogout();
  }

  /**
   * Whenever there is no specific "logout" page configured in the CMS,
   * we redirect after the user is logged out.
   *
   * The user gets redirected to the homepage, unless the homepage is protected
   * (in case of a closed shop). We'll redirect to the login page instead.
   */
  protected getRedirectUrl(): UrlTree {
    if (this.protectedRoutes.shouldProtect) {
      return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
    }
    const redirectRoute = this.config.logout?.redirectRoute;
    if (redirectRoute) {
      const resolved = this.semanticPathService.get(redirectRoute) ?? redirectRoute;
      return this.router.parseUrl(resolved);
    }
    return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
  }
}
