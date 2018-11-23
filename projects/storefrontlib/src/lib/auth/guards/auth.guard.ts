import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { RoutingService } from '@spartacus/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../facade/auth.service';
import { UserToken } from '../models/token-types.model';

@Injectable()
export class AuthGuard implements CanActivate {
  static GUARD_NAME = 'AuthGuard';

  constructor(
    private routingService: RoutingService,
    private authService: AuthService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.userToken$.pipe(
      map((token: UserToken) => {
        if (!token.access_token) {
          this.routingService.goToPage(['login']);
          this.routingService.saveRedirectUrl(state.url);
        }
        return !!token.access_token;
      })
    );
  }
}
