import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/main/root';
import {
  AuthRedirectService,
  AuthService,
  getLastValueSync,
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
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartFacade.getAssignedUser(),
      this.activeCartFacade.isStable(),
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
    if (getLastValueSync(this.activeCartFacade.isGuestCart())) {
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
