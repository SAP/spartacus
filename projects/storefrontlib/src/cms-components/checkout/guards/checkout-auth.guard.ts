import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  CartService,
  RoutingService,
  User,
  UserToken,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private authService: AuthService,
    private authRedirectService: AuthRedirectService,
    private cartService: CartService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.getUserToken(),
      this.cartService.getAssignedUser(),
    ]).pipe(
      map(([token, user]: [UserToken, User]) => {
        if (!token.access_token) {
          if (user && user.name === 'guest') {
            return Boolean(user);
          }
          this.routingService.go({ cxRoute: 'login' }, { forced: true });
          this.authRedirectService.reportAuthGuard();
        }
        return !!token.access_token;
      })
    );
  }
}
