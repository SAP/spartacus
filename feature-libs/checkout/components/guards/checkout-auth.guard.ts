import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  SemanticPathService,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([, , isStable]) => isStable),
      map(([isLoggedIn, cartUser]) => {
        if (!isLoggedIn) {
          return this.handleAnonymousUser(cartUser);
        }
        return isLoggedIn;
      })
    );
  }

  protected handleAnonymousUser(cartUser?: User): boolean | UrlTree {
    if (this.activeCartService.isGuestCart()) {
      return !!cartUser;
    }
    this.authRedirectService.saveCurrentNavigationUrl();
    if (this.checkoutConfigService.isGuestCheckout()) {
      return this.router.createUrlTree(
        [this.semanticPathService.get('login')],
        { queryParams: { forced: true } }
      );
    } else {
      return this.router.parseUrl(this.semanticPathService.get('login'));
    }
  }
}
