import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { WindowRef } from '../../window/window-ref';

@Injectable({ providedIn: 'root' })
export class ExternalRoutesGuard implements CanActivate {
  constructor(
    protected winRef: WindowRef,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  /**
   * Redirects to different storefront system for anticipated URL
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.redirect(route, state);
    }
    return false;
  }

  /**
   * Redirects to anticipated URL using full page reload, not Angular routing
   */
  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const window = this.winRef.nativeWindow;

    if (window && window.location) {
      window.location.href = state.url;
    }
  }
}
