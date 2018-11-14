import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import * as fromStore from './../store';
import { RoutingService } from '../../routing/facade/routing.service';

@Injectable()
export class AuthGuard implements CanActivate {
  static GUARD_NAME = 'AuthGuard';

  constructor(
    private store: Store<fromStore.AuthState>,
    private routingService: RoutingService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.getUserToken),
      map(token => {
        if (!token.access_token) {
          this.routingService.go(['/login']);
          this.routingService.saveRedirectUrl(state.url);
        }
        return !!token.access_token;
      })
    );
  }
}
