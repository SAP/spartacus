import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthRedirectService } from './auth-redirect.service';

@Injectable({
  providedIn: 'root',
})
export class BackAfterAuthGuard implements CanActivate {
  static GUARD_NAME = 'BackAfterAuthGuard';

  constructor(
    private router: Router,
    private authRedirectService: AuthRedirectService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const previousUrl = this.router.url;
    const authUrl = state.url;

    const navigationId = this.router.getCurrentNavigation().id;

    this.authRedirectService.reportNavigationToAuthUrl(
      previousUrl,
      authUrl,
      navigationId
    );
    return true;
  }
}
