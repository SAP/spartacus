import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RedirectAfterAuthService } from './auth-redirect.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectAfterAuthGuard implements CanActivate {
  static GUARD_NAME = 'RedirectAfterAuthGuard';

  constructor(
    private router: Router,
    private redirectAfterAuthService: RedirectAfterAuthService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const previousUrl = this.router.url;
    const authUrl = state.url;

    this.redirectAfterAuthService.reportNavigation(previousUrl, authUrl);
    return true;
  }
}
