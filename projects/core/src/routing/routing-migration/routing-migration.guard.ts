import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { WindowRef } from '../../window/window-ref';

@Injectable({ providedIn: 'root' })
export class RoutingMigrationGuard implements CanActivate {
  constructor(
    protected winRef: WindowRef,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {}

  /**
   * Redirects to different storefront system for anticipated URL
   */
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      await this.unregisterServiceWorker();
      this.redirect(route, state);
    }
    return false;
  }

  /**
   * Unregisters service worker before redirecting to anticipated URL
   * Needed only for redirects in scope of the same domain.
   */
  protected async unregisterServiceWorker(): Promise<void> {
    const window = this.winRef.nativeWindow;

    if (window && 'serviceWorker' in window.navigator) {
      const reg = await window.navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.unregister();
      }
    }
  }

  /**
   * Redirects to anticipated URL using full page reload, not Angular routing
   */
  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const location = this.winRef.document.location;
    location.href = state.url;
  }
}
