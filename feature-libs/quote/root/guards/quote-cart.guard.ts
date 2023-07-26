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
      this.quoteCartService.getQuoteCartActive(),
      this.quoteCartService.getQuoteId(),
    ]).pipe(
      map(([isQuoteCartActive, quoteId]) => {
        if (isQuoteCartActive) {
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
