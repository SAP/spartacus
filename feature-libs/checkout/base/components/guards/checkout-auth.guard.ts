/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { GuardResult, Router, UrlTree } from '@angular/router';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  AuthRedirectService,
  AuthService,
  FeatureConfigService,
  SemanticPathService,
  WindowRef,
} from '@spartacus/core';
import { IS_GUEST_USER_CHECKOUT_KEY } from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CheckoutConfigService } from '../services/checkout-config.service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutAuthGuard {
  // Name `featureConfig` instead of `featureConfigService` to avoid clash with `FeatureConfigService` in `OpfCheckoutAuthGuard`
  private featureConfig = inject(FeatureConfigService);
  protected windowRef = inject(WindowRef);

  constructor(
    protected authService: AuthService,
    protected authRedirectService: AuthRedirectService,
    protected checkoutConfigService: CheckoutConfigService,
    protected activeCartFacade: ActiveCartFacade,
    protected semanticPathService: SemanticPathService,
    protected router: Router
  ) {}

  canActivate(): Observable<GuardResult> {
    return combineLatest([
      this.authService.isUserLoggedIn(),
      this.activeCartFacade.isGuestCart(),
      this.activeCartFacade.isStable(),
    ]).pipe(
      map(([isLoggedIn, isGuestCart, isStable]) => ({
        isLoggedIn,
        isGuestCart,
        isStable,
      })),
      filter((data) => data.isStable),
      map((data) => {
        if (!data.isLoggedIn) {
          return data.isGuestCart ? true : this.handleAnonymousUser();
        }
        return data.isLoggedIn;
      })
    );
  }

  protected handleAnonymousUser(): boolean | UrlTree {
    this.authRedirectService.saveCurrentNavigationUrl();
    if (this.featureConfig.isEnabled('authorizationCodeFlowByDefault')) {
      if (this.checkoutConfigService.isGuestCheckout()) {
        this.windowRef.localStorage?.setItem(
          IS_GUEST_USER_CHECKOUT_KEY,
          'true'
        );
      }
      return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
    } else if (this.checkoutConfigService.isGuestCheckout()) {
      return this.router.createUrlTree(
        [this.semanticPathService.get('login')],
        { queryParams: { forced: true } }
      );
    } else {
      return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
    }
  }
}
