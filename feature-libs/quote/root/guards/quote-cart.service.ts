/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuoteCartService {
  private checkoutAllowed = new ReplaySubject<boolean>(1);
  private checkoutAllowedAsObservable = this.checkoutAllowed.asObservable();

  constructor(protected activeCartFacade: ActiveCartFacade) {
    this.checkoutAllowed.next(false);
  }

  public getQuoteId(): Observable<string | undefined> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.quoteCode));
  }

  public isQuoteCartActive(): Observable<boolean> {
    return this.activeCartFacade
      .getActive()
      .pipe(map((cart) => cart.quoteCode !== undefined));
  }

  public setCheckoutAllowed(checkoutAllowed: boolean): void {
    this.checkoutAllowed.next(checkoutAllowed);
  }

  public isCheckoutAllowed(): Observable<boolean> {
    return this.checkoutAllowedAsObservable;
  }
}
