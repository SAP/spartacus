import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { WindowRef } from '../../window/window-ref';

@Injectable({ providedIn: 'root' })
export class RoutingMigrationGuard implements CanActivate {
  constructor(protected winRef: WindowRef) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.unregisterServiceWorkerAndRedirect(route, state);
    return false;
  }

  protected unregisterServiceWorkerAndRedirect(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const window = this.winRef.nativeWindow;

    // only in browser (not SSR)
    if (window) {
      if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker.getRegistration().then(reg => {
          if (reg) {
            reg.unregister().then(() => {
              console.log('spike unregistered service worker'); //spike todo remove
              this.redirect(route, state);
            });
          } else {
            console.log('no service worker'); //spike todo remove
            this.redirect(route, state);
          }
        });
      } else {
        this.redirect(route, state);
      }
    }
  }

  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const location = this.winRef.document.location;
    location.href = state.url;
}
