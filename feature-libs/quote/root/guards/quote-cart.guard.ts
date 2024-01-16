/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import {
  RouterState,
  RoutingService,
  SemanticPathService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuoteCartService } from './quote-cart.service';

/**
 * Ensures that the navigation will be re-directed to the quote
 * details page of the quote that is attached to the current cart in case:
 * (1) The current cart is linked to an editable quote
 * (2) The quote status doesn't allow the navigation to checkout
 */
@Injectable({
  providedIn: 'root',
})
export class QuoteCartGuard implements CanActivate {
  protected routingService = inject(RoutingService);
  protected quoteCartService = inject(QuoteCartService);
  protected router = inject(Router);
  protected semanticPathService = inject(SemanticPathService);

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
          const pathForRoute = this.validateThatPresent(
            'Route `quoteDetails` must be present',
            this.semanticPathService.get('quoteDetails')
          );
          const path = pathForRoute.replace(
            ':quoteId',
            this.validateThatPresent(
              'QuoteId must be present in case cart is a quote cart',
              quoteId
            )
          );
          return this.router.parseUrl(path);
        }
        return true;
      })
    );
  }

  protected validateThatPresent(errorMessage: string, input?: string): string {
    if (!input) {
      throw new Error(errorMessage);
    }
    return input;
  }

  /**
   * Verifies if the current navigation is an allowed checkout navigation.
   *
   * @param routerState - Used to assess if a checkout navigation is attempted
   * @param isCheckoutAllowed - Is checkout allowed although this guard is active? Only happens for quotes in state BUYER_OFFER
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
