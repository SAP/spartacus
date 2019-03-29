import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService, RoutingService, UserToken } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  static GUARD_NAME = 'CheckoutGuard';

  constructor(
    private routingService: RoutingService,
    private authService: AuthService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getUserToken().pipe(
      map((token: UserToken) => {
        if (!token.access_token) {
          this.routingService.go({ route: ['login'] }, { forced: true });
          this.routingService.saveRedirectUrl(state.url);
        }
        return !!token.access_token;
      })
    );
  }
}
