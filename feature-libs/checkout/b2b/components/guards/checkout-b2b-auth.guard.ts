/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { GuardResult, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CheckoutAuthGuard,
  CheckoutConfigService,
} from '@spartacus/checkout/base/components';
import {
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

@Injectable({
  providedIn: 'root',
})
export class CheckoutB2BAuthGuard extends CheckoutAuthGuard {
  protected authService: AuthService;
  protected authRedirectService: AuthRedirectService;
  protected checkoutConfigService: CheckoutConfigService;
  protected activeCartFacade: ActiveCartFacade;
  protected semanticPathService: SemanticPathService;
  protected router: Router;
  protected userAccountFacade = inject(UserAccountFacade);
  protected globalMessageService = inject(GlobalMessageService);

  constructor() {
    const authService = inject(AuthService);
    const authRedirectService = inject(AuthRedirectService);
    const checkoutConfigService = inject(CheckoutConfigService);
    const activeCartFacade = inject(ActiveCartFacade);
    const semanticPathService = inject(SemanticPathService);
    const router = inject(Router);

    super(
      authService,
      authRedirectService,
      checkoutConfigService,
      activeCartFacade,
      semanticPathService,
      router
    );
  
    this.authService = authService;
    this.authRedirectService = authRedirectService;
    this.checkoutConfigService = checkoutConfigService;
    this.activeCartFacade = activeCartFacade;
    this.semanticPathService = semanticPathService;
    this.router = router;
  }

  canActivate(): Observable<GuardResult> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartFacade.isGuestCart(),
      this.userAccountFacade.get(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      map(([isLoggedIn, isGuestCart, user, isStable]) => ({
        isLoggedIn,
        isGuestCart,
        user,
        isStable,
      })),
      filter((data) => data.isStable),
      // if the user is authenticated and we have their data, OR if the user is anonymous
      filter((data) => (!!data.user && data.isLoggedIn) || !data.isLoggedIn),
      map((data) => {
        if (!data.isLoggedIn) {
          return data.isGuestCart ? true : this.handleAnonymousUser();
        } else if (data.user && 'roles' in data.user) {
          return this.handleUserRole(data.user);
        }
        return data.isLoggedIn;
      })
    );
  }

  protected handleUserRole(user: User): boolean | UrlTree {
    const roles = (<B2BUser>user).roles;
    if (roles?.includes(B2BUserRole.CUSTOMER)) {
      return true;
    }
    this.globalMessageService.add(
      { key: 'checkoutB2B.invalid.accountType' },
      GlobalMessageType.MSG_TYPE_WARNING
    );
    return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
  }
}
