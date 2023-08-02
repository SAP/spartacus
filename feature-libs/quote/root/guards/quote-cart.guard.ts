/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import { map } from 'rxjs/operators';
import { RoutingService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected quoteCartService: QuoteCartService
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.quoteCartService.isQuoteCartActive(),
      this.quoteCartService.getQuoteId(),
      this.quoteCartService.isCheckoutAllowed(),
      this.routingService.getRouterState(),
    ]).pipe(
      map(([isQuoteCartActive, quoteId, isCheckoutAllowed, routerState]) => {
        const noCheckoutBlocking =
          routerState.nextState?.semanticRoute?.startsWith('checkout') ||
          (routerState.state.semanticRoute?.startsWith('checkout') &&
            isCheckoutAllowed);
        if (isQuoteCartActive && !noCheckoutBlocking) {
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
}
