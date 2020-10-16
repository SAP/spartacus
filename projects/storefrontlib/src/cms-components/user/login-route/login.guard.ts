import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {
  AuthConfigService,
  AuthRedirectService,
  AuthService,
  OAuthFlow,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
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
export class LoginGuard implements CanActivate {
  constructor(
    protected auth: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected authConfigService: AuthConfigService,
    protected cmsPageGuard: CmsPageGuard
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let isUserLoggedIn = false;
    this.auth
      .isUserLoggedIn()
      .subscribe((loggedIn) => (isUserLoggedIn = loggedIn))
      .unsubscribe();

    if (
      this.authConfigService.getOAuthFlow() ===
        OAuthFlow.ResourceOwnerPasswordFlow ||
      isUserLoggedIn
    ) {
      return this.cmsPageGuard.canActivate(route, state);
    } else {
      // Remember the previous url, so we can redirect user to that page after OAuth server callback
      this.authRedirectService.reportNotAuthGuard();
      // This method can trigger redirect to OAuth server that's why we don't return anything in this case
      const redirected = this.auth.loginWithRedirect();
      if (!redirected) {
        return of(false);
      }
    }
  }
}
