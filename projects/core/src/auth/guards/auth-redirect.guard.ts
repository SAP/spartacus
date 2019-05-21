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
export class AuthRedirectGuard implements CanActivate {
  static GUARD_NAME = 'AuthRedirectGuard';

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

    this.authRedirectService.reportNavigation(previousUrl, authUrl);
    return true;
  }
}
