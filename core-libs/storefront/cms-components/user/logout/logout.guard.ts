/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Optional } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  GuardResult,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  AuthService,
  CmsService,
  ProtectedRoutesService,
  SemanticPathService,
} from '@spartacus/core';
import { from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { LogoutConfig } from './logout-config';

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
  protected cmsPageGuard = inject(CmsPageGuard);

  constructor(
    protected auth: AuthService,
    /** @deprecated */
    @Optional() protected cms: CmsService | null,
    protected semanticPathService: SemanticPathService,
    protected protectedRoutes: ProtectedRoutesService,
    protected router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GuardResult> {
    return from(this.logout()).pipe(
      switchMap(() => {
        const redirectUrl = this.getRedirectUrl();
        const logoutUrl = this.router.parseUrl(
          this.semanticPathService.get('logout') ?? '/logout'
        );
        if (redirectUrl.toString() === logoutUrl.toString()) {
          return this.cmsPageGuard.canActivate(route as any, state);
        }
        return of(redirectUrl);
      })
    );
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
      const resolved =
        this.semanticPathService.get(redirectRoute) ?? redirectRoute;
      return this.router.parseUrl(resolved);
    }
    return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
  }
}
