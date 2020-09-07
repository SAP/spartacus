import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartService: ActiveCartService,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartService.getAssignedUser(),
    ]).pipe(
      map(([isLoggedIn, user]) => {
        if (!isLoggedIn) {
          if (this.activeCartService.isGuestCart()) {
            return Boolean(user);
          }
          this.authRedirectService.reportAuthGuard();
          if (this.checkoutConfigService.isGuestCheckout()) {
            return this.router.createUrlTree(
              [this.semanticPathService.get('login')],
              { queryParams: { forced: true } }
            );
          } else {
            return this.router.parseUrl(this.semanticPathService.get('login'));
          }
        }
        return isLoggedIn;
      })
    );
  }
}
