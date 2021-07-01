import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  B2BUser,
  B2BUserRole,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
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
    protected router: Router,
    protected userService: UserAccountFacade,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartService.getAssignedUser(),
      this.userService.get(),
      this.activeCartService.isStable(),
    ]).pipe(
      filter(([, , _user, isStable]) => isStable),
      // if the user is authenticated and we have their data, OR if the user is anonymous
      filter(([isLoggedIn, , user]) => (!!user && isLoggedIn) || !isLoggedIn),
      map(([isLoggedIn, cartUser, user]) => {
        if (!isLoggedIn) {
          return this.handleAnonymousUser(cartUser);
        } else if (user && 'roles' in user) {
          return this.handleUserRole(user);
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

  protected handleUserRole(user: User): boolean | UrlTree {
    const roles = (<B2BUser>user).roles;
    if (roles?.includes(B2BUserRole.CUSTOMER)) {
      return true;
    }
    this.globalMessageService.add(
      { key: 'checkout.invalid.accountType' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    return this.router.parseUrl(this.semanticPathService.get('home'));
  }
}
