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

  protected async unregisterServiceWorker(): Promise<void> {
    const window = this.winRef.nativeWindow;

    if (window && 'serviceWorker' in window.navigator) {
      const reg = await window.navigator.serviceWorker.getRegistration();
      if (reg) {
        await reg.unregister();
      }
    }
  }

  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const location = this.winRef.document.location;
    location.href = state.url;
  }
}
