/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import { map } from 'rxjs/operators';
import { RouterState, RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartGuard implements CanActivate {
  protected routingService = inject(RoutingService);
  protected quoteCartService = inject(QuoteCartService);

  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.quoteCartService.isQuoteCartActive(),
      this.quoteCartService.getQuoteId(),
      this.quoteCartService.isCheckoutAllowed(),
      this.routingService.getRouterState(),
    ]).pipe(
      map(([isQuoteCartActive, quoteId, isCheckoutAllowed, routerState]) => {
        const isAllowedCheckoutNavigation = this.checkAllowedCheckoutNavigation(
          routerState,
          isCheckoutAllowed
        );

        if (isQuoteCartActive && !isAllowedCheckoutNavigation) {
          this.routingService.go({
            cxRoute: 'quoteDetails',
            params: { quoteId: quoteId },
          });
          return false;
        }
        return true;
      })
    );
  }

  /**
   * Verifies if the current navigation is an allowed checkout navigation.
   * @param routerState Used to assess if a checkout navigation is attempted
   * @param isCheckoutAllowed Is checkout allowed although this guard is active? Only happens for quotes in state BUYER_OFFER
   * that can be ordered
   * @returns true if a checkout navigation is attempted and allowed because of the current quote state
   */
  protected checkAllowedCheckoutNavigation(
    routerState: RouterState,
    isCheckoutAllowed: boolean
  ) {
    const nextStateIsCheckout =
      routerState.nextState?.semanticRoute?.startsWith('checkout');
    const currentStateIsCheckout =
      routerState.state.semanticRoute?.startsWith('checkout');
    const noNextState = routerState.nextState === undefined;
    return (
      (nextStateIsCheckout || (currentStateIsCheckout && noNextState)) &&
      isCheckoutAllowed
    );
  }
}
