import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { WindowRef } from '../../window/window-ref';

@Injectable({ providedIn: 'root' })
export class RoutingMigrationGuard implements CanActivate {
  constructor(protected winRef: WindowRef) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.redirect(route, state);
    return false;
  }

  protected redirect(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.winRef.document.location && this.winRef.document.location.href) {
      this.winRef.document.location.href = state.url;
    }
  }
}
