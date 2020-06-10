import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  RoutingService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartService: ActiveCartService
  ) {}

  // TODO: Return UrlTree instead of doing manual redirects
  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartService.getAssignedUser(),
    ]).pipe(
      map(([isLoggedIn, user]) => {
        if (!isLoggedIn) {
          if (this.activeCartService.isGuestCart()) {
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
