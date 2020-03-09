import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActiveCartService, AuthRedirectService, AuthService, RoutingService, User, UserToken } from '@spartacus/core';
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

  canActivate(): Observable<boolean> {
    return combineLatest([
      this.authService.getUserToken(),
      this.activeCartService.getAssignedUser(),
    ]).pipe(
      map(([token, user]: [UserToken, User]) => {
        if (!token.access_token) {
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
        return !!token.access_token;
      })
    );
  }
}
