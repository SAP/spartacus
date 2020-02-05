import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  AuthRedirectService,
  AuthService,
  CartService,
  RoutingService,
  User,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    private routingService: RoutingService,
    private authService: AuthService,
    private authRedirectService: AuthRedirectService,
    private cartService: CartService,
    private checkoutConfigService: CheckoutConfigService
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.cartService.getAssignedUser(),
    ]).pipe(
      map(([isLoggedIn, user]: [boolean, User]) => {
        if (!isLoggedIn) {
          if (this.cartService.isGuestCart()) {
            return Boolean(user);
          }
          if (this.checkoutConfigService.isGuestCheckout()) {
            this.routingService.go({ cxRoute: 'login' }, { forced: true });
          } else {
            this.routingService.go({ cxRoute: 'login' });
          }
          this.authRedirectService.reportAuthGuard();
        }
        return isLoggedIn;
      })
    );
  }
}
