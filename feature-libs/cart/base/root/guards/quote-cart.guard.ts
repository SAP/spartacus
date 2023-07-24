/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';
import { QuoteCartService } from './quote-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected quoteCartService: QuoteCartService
  ) {
    this.quoteCartService.setQuoteCartActive(false);
    this.quoteCartService.setQuoteId('');
  }
  canActivate(): Observable<boolean | UrlTree> {
    return combineLatest([
      this.quoteCartService.getQuoteCartActive(),
      this.quoteCartService.getQuoteId(),
    ]).pipe(
      map(([isQuoteCartActive, quoteId]) => {
        if (isQuoteCartActive) {
          this.router.navigateByUrl('my-account/quote/' + quoteId);
          return false;
        }
        return true;
      })
    );
  }
}
