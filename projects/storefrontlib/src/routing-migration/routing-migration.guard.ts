import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { WindowRef } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class RoutingMigrationGuard implements CanActivate {
  constructor(protected winRef: WindowRef) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.winRef.document.location && this.winRef.document.location.href) {
      this.winRef.document.location.href = state.url;
    }
    return false;
  }
}
