import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import {
  ActiveCartService,
  AuthRedirectService,
  AuthService,
  B2BUser,
  B2BUserGroup,
  GlobalMessageService,
  GlobalMessageType,
  SemanticPathService,
  User,
  UserService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
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
    protected userService: UserService,
    protected globalMessageService: GlobalMessageService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartService.getAssignedUser(),
      this.userService.get(),
      this.activeCartService.isStable(),
    ]).pipe(
      map(([isLoggedIn, cartUser, user]: [boolean, User, User | B2BUser]) => {
        if (!isLoggedIn) {
          if (this.activeCartService.isGuestCart()) {
            return Boolean(cartUser);
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
        } else if ('roles' in user) {
          const roles = (<B2BUser>user).roles;
          if (roles.includes(B2BUserGroup.B2B_CUSTOMER_GROUP)) {
            return true;
          } else {
            this.globalMessageService.add(
              { key: 'checkout.invalid.accountType' },
              GlobalMessageType.MSG_TYPE_WARNING
            );
            return false;
          }
          return !!token.access_token;
        }
        return isLoggedIn;
      })
    );
  }
}
